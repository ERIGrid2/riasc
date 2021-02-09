module.exports = {
  title: 'RIasC',
  tagline: 'Research Infrastructure as Code',
  url: 'https://riasc.fein-aachen.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logos/riasc.svg',
  organizationName: 'RIasCode', // Usually your GitHub org/user name.
  projectName: 'website', // Usually your repo name.
  themeConfig: {
    hideableSidebar: true,
    navbar: {
      title: 'RIasC',
      logo: {
        alt: 'RIasC Logo',
        src: 'img/logos/riasc.svg',
        srcDark: 'img/logos/riasc-dark.svg'
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/riascode/',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
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
          items: [
            {
              label: 'Institute for Automation Complex Power Systems',
              href: 'https://acs.eonerc.rwth-aachen.de',
            },
            {
              label: 'ERIGrid Project',
              href: 'https://erigrid2.eu',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
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
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
