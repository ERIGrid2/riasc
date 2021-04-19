---
id: config
title: Configuration File
sidebar_label: Configuration
slug: /setup/config
---

Each RIasC agent node can be configured by a [YAML](https://yaml.org/) configuration file.
This configuration file is used by the agent node to register itself in the RIasC cloud.

## Example

```yaml
# A unique hostname to identify the node
hostname: rpi-rwth-1

# A secret token which is used by the RIasC node to register itself with the K3S master node
token: XXXX

# The address of an K3S master node at which the node should be registered
server: https://lb-29.os-cloud.eonerc.rwth-aachen.de
```
