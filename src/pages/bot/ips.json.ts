import { bot, ips } from '../../data/bot';

// /bot/ips.json: the addresses OutflareBot crawls from, in the same shape
// Google publishes for Googlebot, so existing verification scripts read it.
export function GET() {
	const body = {
		creationTime: `${ips.updated}T00:00:00Z`,
		userAgentToken: bot.token,
		documentation: bot.page,
		prefixes: ips.prefixes,
	};
	return new Response(JSON.stringify(body, null, 2) + '\n', {
		headers: { 'Content-Type': 'application/json; charset=utf-8' },
	});
}
