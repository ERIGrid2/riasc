---
id: ip-overlay
title: Transparent IP Overlay Network
sidebar_label: Overlay Network
sidebar_position: 2
slug: /design/ip-overlay
partners:
- rwth
---

## Facts

- **Git Repo:** [https://github.com/ERIGrid2/charts/tree/master/charts/kilo](https://github.com/ERIGrid2/charts/tree/master/charts/kilo)
- **State:** under implementation

## Introduction

Unlike in traditional cloud deployments, the participating agent nodes are usually not residing in the same network.
As a consequence, direct communication between containers deployed on different agent nodes is not possible.
To solve this restriction a transparent overlay network is established between all agent and master nodes.
This overlay network employs Virtual Private Network (VPN) solutions to create a mesh of peer-to-peer connections between all nodes in the cloud.
Within this overlay network all deployed containers are assigned an IP from the cluster internal subnet (usually) `10.42.0.0/16`).
Containers can use these addresses (and also Kubernetes ClusterIPs) to communicate with each other even if they are deployed on different nodes in different sites.

As the overlay network establishes connectivity between all nodes.
The Kubernetes cluster networks can be used as on any other Kubernetes cluster.
However, its important to note that the overlay network only establishes connectivity between IPs/containers within the cluster.
Connecting devices and services outside the cluster (e.g. in a dedicated laboratory network) is not supported by the overlay network.
For this purpose a dedicated service, the [IP gateway](ip-gateway.md) is used.

## Employed technologies

- [Wireguard](https://www.wireguard.com/)
- [Kilo](https://github.com/squat/kilo)
- [WICE](https://github.com/ERIGrid2/wice)

## Architecture

The IP overlay network is implemented by a tool named _Kilo_.
Kilo is a multi-cloud network overlay built on WireGuard and designed for Kubernetes.
It deploys the `kg` daemon as Kubernetes DaemonSet on each node in the RIasC cloud.
The `kg` daemon completely automates the configuration of each VPN service by facilitating the exchange of keys and endpoints.

In addition another tool named _WICE_ is used for facilitating peer-to-peer connections via _Kilo_.

## Implementation details

### NAT-2-NAT hole punching

Kilo supports UDP hole-punching in scenarios where two endpoints are located behind a NAT-firewall.

See: [https://github.com/squat/kilo/pull/146](https://github.com/squat/kilo/pull/146)

In addition _WICE_, facilitates NAT-2-NAT connections by using _Interactive Connectivity Establishment_ [RFC8445](https://datatracker.ietf.org/doc/html/rfc8445).

### STUN/TURN gateways for UDP-blocked corporate environments

Currently Kilo will fail to establish VPN connection if the endpoint is located behind a symmetric NAT/firewall.
To workaround this issue, (Interactive Connectivity Establishment ([RFC8445](https://en.wikipedia.org/wiki/Interactive_Connectivity_Establishment)) can be used.

[Wiretrustee](https://wiretrustee.com/) is a project implementing this feature.
Work is ongoing to integrate this code into Kilo.

See: [https://github.com/squat/kilo/issues/189](https://github.com/squat/kilo/issues/189)

## Further Reading

- [Jordan Whited: WireGuard Endpoint Discovery and NAT Traversal using DNS-SD](https://www.jordanwhited.com/posts/wireguard-endpoint-discovery-nat-traversal/)
- [David Anderson: How NAT traversal works, Tailscale](https://tailscale.com/blog/how-nat-traversal-works/)
- [Tailscale](https://tailscale.com/)
- [Wiretrustee](https://wiretrustee.com/)
