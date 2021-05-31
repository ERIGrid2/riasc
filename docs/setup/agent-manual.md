---
id: agent-manual
title: Manually via Script
sidebar_label: Manually via Script
slug: /setup/agent/manual
---

## Requirements

- Linux workstation/server or virtual machine running
  - Ubuntu Server 20.04 LTS (recommended)
  - Debian 10
  - Fedora 34
- Internet connectivity

## Install

1. Create he [riasc.yaml](config.md) file and place it in your current working directory
2. Run the following snippet to start the installation

```bash
wget https://raw.githubusercontent.com/ERIGrid2/riasc-provisioning/master/common/riasc-update.sh | bash
```
