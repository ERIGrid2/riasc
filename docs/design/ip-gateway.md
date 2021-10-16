---
id: ip-gateway
title: IP-Gateway/NAT for cluster-external devices 
sidebar_label: IP-Gateway/NAT
slug: /design/ip-gateway
partners:
- rwth
---

# Facts

- **Git Repo:** 
- **Helm Chart:** https://github.com/ERIGrid2/charts/tree/master/charts/multus
- **State:** in design phase

# Introduction

As outlined in the [IP overlay network](ip-overlay.md) design document, Kubernetes networking only facilicates communication between containers inside the cloud.
The _IP gateway_ component extends the Kubernetes networking concept to enable IP communication with cluster-external devices and services.
This is implemented by allocating a cluster-internal IP address to each external device.
Network address translation is then used to establish the link between cluster-internal and -external addresses.

# Employed technologies

- [multus CNI](https://github.com/k8snetworkplumbingwg/multus-cni)
- [Network Address Translation](https://en.wikipedia.org/wiki/Network_address_translation)

# Architecture

# Implementation details

# Further Reading
