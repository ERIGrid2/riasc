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

- [Flent](https://flent.org/)
- Kubernetes:
  - [Custom Resources](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/)

# Architecture

`k8s-netmon` runs a Kubernetes controller which watches _TestSchedule_ custom resources (CR)s.
Based on _TestSchedules_ CRs the controller will spawn _Pods_ to execute individual test runs.

The actual network tests are performed by Flent, the Flexible network tester.
Flent stores its results in archives which will be uploaded to a S3 object storage which they can be downloaded for subsequent analysis.

In addition, the most recent measurments (e.g. ICMP ping RTT) can be pushed to a Promtheus instance for monitoring.
A dedicated Grafana instance is deployed in the cluster itself and can then be used to visualize the collected metrics.

A dedicated Python program `k8s-netmon-graph` is used to retrieve the measurements from Promtheus and converts them into several different graph represenations for further processing:
- Graphviz Dot file
- Rendered SVG graph
- GraphML[^3]
For this purpose `k8s-netmon-graph` implements a simple HTTP API.
The rendered version of the graph is also embedded as an SVG graphic into the Grafana dashboard.

For precise one-way delay measurements the accuracy of the system clocks is essential.
To increase the accuracy of the clocks, a dedicated component 

# Implementation details

# Further reading

- [Flent](https://flent.org/)
- https://github.com/simonswine/kube-latency
- https://medium.com/flant-com/ping-monitoring-between-kubernetes-nodes-11e815f4eff1

- https://github.com/redlab-i/pps-tools
- [Kubernetes DaemonSet](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/)

[^3]: http://graphml.graphdrawing.org/about.html

