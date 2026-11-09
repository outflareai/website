import { allDocs, docMarkdownPath } from '../lib/markdown';
import { playbooks } from '../data/playbooks';
import { positioning } from '../data/positioning';
import { app, repo } from '../data/project';
import { allPages, pathOf, sectionOf } from '../lib/pages';
import { sections } from '../data/sections';

// An index of the site for LLMs and agents, following https://llmstxt.org.
// /llms-full.txt has every docs page in full, and each docs page has a
// Markdown copy at its path plus .md.
export async function GET({ site }: { site: URL }) {
	const docs = await allDocs();
	const pages = await allPages();
	const abs = (path: string) => new URL(path, site).href;
	const lines = [
		'# Outflare',
		'',
		`> ${positioning.summary}`,
		'',
		'Key facts:',
		'',
		'- Open source: the engine is AGPL-3.0, the SDKs Apache-2.0. Self-host it with Docker Compose (one Go binary and Postgres).',
		`- Hosted: Outflare Cloud at ${app.url}, free during early access (sign up at ${app.signUp}).`,
		'- Bring your own keys: every workspace connects its own AI model key and its own accounts for third-party tools. Outflare never supplies or resells API keys or AI usage.',
		`- Agents: an MCP server at ${app.url}/mcp for Claude, ChatGPT, Cursor and any MCP client, and an OpenAPI 3.1 REST API with scoped, audited tokens.`,
		'',
		`Source: ${repo.url}`,
		`API contract: ${abs('/openapi.yaml')}`,
		`Every docs page in one file: ${abs('/llms-full.txt')}`,
		`Changelog (daily, JSON): ${abs('/changelog.json')}`,
		'',
		'## Docs',
		'',
		...docs.map((d) => `- [${d.data.title}](${abs(docMarkdownPath(d))})${d.data.description ? `: ${d.data.description}` : ''}`),
		`- [Endpoint reference](${abs('/docs/api/reference/')}): Every API endpoint, generated from the OpenAPI contract.`,
		'',
		...sections.flatMap((sec) => {
			const list = pages.filter((p) => sectionOf(p) === sec.id);
			return list.length
				? [`## ${sec.label}`, '', ...list.map((p) => `- [${p.data.label}](${abs(pathOf(p))}): ${p.data.answer}`), '']
				: [];
		}),
		'## Free tools',
		'',
		`- [SPF, DKIM and DMARC checker](${abs('/tools/dmarc-checker/')}): Check a domain's email authentication and MX, with the DNS record to add for each problem. API: GET ${app.url}/v1/tools/domain-check?domain=acme.example (public).`,
		`- [Domain blacklist checker](${abs('/tools/blacklist-checker/')}): Check whether a domain is on the Spamhaus DBL or SURBL.`,
		'',
		'## Site',
		'',
		`- [Integrations](${abs('/integrations/')}): Every tool Outflare connects to, and what it does with each.`,
		`- [Pricing](${abs('/pricing/')}): Free to self-host, free on Outflare Cloud during early access; you pay your own providers directly.`,
		`- [Changelog](${abs('/changelog/')}): What changed each day.`,
		'',
		'## Playbooks',
		'',
		'Ready-made growth recipes. Read one with GET https://app.outflare.ai/v1/playbooks/{id} (public) or the MCP tool get_playbook, and start it with start_playbook.',
		'',
		...playbooks.map((p) => `- [${p.title}](${abs(`/playbooks/${p.id}/`)}): ${p.summary}`),
		'',
	];
	return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
