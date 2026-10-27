// Cloudflare Pages Function: /github-stars answers {"stars": n} for the
// engine's public GitHub repository, so the site's GitHub buttons show a
// fresh count between deploys. Each Cloudflare location asks GitHub at most
// once an hour. Calls without a token share a small limit per IP, and
// Cloudflare's IPs are shared, so a failed lookup answers the last count it
// saw (kept for a week) and only {"stars": null} when it has none; the
// buttons then ask GitHub from the browser instead.
const repo = 'outflareai/outflare';
const ttl = 3600;
const keep = 7 * 24 * 3600;

export async function onRequestGet({ request, waitUntil }) {
	const cache = caches.default;
	const key = new Request(new URL('/github-stars', request.url).toString());
	const lastKey = new Request(new URL('/github-stars/last', request.url).toString());
	const hit = await cache.match(key);
	if (hit) return hit;

	let stars = null;
	try {
		const res = await fetch(`https://api.github.com/repos/${repo}`, {
			headers: { accept: 'application/vnd.github+json', 'user-agent': 'outflare.ai' },
		});
		if (res.ok) {
			const data = await res.json();
			if (data.private === false && Number.isInteger(data.stargazers_count)) stars = data.stargazers_count;
		}
	} catch {
		// Fall back to the last count below.
	}

	if (stars !== null) {
		waitUntil(cache.put(lastKey, json({ stars }, keep)));
	} else {
		const last = await cache.match(lastKey);
		if (last) stars = (await last.json()).stars ?? null;
	}
	// A failed lookup is tried again sooner.
	const res = json({ stars }, stars === null ? 300 : ttl);
	waitUntil(cache.put(key, res.clone()));
	return res;
}

function json(body, maxAge) {
	return new Response(JSON.stringify(body), {
		headers: { 'content-type': 'application/json', 'cache-control': `public, max-age=${maxAge}` },
	});
}
