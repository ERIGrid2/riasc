---
id: network-emulation
title: Network emulation (netem) CNI-plugin for Kubernetes
sidebar_label: Network Emulation
sidebar_position: 4
slug: /design/network-emulation
partners:
- vtt
- rwth
---

## Facts

- **Git Repo:** [https://github.com/ERIGrid2/k8s-netem](https://github.com/ERIGrid2/k8s-netem)
- **Helm Chart:** [https://github.com/ERIGrid2/charts/tree/master/charts/netem](https://github.com/ERIGrid2/charts/tree/master/charts/netem)
- **State:** under testing

## Introduction

_k8s-netem_ adds support for traffic control in Kubernetes pods.

It allows the user to configure one or more traffic profiles to impair network traffic between pods in the cluster and between pods and external networks.

The traffic profiles are implemented as a custom resource definitions (CRD) which the user can add and modify in the Kubernetes database using standard tools like `kubectl` or a Kubernetes web-interface.

These, _TrafficProfiles_ can use a `spec.podSelector` or CIDR's to match a set of source and destination pods/networks for which the impairment should be configured.
In addition the impairment can be restricted to a set of UDP or TCP port numbers, Ether-types and IP protocols.
`k8s-netem` will continuously watch for new or modified _TrafficProfiles_ as well as _Pods_ and update the traffic control configuration appropriately.

The traffic profile custom resource is inspired by Kubernetes [_NetworkPolicy_ CR](https://kubernetes.io/docs/concepts/services-networking/network-policies/#networkpolicy-resource) and has been extended to accomodate the traffic control parameters as well as additional filters for the Ether-types and IP protocols.

### Features

- Network emulation and rate limiting
- Support for ingress (WIP) and egress traffic
- Requires no modification of existing manifests
- Complex ingress/egress filters inspired by [Kubernetes' network policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/)
  - Matches cross-pod flows as well as from/to specific external CIDRs
  - Matches UDP/TCP ports
  - Matches Ether-types
  - Matches IP Protocols
- Live filter updates based on `podSelectors`
- Support for multiple _TrafficProfiles_ per _Pod_
- Extensible with additional controller types

## Employed technologies

- Linux:
  - [Traffic control](https://man7.org/linux/man-pages/man8/tc.8.html)
  - [Netem](https://wiki.linuxfoundation.org/networking/netem)
  - [IPsets](https://ipset.netfilter.org/)
- Kubernetes:
  - [Custom Resources](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/)
  - [Mutating Admission Webhook](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/)

## Controllers

Currently _k8s-netem_ supports two types of controllers:

### Builtin

The builtin TC controller uses [iproute2](https://wiki.linuxfoundation.org/networking/iproute2)'s `tc` command to configure Linux's traffic control subsystem by adding queuing disciplines and filters.

### Flexe (VTT Network Emulator)

The Flexe controller is software developed by [VTT](https://www.vtt.fi/), which is based on Linux [iproute2](https://wiki.linuxfoundation.org/networking/iproute2)'s `tc` command like builtin TC controller, but has more functionalities added to it. Software have been extended to support have several traffic profiles running from time to time, added REST API for making the qdisc / filter / netem configuration changes, etc.

## Example _TrafficProfile_ for Flexe controller

```yaml
---
apiVersion: k8s-netem.riasc.eu/v1
kind: TrafficProfile
metadata:
  name: profile-delay-jitter-flexe
spec:
  podSelector:
    matchLabels:
      traffic-profile: profile-delay-jitter-flexe

  type: Flexe

  parameters:
    segments:
    - repeat: True

    profiles:
    - name: ethernet
      parameters:
        runTime: 30

        bandwidthUp: 100000
        bandwidthDown: 100000
        delay: 0.25
        delayVariation: 0.25

    - name: 3g
      parameters:
        runTime: 30

        bandwidthUp: 256
        bandwidthDown: 256
        delay: 200
        delayVariation: 50
        loss: 0.5
        duplication: 0.1
        corruption: 0.1
        reorder: 0.2

  egress:
  - to:
    - ipBlock:
        cidr: 1.1.1.1/32

    - podSelector:
        matchLabels:
          component: example

    ports:
    - port: 443
      protocol: TCP
    - port: 53
      protocol: UDP

  - to:
    - ipBlock:
        cidr: 8.8.8.8/32

  - ports:
    - port: 80
      protocol: tcp
```

## Example _TrafficProfile_ for Builtin controller

```yaml
---
apiVersion: k8s-netem.riasc.eu/v1
kind: TrafficProfile
metadata:
  name: profile-builtin
spec:
  podSelector:
    matchLabels:
      traffic-profile: builtin

  type: Builtin
  parameters:
    netem:
      delay: 0.2 # seconds
      loss_ratio: 0.2 # in [0, 1]

  egress:
  - to:
    - ipBlock:
        cidr: 1.1.1.1/32
    - podSelector:
        matchLabels:
          component: example

    inetProtos:
    - icmp
```

### Example Pod

```yaml
apiVersion: v1
kind: Pod
metadata:
  labels:
    component: example
    traffic-profile: builtin
  name: example-pod-1
spec:
  containers:
  - command:
    - ping
    - 1.1.1.1
    image: nicolaka/netshoot
    name: ping-cloudflare
    securityContext:
      capabilities:
        add:
        - NET_ADMIN
```

## Approach

1. User creates a new _TrafficProfile_ CR
2. User creates one or more _Pods_ which match the `podSelector` of the _TrafficProfile_ CR
3. A mutating admission webhook will inject a Sidecar container into the newly created _Pods_
4. The sidecar container will configure the network traffic controller by:
   1. Watching for new/modified _TrafficProfile_ matching the `podSelector`
   2. Watching for new/modified _Pods_ which match the ingress/egress peers `podSelector`s
      - New matching _Pods_ will be added to IPsets
      - Previously matching _Pods_ which have been deleted will be removed from the IPsets.
   3. Configuring the traffic impairment by configuring one or more netem Qdiscs and attaching them to their dedicated IPsets filters.

## Implementation details

### Installation

_k8s-netem_ can be deployed by a dedicated [`k8s-netem` Helm chart](https://github.com/ERIGrid2/charts/tree/master/charts/netem).

### Custom Resources

_k8s-netem_ defines a new CRD `k8s-netem.riasc.eu/v1/trafficprofiles`.

### Mutating Admission Webhook

The mutating admission webhooks gets invoked by the Kubernetes API server for each created, modified or deleted _Pod_ resource.

The webhook will check if any of the existing _TrafficProfiles_ targets the _Pod_.
If this is the case, an additional sidecar container will be injected into the _Pod_.

**Note:** Currently, the webhook will only inject the sidecar if the _TrafficProfile_ already exists at the time of the _Pod_ creation or update. _k8s-netem_ will not re-create _Pods_ after a new _TrafficProfile_ is added to the cluster. It is the responsibility to re-create _Pods_ in order for the side-cards to be injected.

### Sidecar Containers

The sidecar container will run alongside the user containers for the full life-cycle of the _Pod_.
It is tasked with the synchronization of _TrafficProfiles_ with the Kernel TC / IPset data structures.

This means, modifications of existing _TrafficProfiles_ by the user (e.g. to adjust impairment parameters) are synced to the Linux kernel configuration.

At the same time the sidecar container will watch for new or deleted _Pods_ which match the ingres/egress peer podSelectors and add their podIPs to the respective IPsets which are used by the TC filters.

### Flow classification

`k8s-netem` uses [NFtables](https://nftables.org) to classify network traffic flows based on the `spec.egress` and `spec.ingress` filters.
Updates to these NFTables are easy as CIDRs, Ports, Ether-types and IP protocols used in the filters are stored in NFTables sets which can easily be manipulated without affecting the other filters.

Each _TrafficProfile_ allocate a dedicated firewall mark (`fwmark`) from a per-_Pod_ pool of marks.
The NFTables rule will mark the selected traffic flows using this mark which later is used by a TC filter.

### Support for multiple simultaneous _TrafficProfiles_, Controllers and Interfaces per _Pod_

`k8s-netem` supports multiple _TrafficProfiles_ matching the same _Pod_ using the `spec.podSelector`.
Each profile can also target a specific interface within the container by using a regular expression in `spec.interfaceFilter`.
Multiple _TrafficProfiles_ targeting the same interface within the same _Pod_ are supported as long as they share the `spec.type`.

## Further reading

- [https://www.altoros.com/blog/kubernetes-networking-writing-your-own-simple-cni-plug-in-with-bash/](https://www.altoros.com/blog/kubernetes-networking-writing-your-own-simple-cni-plug-in-with-bash/)
- [https://networkop.co.uk/post/2018-11-k8s-topo-p1/](https://networkop.co.uk/post/2018-11-k8s-topo-p1/)
- [k8s-topo](https://github.com/networkop/k8s-topo )
