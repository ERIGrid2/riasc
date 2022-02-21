---
id: time-sync
title: Time Synchronization
sidebar_label: Time Synchronization
slug: /usage/time-sync
---

## Requriements

- 1x GPS receiver module with PPS output
  - Options:
    - [Adafruit Ultimate GPS Breakout, Digikey](https://www.digikey.com/en/products/detail/adafruit-industries-llc/746/5353613)
    - [Raspberry Pi Hat, Uputronics](https://store.uputronics.com/index.php?route=product/product&path=60_64&product_id=81)
    - [Adafruit GPS Hat, RS-Online](https://de.rs-online.com/web/p/raspberry-pi-hats-und-add-ons/1245481/?cm_mmc=de-ds-_-web-_-ds%3Adiscover-de%3Aall-technologies-de%3Araspberry-pi-de%3Aadd-gps-time-and-location-to-a-raspberry-pi-project-de_fp-_-1245481)
- 1x GPS antenna and cabeling (optional)

## Setup

For accurate network latency measurements the Raspberry Pi clock can be sychronized via GPS.
For this purpose a dedicated GPS receiver module with a dedicated pulse-per-second (PPS) output is required.

Connect the GPS receiver according to the following table:

| Pin GPS Module | Raspberry Pi P1 Header | BCM            | Direction  |
|:--             |:--                     |:--             |:--         |
| GND            | 6 (GND)                |                |            |
| 3.3V           | 1 (+3V3)               |                |            |
| RX             | 8                      | GPIO 14 / TXD0 | RPi -> GPS |
| TX             | 10                     | GPIO 15 / RXD0 | GPS -> RPi |
| PPS            | 12                     | GPIO 18        | GPS -> RPi |

<figure align="center">
    <img alt="Wiring" src="/img/rpi_gps_timesync.png" width="90%" />
    <figcaption>Wiring.</figcaption>
</figure>

<figure align="center">
    <img alt="Adafruit Ultimate GPS Hat" src="/img/adafruit_ultimate_gps_hat.png" width="90%" />
    <figcaption>Adafruit Ultimate GPS Hat.</figcaption>
</figure>


## Configuration

The time synchronzation is configured via the [RIasC Helm chart](https://github.com/ERIGrid2/charts/tree/master/charts/time-sync).

It is automatically enabled for all nodes.

### Configuring Linux PPS device on Raspberry Pi

The configuration of the PPS inputs on a Raspberry Pi is done by the [RIasC Ansible playbook](https://github.com/ERIGrid2/riasc-ansible/tree/master/roles/rpi-gps-sync).
It will be applied to all Raspberry Pi based nodes.
