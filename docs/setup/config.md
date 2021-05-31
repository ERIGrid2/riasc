---
id: config
title: Configuration File
sidebar_label: Configuration
slug: /setup/config
---

Each RIasC agent node can be configured by a [YAML](https://yaml.org/) configuration file.
This configuration file is used by the agent node to register itself in the RIasC cloud.

## Location

For [Raspberry Pi-based installations](./agent-rpi.md) the configuration file must be placed at `/boot/riasc.yaml` or the `boot` drive when the SD card is mounted in Windows.

For [manual installations](./agent-manual.md) via the script expect the configuration file named `riasc.yaml` in the current working directory.

For [cloud-init installations](./agent-cloud-init.md) the contents of configuration file must be provided as instance metadata](https://cloudinit.readthedocs.io/en/latest/topics/instancedata.html).
## Example

```yaml
# A unique hostname to identify the node
hostname: rpi-rwth-1

# A secret token which is used by the RIasC node to register itself with the K3S master node
token: XXXX

# The address of an K3S master node at which the node should be registered
server: https://riasc.fein-aachen.org

ansible:
  # Extra arguments which will be passed to ansible-pull
  extra_args: ""

  # The ansible playbook which is used for provisioning this node
  playbook: "site.yml"

  # Additional variables which are passed to the Ansible playbook for provisioning
  variables: {}
```
