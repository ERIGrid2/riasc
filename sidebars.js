module.exports = {
  docs: [
	{
		type: 'category',
		label: 'Getting started',
		items: ['index', 'getting-started', 'further-reading'],
	},
	{
		type: 'category',
		label: 'Design',
		items: [
			'design/ip-overlay',
			'design/ip-gateway',
			'design/network-emulation',
			'design/network-monitoring',
			'design/code-generation'
		]
	},
	{
		type: 'category',
		label: 'Setup',
		items: [
			'setup/index',
			'setup/server',
			{
				type: 'category',
				label: 'Agent',
				items: [
					'setup/agent',
					'setup/agent-manual',
					'setup/agent-rpi',
					'setup/agent-cloud-init',
					'setup/config'
				]
			}
		]
	},
	{
		type: 'category',
		label: 'Usage',
		items: [
			'usage/index',
			'usage/rancher',
			'usage/time-sync'
		]
	},
	{
		type: 'category',
		label: 'Examples',
		items: [
			'examples/index'
		]
	},
	{
		type: 'category',
		label: 'Development',
		items: [
			'development/rpi-image'
		]
	},
	'terminology'
  ]
};
