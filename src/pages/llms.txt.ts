import { getCollection } from 'astro:content';
import { playbooks } from '../data/playbooks';

// An index of the docs for LLMs and agents, following https://llmstxt.org.
export async function GET({ site }: { site: URL }) {
	const docs = (await getCollection('docs')).sort((a, b) => a.id.localeCompare(b.id));
	const url = (id: string) => new URL(`/${id.replace(/\/?index$/, '')}/`, site).href;
	const lines = [
		'# Outflare',
		'',
		'> Open-source GTM infrastructure for humans and agents. A self-hostable cold-email sequencer with bulk mailbox connection, scoped API tokens and a policy check on every send. Go engine, Postgres, OpenAPI 3.1 REST API, AGPL-3.0 core and Apache-2.0 SDK.',
		'',
		'Source: https://github.com/outflareai/outflare',
		'Hosted app (free during early access): https://app.outflare.ai (sign up at https://app.outflare.ai/signup)',
		`API contract: ${new URL('/openapi.yaml', site).href}`,
		'',
		'## Docs',
		'',
		...docs.map((d) => `- [${d.data.title}](${url(d.id)})${d.data.description ? `: ${d.data.description}` : ''}`),
		`- [Endpoint reference](${new URL('/docs/api/reference/', site).href}): Every API endpoint, generated from the OpenAPI contract.`,
		'',
		'## Playbooks',
		'',
		'Ready-made growth recipes. Read one with GET https://app.outflare.ai/v1/playbooks/{id} (public) or the MCP tool get_playbook, and start it with start_playbook.',
		'',
		...playbooks.map((p) => `- [${p.title}](${new URL(`/playbooks/${p.id}/`, site).href}): ${p.summary}`),
		'',
	];
	return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
