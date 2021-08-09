---
id: network-emulation
title: Network emulation (netem) CNI-plugin for Kubernetes
sidebar_label: Network Emulation
slug: /design/network-emulation
partners:
- vtt
- rwth
---

# Facts

- **Git Repo:** https://github.com/ERIGrid2/k8s-netem
- **State:** under development

# Introduction

_k8s-netem_ adds traffic control to Kubernetes pods.

It allows the user to configure one or more traffic profiles to impair network traffic between pods in the cluster and between pods and external networks.

The traffic profiles are implemented as a custom resource (CR) which the user can add and modify in the Kubernetes database using standard tools like `kubectl` or a Kubernetes web-interface.

These, _TrafficProfiles_ can use `podSelectors` or CIDRs to match a set of source and destination pods/networks for which the impairment should be configured.
In addition the impairment can be restricted to a set of UDP or TCP port numbers.

The traffic profile custom resource is heavily inspired by Kubernetes NetworkPolicy CR.

## Features

- Network emulation and rate limiting
- Support for ingress and egress traffic
- Requires no modification of existing manifests
- Matches cross-pod flows and from/to CIDRs
- Complex ingress/egress filters inspired by [Kubernete's network policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/)
- Live filter updates based on `podSelectors`
- Support for multiple traffic controllers

# Employed technologies

- Linux:
  - [Traffic control](https://man7.org/linux/man-pages/man8/tc.8.html)
  - [Netem](https://wiki.linuxfoundation.org/networking/netem)
  - [IPsets](https://ipset.netfilter.org/)
- Kubernetes:
  - [Custom Resources](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/)
  - [Mutating Admission Webhook](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/)

# Controllers

Currently _k8s-netem_ supports two types of controllers:

## TC

The TC controller uses [iproute2](https://wiki.linuxfoundation.org/networking/iproute2)'s `tc` command to configure Linux's traffic control subsystem by adding Qdiscs and filters.

## VTT Network Emulator

# Example

## Example Profile

## Example Pod

# Architecture

1. User creates a new _TrafficProfile_ CR
2. User creates one or more _Pods_ which match the `podSelector` of the _TrafficProfile_ CR
3. A mutating addmission webhook will inject a Sidecar container into the newly created _Pods_
3. The sidecar container will configure the network traffic controller by:
  1. Watching for new/modified _TrafficProfile_ matching the `podSelector`
  2. Watching for new/modified _Pods_ which match the ingress/egress peers `podSelector`s
     - New matching _Pods_ will be added to IPsets
     - Previously matching _Pods_ which have been deleted will be removed from the IPsets.
  3. Configuring the traffic impairment by cnofiguring one or more netem Qdiscs and attaching them to their dedicated IPsets filters.

# Implementation details

## Installation

_k8s-netem_ is deployed by the Riasc Helm chart.

## Custom Resources

_k8s-netem_ defines a new CRD k8s-netem.riasc.eu/v1/trafficprofiles.

## Mutating Admission Webhook

The mutating admission webhooks gets invoked by the Kubernetes API server for each created, modified or deleted _Pod_ resource.

The webhook will check if any of the existing _TrafficProfiles_ targets the _Pod_.
If this is the case, an additional sidecar container will be injected into the _Pod_.

**Note:** Currently, the webhook will only inject the sidecar if the _TrafficProfile_ already exists at the time of the _Pod_ creation or update. _k8s-netem_ will not re-create _Pods_ (or use ephermal contaienrs) after a new _TrafficProfile_ is added to the cluster. It is the responsibility to re-create _Pods_ in order for the side-cards to be injected. 

## Sidecar Container

The sidecar container will run alongside the user containers for the full life-cycle of the _Pod_.
It is tasked with the sychronization of _TrafficProfiles_ with the Kernel TC / IPset datastructures.

This means, modifications of existing _TrafficProfiles_ by the user (e.g. to adjust impairment parameters) are synced to the Linux kernel configuration.

At the same time the sidecar container will watch for new or deleted _Pods_ which match the ingres/egress peer podSelectors and add their podIPs to the respective IPsets which are used by the TC filters.

# Further reading

- https://networkop.co.uk/post/2018-11-k8s-topo-p1/ 
- https://github.com/networkop/k8s-topo 
- https://www.altoros.com/blog/kubernetes-networking-writing-your-own-simple-cni-plug-in-with-bash/
