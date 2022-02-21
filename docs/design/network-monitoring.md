---
id: network-monitoring
title: Monitoring of network conditions
sidebar_label: Network Monitoring
sidebar_position: 6
slug: /design/network-monitoring
partners:
- rwth
- uos
---

## Facts

- **Source Code:** [https://github.com/ERIGrid2/k8s-netmon](https://github.com/ERIGrid2/k8s-netmon)
- **Helm Chart:** [https://github.com/ERIGrid2/charts/tree/master/charts/flent](https://github.com/ERIGrid2/charts/tree/master/charts/flent)
- **State:** to be implemented

## Introduction

The _k8s-netmon_ component periodically performs network tests to measure letency and bandwidth between each and every node in the RIasC cloud.
The gathered measurements are then used to construct graph in wich the vertices represent the nodes and edges are annotated with the measurements.

### Collected Metrics

- Connectivity
- Latency
- Bandwidth

## Employed technologies

- [Flent](https://flent.org/)
- Kubernetes:
  - [Custom Resources](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/)

## Architecture

`k8s-netmon` runs a Kubernetes controller which watches _TestSchedule_ custom resources (CR)s.
Based on _TestSchedules_ CRs the controller will spawn _DaemonSets_ to execute individual test runs between a pair of nodes.
The `k8s-netmon` controller will take care that _TestSchedules_ are not executed simultaneously to avoid interference between the tests.

The actual network tests are performed by [Flent](https://flent.org/), the Flexible network tester.
The `k8s-netmon` controller spawns pairs of Flent pods on different nodes within the cluster.
These pods will execute the Flent container image. One of them will act as a server while the other acts as the client.
The lifetime of these pods is short. They exist only for the duration of the test.
Flent stores its results in archives which will be uploaded to a S3 object storage which they can be downloaded for subsequent analysis.

The user should be supported in analysis of the collected data by a Python package which downloads the collected test results from the S3 object storage.
This Python package can also directly unpack and load the test results using appropriate packages like Pandas and perform visuzations with matplotlib.

In addition, most recent measurments (e.g. ICMP ping RTT) can be stored in a Promtheus time-series database for monitoring.
A dedicated Grafana instance is deployed in the cluster itself and can then be used to visualize the collected metrics.

A dedicated Python program `k8s-netmon-graph` is used to retrieve the measurements from Promtheus and converts them into several different graph represenations for further processing:

- Graphviz Dot file
- Rendered SVG graph
- GraphML[^3]

For this purpose `k8s-netmon-graph` implements a simple HTTP API.
The rendered version of the graph is also embedded as an SVG graphic into the Grafana dashboard.

For precise one-way delay measurements the accuracy of the system clocks is essential.
To increase the accuracy of the clocks, a dedicated component

<figure align="center">
    <img alt="Perfsonar architecture" src="/img/perfsonar_architecture.png" width="90%" />
    <figcaption>Provisioning flow.</figcaption>
</figure>

## Implementation details

## Further reading

- [Flent](https://flent.org/)
- [kube-latency](https://github.com/simonswine/kube-latency)
- [https://medium.com/flant-com/ping-monitoring-between-kubernetes-nodes-11e815f4eff1](https://medium.com/flant-com/ping-monitoring-between-kubernetes-nodes-11e815f4eff1)

- [pps-tools](https://github.com/redlab-i/pps-tools)
- [Kubernetes DaemonSet](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/)

[^3]: http://graphml.graphdrawing.org/about.html
