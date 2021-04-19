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
- [iperf3](http://software.es.net/iperf/)
- [Prometheus](https://prometheus.io/)

# Architecture

`k8s-netmon` is implemented as a Go program and deployed as a Kubernetes DaemonSet on each node.
The tool periodically performs poin-to-point network measurements using the `villas-node`, `iperf3` and `ping` tools.
The collected measurements are exported via a Promtheus metrics endpoint from which Prometheus will periodically collect them and store them in the Promtheus database.

A dedicated Grafana instance is deployed in the cluster itself and can then be used to visualize the collected metrics.

A dedicated Go program `k8s-netmon-graph` is used to retrieve the measurements from Promtheus and converst them into several different graph represenations for further processing:
- Graphviz Dot file
- Rendered SVG graph
- [GraphML](http://graphml.graphdrawing.org/about.html)
For this purpose `k8s-netmon-graph` implements a simple HTTP API.

The rendered version of the graph is also embedded as an SVG graphic into the Grafana Dashboard.

# Implementation details

# Further reading

- https://github.com/simonswine/kube-latency
- https://medium.com/flant-com/ping-monitoring-between-kubernetes-nodes-11e815f4eff1
- [Kubernetes DaemonSet](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/)
- [GraphML](http://graphml.graphdrawing.org/about.html)
