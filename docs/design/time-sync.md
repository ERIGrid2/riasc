---
id: time-sync
title: Time Synchronization
sidebar_label: Time Synchronization
sidebar_position: 4
slug: /design/time-sync
partners:
- uos
- rwth
---

## Facts

- **Helm Chart:** [https://github.com/ERIGrid2/charts/tree/master/charts/time-sync](https://github.com/ERIGrid2/charts/tree/master/charts/time-sync)
- **State:** implementation finished

## Introduction

This guide describes the steps to setup time-synchronization for embbeded single-board computers (SBCs) such as a Raspberry Pi.
The time-synchronization relies on a comodity GPS module providing a pulse-per-second (PPS) output to a GPIO pin of the SBC.

## Employed technologies

- [Chrony](https://chrony.tuxfamily.org/)
- [GPSd](https://www.berlios.de/software/gpsd/)
- Kubernetes:
  - [Node status-condition](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.19/#nodecondition-v1-core)

## Applications

- Time-delay compensation
- Logging/timestamping/tracing of interface signals
- [Network monitoring](network-monitoring.md)

## Functional Requirements

- Microsecond accuracy
- Auto-configuration of sychronization source
- Support for multiple synchronization sources
- Reporting of sychronization status

## Architecture

### Daemonset

Time-synchronization is implemented by a cluster-wide _Daemonset_ which spawns a single _Pod_ on each cluster node.
These _Pods_ execute three containers:

- `chronyd`
- `chronyd-monitor`
- `gpsd`

All containers in the _Pod_ communicate via sockets which are placed into a shared emptyDir volume.
There are three sockets created:

- `gpsd` -> `chronyd` coarse date-time: `/run/chrony.ttyAMA0.sock`
- `gpsd` -> `chronyd` precise PPS timing: `/run/chrony.pps0.sock`
- `chronyd-monitor` -> `chronyd` status reporting: `/run/chrony`

All sockets are created by chronyd and subsequentially opened by gpsd and the chronyd-monitor script.
The first two sockets are used to provide rough date-time as well as PPS timing information from gpsd to chronyd.
The last socket is usually used by the chronyc command line tool to interact with the chronyd daemon.
Here the socket is also used by the chronyd-monitor script to periodically check the sync status and publish it to the Kubernetes api-server.

In addition to the shared sockets, some physical devices are mounted from the host into the containers using a hostPath volume.
The gpsd container gets both the serial device `/dev/ttyAMA0` as well as the `/dev/pps0` device mounted.
The chronyd container only gets the PPS device `/dev/pps0` mounted.

### Linux kernel-level PPS device

Both gpsd and chronyd use the kernel-based PPS device order for the PPS `/dev/pps0` device to be created a special devicetree overlay needs to be loaded during boot-up.

### Status reporting

As mentioned above a dedicated `chronyd-monitor` container in the time-sync _Pods_ is used to periodically publish the current synchronization state from chronyd in the form of a _Node status-condition_ to the Kubernetes api-server.

This container runs a [Python script](https://github.com/ERIGrid2/charts/blob/master/images/time-sync/chrony-monitor.py) which periodically calls the `chronyc tracking` and `chronyc sources` commnands to query the current synchronization status.
Afterwards, the script will publish this status as _Node status-condition_ to the Kubernetes api-server as well include more details a annotations to the _Node_ resource.

### Synchronization sources

In order of their priority:

1. [Pulse-per-second signal (PPS)](https://en.wikipedia.org/wiki/Pulse-per-second_signal)
   1. Kernel-based PPS (kPPS)
   2. Userspace PPS
2. [Precision Time Protocol (PTP)](https://en.wikipedia.org/wiki/Precision_Time_Protocol)
3. [Network Time Protocol (NTP)](https://en.wikipedia.org/wiki/Network_Time_Protocol)
4. [Real-time Clock (RTC)](https://en.wikipedia.org/wiki/Real-time_clock)

## Testing

1. Local testing
   - Two Raspberry Pis
   - Independent synchronization sources
   - Equal or different synchronization types
   - Produce periodic rising edge via GPIO
   - Use oscilloscope to measure time offset between edges

2. Reporting synchronization status between RIs
   - Retrieve sync status from Chrony

## Further Reading

- [Chrony Documentationd](https://chrony.tuxfamily.org/documentation.html)
- [GPSD Time Service HOWTO](https://gpsd.gitlab.io/gpsd/gpsd-time-service-howto.html#_feeding_chrony_from_gpsd)
- [Linux Kernel Documentation: PPS - Pulse Per Second](https://www.kernel.org/doc/html/latest/driver-api/pps.html)
