import { areas, days, editions, selfHostedFor } from '../data/changelog';

// The changelog as data, newest day first, for agents, the app's What's new panel
// and anything else that wants to follow it. Same content as /changelog/.
export function GET({ site }: { site: URL }) {
	const body = {
		home: new URL('/changelog/', site).href,
		days: days.map((d) => ({
			version: d.version,
			date: d.date,
			status: d.status,
			updated: d.updated,
			url: new URL(`/changelog/#${d.date}`, site).href,
			self_hosted: selfHostedFor(d) ?? null,
			items: d.items.map((i) => ({
				kind: i.kind,
				area: i.area,
				area_label: areas[i.area] ?? i.area,
				edition: i.edition,
				edition_label: editions[i.edition],
				text: i.text,
				prs: (i.prs ?? []).map((n) => `https://github.com/outflareai/outflare/pull/${n}`),
				thanks: i.thanks ?? [],
				at: i.at ?? null,
			})),
		})),
	};
	return new Response(JSON.stringify(body, null, 2), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}
