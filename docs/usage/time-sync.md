
---
id: time-sync
title: Time Synchronization
sidebar_label: Time Synchronization
slug: /usage/time-sync
---

This guide describes the steps to setup time-synchronization for embbeded single-board computers (SBCs) such as a Raspberry Pi.
The time-synchronization relies on a comodity GPS module providing a pulse-per-second (PPS) output to a GPIO pin of the SBC.

## Requirements

- 1x GPS receiver module with PPS output (optional)
  - Options:
    - [Adafruit Ultimate GPS Breakout, Digikey](https://www.digikey.com/en/products/detail/adafruit-industries-llc/746/5353613)
    - [Raspberry Pi Hat, Uputronics](https://store.uputronics.com/index.php?route=product/product&path=60_64&product_id=81)
    - [Adafruit GPS Hat, RS-Online](https://de.rs-online.com/web/p/raspberry-pi-hats-und-add-ons/1245481/?cm_mmc=de-ds-_-web-_-ds%3Adiscover-de%3Aall-technologies-de%3Araspberry-pi-de%3Aadd-gps-time-and-location-to-a-raspberry-pi-project-de_fp-_-1245481)
- 1x GPS antenna and cabeling


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


## Configuration

TODO
