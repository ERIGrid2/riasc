---
id: agent-cloud-init
title: Cloud-init
sidebar_label: Cloud-init
sidebar_positon: 3
slug: /setup/agent/cloud-init
---

Most cloud providers allow the provisioning of new instances via [cloud-init](https://cloud-init.io/).

Use the following snippet as user-data to provision a new RIasC agent.

```cloud-init
#include

https://raw.githubusercontent.com/ERIGrid2/riasc-provisioning/master/common/riasc-update.sh
```

You also need provide the [riasc.yaml](config.md) configuration file as [instance metadata](https://cloudinit.readthedocs.io/en/latest/topics/instancedata.html).
