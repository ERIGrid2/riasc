---
id: agent-rpi
title: Raspberry Pi based Agent
sidebar_label: Raspberry Pi
slug: /setup/agent/rpi
---

The setup of an Raspberry Pi single-board computer is the easiest way to participate in a RIasC cloud of labs.

## Requirements

- 1x Raspberry Pi 3B / 4
- 1x SD card (>= 8 GB)
- 1x SD card reader
- [SD card image](todo)

## Installation

1. Download our [prebuild SD card image](todo) to your workstation.
2. Use your SD card imager tool of choice (e.g. [Balena Etcher](https://www.balena.io/etcher/)) to write the image to a spare SD card.
3. Re-insert the SD card reader and open the "boot" partition of the SD card.
4. Adjust the [riasc.yaml](config.md) file.
5. Insert the SD card in the Raspberry Pi and boot it.
6. Wait for the node the register itself and appear in the [Rancher control panel](./rancher.md).
