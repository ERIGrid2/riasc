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

The latest example configuration can be found [in the provisioning repo](https://github.com/ERIGrid2/riasc-provisioning/blob/master/riasc.yaml).

```yaml
# A unique hostname to identify the node
hostname: rpi-test1 # changeme!

ansible:

  # A repository containing ansible playbooks which will be fetched via ansible-pull
  url: https://github.com/erigrid2/k3s-ansible.git

  # The playbook which should be provision the node
  playbook: site.yml

  # A path to the Ansible inventory within the repo from above
  inventory: inventory/erigrid/hosts.yml

#   extra_args:
#   - --only-if-changed

  # Additional variables which are passed to the Ansible playbook for provisioning
  variables:

    # The URL of a K3S master provided by your RIasC provider
    server: https://riasc.fein-aachen.org # changeme!

    # Replace this token with the token provided by your RIasC provider
    token: XXXXX # changeme!
```
