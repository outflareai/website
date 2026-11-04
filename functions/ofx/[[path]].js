// Cloudflare Pages Function: serves Outflare's own website tracking from
// outflare.ai/ofx/, forwarding /ofx/site.js and /ofx/v1/site/* to
// app.outflare.ai. Coming through our own domain, the visitor cookie lasts in
// Safari past its seven-day limit and ad blockers don't drop the tag.
// Only the tracking paths are forwarded, never the rest of the API.
//
// OUTFLARE_PROXY_SECRET (a Pages secret, the site key's proxy secret, ofp_...)
// is optional: with it, Outflare takes the visitor's own address and country
// from the headers below instead of Cloudflare's.
const ORIGIN = 'https://app.outflare.ai';

export async function onRequest({ request, env }) {
	const url = new URL(request.url);
	const path = url.pathname.replace(/^\/ofx/, '') || '/';
	if (path !== '/site.js' && !path.startsWith('/v1/site/')) {
		return new Response('Not found', { status: 404 });
	}

	const headers = new Headers(request.headers);
	headers.delete('x-outflare-proxy');
	headers.delete('x-outflare-client-ip');
	headers.delete('x-outflare-country');
	const secret = (env.OUTFLARE_PROXY_SECRET || '').trim();
	if (secret) {
		headers.set('x-outflare-proxy', secret);
		const ip = request.headers.get('cf-connecting-ip');
		if (ip) headers.set('x-outflare-client-ip', ip);
		const country = request.headers.get('cf-ipcountry');
		if (country && /^[A-Z]{2}$/.test(country)) headers.set('x-outflare-country', country);
	}

	return fetch(`${ORIGIN}${path}${url.search}`, {
		method: request.method,
		headers,
		body: request.method === 'GET' || request.method === 'HEAD' ? undefined : request.body,
		redirect: 'manual',
	});
}
