---
id: config
title: Configuration File
sidebar_label: Configuration
sidebar_positon: 1
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
---
# RIasC configuration file
# See also: https://erigrid2.github.io/riasc/docs/setup/config

# A unique hostname to identify the node
hostname: riasc-agent # changeme!

ansible:
  # List of PGP keys which are used to verify the commits in the Ansible repo
  keys:
  - 09BE3BAE8D55D4CD8579285A9675EAC34897E6E2 # Steffen Vogel (RWTH)

  keyserver: keys.openpgp.org

  # A repository containing ansible playbooks which will be fetched via ansible-pull
  url: https://github.com/erigrid2/riasc-ansible.git

  verify_commit: true

  # The playbook which should be provision the node
  playbook: site.yml

  # A path to the Ansible inventory within the repo from above
  inventory: inventory/erigrid/hosts.yml

  # extra_args:
  # - --only-if-changed

  # Additional variables which are passed to the Ansible playbook for provisioning
  variables:
    # A list of SSH keys which will be added to the 'pi' user
    additional_ssh_keys:
    - ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQC9kuBu/eYcN1hNNIWEVfswO/rOoE1JVQPK+92Y6r856xrdaCpGOtHv5MBmO70fmGEFZ86e2QC0Ij5zqlwqTTNwWAHxT6H9d3CytThx54UronOCeQxQBYcJpLDSdY5MuseZjm0RlW+7aSNvnUttDByGBoCl+VWaaNF+dN2MWzrGIw0rvKJ24OVhPmm91VwOIoCJkKJ9AL1OEIpCH7n7jcaJYVBP2j+RVYfq47W4e9SfE/QlL+QVk360w+kFSeTybaMnsWALZNwk/kywzPq1dpw+4ToD6qBF6leY7ivD/ZsFppbndyzjW93PO3IWlTXmFd/UK/3xzihuZE9KWl0D1O5hny3o0DXkWK96xSFA4hhMqkVw0bNS9+jVq3fuaGNAtOUEg0rfCPPf0fwnPYq9pOyDUViGHDhMY/yWBSqlN+L3Rt9b8hwh0bhsAQiWF5ujIo3mivFD6BQQAyK52Qz778VRPK39k0gpYxqltcJEfjJ832arvNO9XseUKUQAi50gVyXfxD3yQK++0U1E9isF+VyLd1m5MgrtPlP20Ab2PJD6UUaMpr1rEldP9jVsGpVowntC/Hp4/ljCeppize4CRgZjWDHE+Yj+TWmVeuUTObniVWpE/eiQoDIe+FBWPeStq3UMPW5viUafzf2sCUxMyc/ZTUqy8wzDZEyfJ7OGaoxPrQ== svogel2@eonerc.rwth-aachen.de

    # Set this to true if you want to login via SSH keys only.
    # If you dont have an SSH key, set this to false.
    # Important: Dont forget to change the default password after your first login!
    disable_password_login: false

    # The URL of a K3S master provided by your RIasC provider
    server: https://k3s.riasc.eu/

    # Replace this token with the token provided by your RIasC provider
    token: XXXXX # changeme!
```
