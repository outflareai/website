// Cloudflare Pages Function: /github-stars answers {"stars": n} for the
// engine's GitHub repository, or {"stars": null} while it is private or
// GitHub can't be reached, so the site's GitHub buttons show a fresh count
// between deploys. Each Cloudflare location asks GitHub at most once an
// hour, well inside its limit for calls without a token.
const repo = 'outflareai/outflare';
const ttl = 3600;

export async function onRequestGet({ request, waitUntil }) {
	const cache = caches.default;
	const key = new Request(new URL('/github-stars', request.url).toString());
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
		// Leave stars null: the buttons keep the count from the build.
	}
	const res = new Response(JSON.stringify({ stars }), {
		headers: {
			'content-type': 'application/json',
			// A failed lookup is tried again sooner.
			'cache-control': `public, max-age=${stars === null ? 300 : ttl}`,
		},
	});
	waitUntil(cache.put(key, res.clone()));
	return res;
}
