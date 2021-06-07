---
id: rpi-image
title: Create SD Image for Raspberry Pi Agent
sidebar_label: RPi Image
slug: /development/rpi-image
---

This page documents the procedure for creating a Raspberry Pi SD card image which can be used to provising a new RIasC node.

## Steps

1. Install the required dependencies
   - Debian/Ubuntu: `apt-get install wget libguestfs-tools`
   - Fedora/CentOS/RHEL: `dnf install libguestfs-tools wget zip`
1. Clone the riasc-provisioning Git repository:
   - `git clone https://github.com/ERIGrid2/riasc-provisioning`
2. Create image:
   - `cd riasc-provisioning/rpi`
   - `bash create_image.sh`
