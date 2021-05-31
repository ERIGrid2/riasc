---
id: network-monitoring
title: Monitoring of network conditions
sidebar_label: Network Monitoring
slug: /design/network-monitoring
partners:
- vtt
- rwth
---

# Facts

- **Git Repo:** https://github.com/ERIGrid2/k8s-netmon
- **State:** to be implemented

# Introduction

The _k8s-netmon_ component periodically performs network tests to measure letency and bandwidth between each and every node in the RIasC cloud.
The gathered measurements are then used to construct graph in wich the vertices represent the nodes and edges are annotated with the measurements.

## Collected Metrics

- Connectivity
- Latency
- Bandwidth

# Employed technologies

- ICMP Echo/Reply pings
- VILLASnode [test-rtt node-type](https://villas.fein-aachen.org/doc/node-type-test-rtt.html) for timetagged UDP payloads
- iperf3[^4]
- Prometheus[^5]

# Architecture

`k8s-netmon` is implemented as a Go program and deployed as a Kubernetes DaemonSet on each node.
The tool periodically performs poin-to-point network measurements using the `villas-node`, `iperf3` and `ping` tools.
The collected measurements are exported via a Promtheus metrics endpoint from which Prometheus will periodically collect them and store them in the Promtheus database.

A dedicated Grafana instance is deployed in the cluster itself and can then be used to visualize the collected metrics.

A dedicated Go program `k8s-netmon-graph` is used to retrieve the measurements from Promtheus and converst them into several different graph represenations for further processing:
- Graphviz Dot file
- Rendered SVG graph
- GraphML[^3]
For this purpose `k8s-netmon-graph` implements a simple HTTP API.
The rendered version of the graph is also embedded as an SVG graphic into the Grafana dashboard.

Each node relies on an accurate and synchronized system clock for reliable one-way day (OWD) measurements.
The synchronization of the Linux system clock can be carried out by the usual time synchronization methods (e.g. NTP, PTP IEEE1588).
In the case of Raspberry Pi-based nodes, cheap GPS receivers can be used to provide a pulse-per-second (PPS) signals to increase the accuracy [^1], [^2].


# Implementation details

# Further reading

- https://github.com/simonswine/kube-latency
- https://medium.com/flant-com/ping-monitoring-between-kubernetes-nodes-11e815f4eff1

- https://github.com/redlab-i/pps-tools
- [Kubernetes DaemonSet](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/)

[^1]: https://github.com/rascol/PPS-Client
[^2]: http://linuxpps.org/
[^3]: http://graphml.graphdrawing.org/about.html
[^4]: http://software.es.net/iperf/
[^5]: https://prometheus.io/
