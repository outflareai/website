// Cloudflare Pages Function: forwards /ingest/* to PostHog, so analytics
// requests stay on outflare.ai (ad blockers drop third-party hosts) and PostHog
// sees the visitor's real IP for geo and its cookieless daily hash.
// PUBLIC_POSTHOG_REGION (us or eu) is the same Pages variable the build uses.
export async function onRequest({ request, env }) {
	const region = env.PUBLIC_POSTHOG_REGION === 'eu' ? 'eu' : 'us';
	const url = new URL(request.url);
	const path = url.pathname.replace(/^\/ingest/, '') || '/';
	const host = path.startsWith('/static/') ? `${region}-assets.i.posthog.com` : `${region}.i.posthog.com`;

	const headers = new Headers(request.headers);
	headers.delete('cookie');
	const ip = request.headers.get('cf-connecting-ip');
	if (ip) headers.set('x-forwarded-for', ip);

	return fetch(`https://${host}${path}${url.search}`, {
		method: request.method,
		headers,
		body: request.method === 'GET' || request.method === 'HEAD' ? undefined : request.body,
		redirect: 'manual',
	});
}
