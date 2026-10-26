// OutflareBot, the crawler behind Outflare's SEO audits. The /bot/ page and
// /bot/ips.json both read this file, so the published addresses and the page
// never disagree. Add an address here before a server starts crawling from
// it, and bump `updated`.

export const bot = {
	token: 'OutflareBot',
	version: '1.0',
	page: 'https://outflare.ai/bot/',
	email: 'crawl@outflare.ai',
	// Whether Outflare Cloud runs the crawler yet. Flip to true when the SEO
	// module's crawler ships.
	live: false,
};

// What OutflareBot sends: plain fetches, and pages rendered in headless
// Chrome (the same token, so one robots.txt rule covers both).
export const userAgents = [
	{ label: 'Pages', ua: `Mozilla/5.0 (compatible; ${bot.token}/${bot.version}; +${bot.page})` },
	{
		label: 'Rendered pages',
		ua: `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/W.X.Y.Z Safari/537.36 (compatible; ${bot.token}/${bot.version}; +${bot.page})`,
	},
];

// The addresses Outflare Cloud crawls from, as CIDR prefixes. Empty until the
// crawler runs. Keep `updated` as an ISO date.
export const ips: { updated: string; prefixes: { ipv4Prefix?: string; ipv6Prefix?: string }[] } = {
	updated: '2026-10-26',
	prefixes: [],
};
