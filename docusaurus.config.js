module.exports = {
    title: 'RIasC',
    tagline: 'Research Infrastructure as Code',
    url: 'https://riasc.eu',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/logos/riasc.svg',
    organizationName: 'ERIGrid2',
    projectName: 'riasc',
    themeConfig: {
        hideableSidebar: true,
        navbar: {
            title: 'RIasC',
            logo: {
                alt: 'RIasC Logo',
                src: 'img/logos/riasc.svg',
                srcDark: 'img/logos/riasc-dark.svg'
            },
            items: [{
                    to: 'docs/',
                    activeBasePath: 'docs',
                    label: 'Docs',
                    position: 'left',
                },
                { to: 'blog', label: 'Blog', position: 'left' },
                {
                    href: 'https://github.com/ERIGrid2/',
                    label: 'GitHub',
                    position: 'right',
                },
                {
                    href: 'https://erigrid2.eu/',
                    label: 'ERIGrid 2.0',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'dark',
            links: [{
                    title: 'Docs',
                    items: [{
                            label: 'Introduction',
                            to: 'docs/',
                        },
                        {
                            label: 'Getting started',
                            to: 'docs/getting-started/',
                        },
                    ],
                },
                {
                    title: 'Community',
                    items: [{
                            label: 'Institute for Automation Complex Power Systems',
                            href: 'https://acs.eonerc.rwth-aachen.de',
                        },
                        {
                            label: 'ERIGrid 2.0 Project',
                            href: 'https://erigrid2.eu',
                        },
                    ],
                },
                {
                    title: 'More',
                    items: [{
                            label: 'Blog',
                            to: 'blog',
                        },
                        {
                            label: 'GitHub',
                            href: 'https://github.com/ERIGrid2/',
                        },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} RWTH Aachen University, Institute for Automation Complex Power Systems.`,
        },
        colorMode: {
            defaultMode: 'light',
        }
    },
    presets: [
        [
            'redocusaurus',
            {
                specs: [{
                        routePath: '/api/crd/',
                        spec: 'api/crds.yaml',
                    },
                    {
                        routePath: '/api/time-sync/',
                        spec: 'api/time-sync.yaml',
                    },
                ],
            },
        ],
        [
            '@docusaurus/preset-classic',
            {
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    // Please change this to your repo.
                    editUrl: 'https://github.com/ERIGrid2/riasc/edit/master/',
                    remarkPlugins: [
                        require('mdx-mermaid'),
                    ]
                },
                blog: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    editUrl: 'https://github.com/ERIGrid2/riasc/edit/master/blog/',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            },
        ],
    ],
};