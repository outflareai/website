import { days, editions } from '../data/changelog';

// RSS for the changelog: one item per final day, so readers get each day once, complete.
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function GET({ site }: { site: URL }) {
	const home = new URL('/changelog/', site).href;
	const items = days
		.filter((d) => d.status === 'final')
		.slice(0, 60)
		.map((d) => {
			const url = `${home}#${d.date}`;
			const list = d.items.map((i) => `<li>[${editions[i.edition]}] ${esc(i.text)}</li>`).join('');
			return `<item><title>Outflare ${d.version}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><pubDate>${new Date(`${d.date}T23:59:59Z`).toUTCString()}</pubDate><description>${esc(`<ul>${list}</ul>`)}</description></item>`;
		});
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel><title>Outflare changelog</title><link>${home}</link><description>What changed in Outflare each day.</description><language>en</language>${items.join('')}</channel></rss>
`;
	return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
