// The engine repository's GitHub stars when the site is built, or null while
// the repository is private or GitHub can't be reached (an offline build).
// Pages show it straight away; GitHubButton.astro then refreshes it from
// /github-stars (functions/github-stars.js) so it stays current between
// deploys.
import { repo } from './project';
export { formatStars } from './format-stars';

async function load(): Promise<number | null> {
	try {
		const res = await fetch(`https://api.github.com/repos/${repo.owner}/${repo.name}`, {
			headers: { accept: 'application/vnd.github+json', 'user-agent': 'outflare.ai build' },
			signal: AbortSignal.timeout(5000),
		});
		if (!res.ok) return null;
		const data = await res.json();
		return data.private === false && Number.isInteger(data.stargazers_count) ? data.stargazers_count : null;
	} catch {
		return null;
	}
}

// Fetched once per build, however many pages show it.
export const stars = await load();
