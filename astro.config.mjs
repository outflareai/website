// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';

const repo = 'https://github.com/outflareai/outflare';

export default defineConfig({
	// Canonical URLs and the sitemap use https://outflare.ai; SITE_URL overrides it (for previews).
	site: process.env.SITE_URL || 'https://outflare.ai',
	trailingSlash: 'always',
	// Tailwind only styles the marketing pages (src/styles/marketing.css); the
	// docs keep Starlight's CSS mapped onto the same tokens.
	vite: { plugins: [tailwindcss()] },
	integrations: [
		starlight({
			title: 'Outflare',
			description:
				'Open-source GTM infrastructure for humans and agents. Self-host a cold-email sequencer with bulk mailbox connection and a policy check on every send.',
			logo: { light: './src/assets/logo-light.svg', dark: './src/assets/logo-dark.svg', alt: 'Outflare', replacesTitle: true },
			favicon: '/favicon.svg',
			social: [{ icon: 'github', label: 'GitHub', href: repo }],
			customCss: [
				'@fontsource-variable/geist',
				'@fontsource-variable/geist-mono',
				'./src/styles/tokens.css',
				'./src/styles/docs.css',
			],
			components: {
				ThemeProvider: './src/components/ThemeProvider.astro',
				ThemeSelect: './src/components/ThemeSelect.astro',
				SocialIcons: './src/components/HeaderLinks.astro',
				Head: './src/components/Head.astro',
			},
			expressiveCode: {
				themes: ['github-dark-default', 'github-light-default'],
				styleOverrides: {
					borderRadius: '0.75rem',
					borderColor: 'var(--border)',
					codeFontFamily: 'var(--font-mono)',
					uiFontFamily: 'var(--font-sans)',
				},
			},
			lastUpdated: true,
			head: [
				{ tag: 'link', attrs: { rel: 'alternate', type: 'text/plain', href: '/llms.txt', title: 'llms.txt' } },
				{ tag: 'link', attrs: { rel: 'icon', href: '/favicon.ico', sizes: '16x16 32x32 48x48' } },
				{ tag: 'link', attrs: { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' } },
				{ tag: 'link', attrs: { rel: 'manifest', href: '/site.webmanifest' } },
				{ tag: 'meta', attrs: { name: 'theme-color', content: '#0a0a0a' } },
				{ tag: 'meta', attrs: { property: 'og:image', content: 'https://outflare.ai/brand/social/outflare-social-1200x630.png' } },
				{ tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
				{ tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
				{ tag: 'meta', attrs: { property: 'og:image:alt', content: 'Outflare: the open-source GTM platform for humans and agents' } },
				{ tag: 'meta', attrs: { name: 'twitter:image', content: 'https://outflare.ai/brand/social/outflare-social-1200x630.png' } },
			],
			sidebar: [
				{
					label: 'Start here',
					items: [
						{ label: 'Introduction', link: '/docs/' },
						{ label: 'Quickstart', link: '/docs/quickstart/' },
						{ label: 'Status and roadmap', link: '/docs/project/roadmap/' },
					],
				},
				{ label: 'Concepts', items: [{ autogenerate: { directory: 'docs/concepts' } }] },
				{ label: 'Self-hosting', items: [{ autogenerate: { directory: 'docs/self-hosting' } }] },
				{ label: 'Guides', items: [{ autogenerate: { directory: 'docs/guides' } }] },
				{ label: 'Integrations', items: [{ autogenerate: { directory: 'docs/integrations' } }] },
				{
					label: 'API',
					items: [
						{ label: 'Overview', link: '/docs/api/' },
						{ label: 'Authentication', link: '/docs/api/authentication/' },
						{ label: 'Webhooks', link: '/docs/api/webhooks/' },
						{ label: 'Logs', link: '/docs/api/logs/' },
						{ label: 'Test workspaces', link: '/docs/api/sandbox/' },
						{ label: 'Endpoint reference', link: '/docs/api/reference/' },
					],
				},
				{ label: 'SDK', items: [{ autogenerate: { directory: 'docs/sdk' } }] },
				{ label: 'Agents, MCP and CLI', items: [{ autogenerate: { directory: 'docs/agents' } }] },
				{
					label: 'Project',
					items: [
						{ label: 'Status and roadmap', link: '/docs/project/roadmap/' },
						{ label: 'Open source and licensing', link: '/docs/project/license/' },
						{ label: 'Contributing', link: '/docs/project/contributing/' },
						{ label: 'Security', link: '/docs/project/security/' },
						{ label: 'FAQ', link: '/docs/project/faq/' },
					],
				},
			],
		}),
	],
});
