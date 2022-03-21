---
id: terminology
title: Terminology
sidebar_label: ✍️ Terminology
slug: /terminology
---

### RIasC

_RIasC_, an acronym for Research Infrastructure as Code, is a framework to accelerate distributed Research Infrastructure (RI) experiments.

It is heavily inspired by the [Infrastructure-as-Code (IaC)](https://en.wikipedia.org/wiki/Infrastructure_as_code) process and uses on declarative configuration to setup distributed research experiments.

### Kubernetes, K8s

_[Kubernetes](https://en.wikipedia.org/wiki/Kubernetes)_ (commonly stylized as K8s) is an open-source container orchestration system for automating software deployment, scaling, and management.

#### Pod

_[Pods](https://kubernetes.io/docs/concepts/workloads/pods/)_ are the smallest deployable units of computing that you can create and manage in Kubernetes.

#### Daemonset

A _[DaemonSet](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/)_ ensures that all (or some) Nodes run a copy of a Pod. As nodes are added to the cluster, Pods are added to them. As nodes are removed from the cluster, those Pods are garbage collected. Deleting a DaemonSet will clean up the Pods it created.

#### Deployment

A _[Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)_ provides declarative updates for Pods and ReplicaSets.

You describe a desired state in a Deployment, and the Deployment Controller changes the actual state to the desired state at a controlled rate. You can define Deployments to create new ReplicaSets, or to remove existing Deployments and adopt all their resources with new Deployments.

#### CustomResourceDescription

_[Custom resources](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/)_ are extensions of the Kubernetes API. This page discusses when to add a custom resource to your Kubernetes cluster and when to use a standalone service. It describes the two methods for adding custom resources and how to choose between them.

### Overlay Network

An _[overlay network](https://en.wikipedia.org/wiki/Overlay_network)_ is a computer network that is layered on top of (or tunneled through) another network.

### WireGuard

_[WireGuard](https://en.wikipedia.org/wiki/WireGuard)_ is a communication protocol and free and open-source software that implements encrypted virtual private networks (VPNs), and was designed with the goals of ease of use, high speed performance, and low attack surface.

### Kilo (kg)

_[Kilo](https://kilo.squat.ai/)_ is a multi-cloud network overlay built on WireGuard and designed for Kubernetes.

### Netem

_[netem](https://wiki.linuxfoundation.org/networking/netem)_ provides Network Emulation functionality for testing protocols by emulating the properties of wide area networks. The current version emulates variable delay, loss, duplication and re-ordering.

### Iperf3

_[iPerf3](https://iperf.fr/)_ is a tool for active measurements of the maximum achievable bandwidth on IP networks. It supports tuning of various parameters related to timing, buffers and protocols (TCP, UDP, SCTP with IPv4 and IPv6). For each test it reports the bandwidth, loss, and other parameters.

### Ping

_[Ping](https://en.wikipedia.org/wiki/Ping_(networking_utility))_ is a computer network administration software utility used to test the reachability of a host on an Internet Protocol (IP) network. It is available for virtually all operating systems that have networking capability, including most embedded network administration software.

### K3S

_[K3s](https://k3s.io/)_ is a fully compliant Kubernetes distribution built for IoT & Edge computing.

### Helm

_[Helm](https://helm.sh/)_ is a package manager that helps developers "easily manage and deploy applications onto the Kubernetes cluster".

### Chart

Helm uses a packaging format called charts. A chart is a collection of files that describe a related set of Kubernetes resources. A single chart might be used to deploy something simple, like a memcached pod, or something complex, like a full web app stack with HTTP servers, databases, caches, and so on.

### Mobile Unit

### Agent Node

### Master Node
