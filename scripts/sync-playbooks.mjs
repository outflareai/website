// Copies the playbook library from an Outflare server into the site, for the
// /playbooks/ pages. Playbooks are files in the engine repository's
// playbooks/ folder; the engine serves them at GET /v1/playbooks.
//
//   npm run sync-playbooks                                     # from https://app.outflare.ai
//   OUTFLARE_URL=http://localhost:8080 npm run sync-playbooks  # from a local `make run`
//
// Writes src/data/playbooks.json.
import { writeFile } from 'node:fs/promises';

const base = (process.env.OUTFLARE_URL || 'https://app.outflare.ai').replace(/\/$/, '');
const data = new URL('../src/data/playbooks.json', import.meta.url);

const res = await fetch(base + '/v1/playbooks');
if (!res.ok) {
	console.error(`Could not fetch ${base}/v1/playbooks: ${res.status} ${res.statusText}`);
	process.exit(1);
}
const { data: list } = await res.json();

// Name the recommended connectors, since the site's connector list can be
// older than the playbooks.
const conn = await fetch(base + '/v1/connectors');
const names = conn.ok ? Object.fromEntries((await conn.json()).data.map((c) => [c.id, c.name])) : {};
for (const p of list) for (const n of p.needs?.connections ?? []) n.recommended_names = n.recommended.map((id) => names[id] ?? id);

// A playbook's setup kit: what it adds before the first run (GET /v1/kits).
const kitsRes = await fetch(base + '/v1/kits');
const kits = kitsRes.ok ? Object.fromEntries((await kitsRes.json()).data.map((k) => [k.id, k])) : {};
for (const p of list) {
	const k = kits[p.kit];
	if (!k) {
		delete p.kit;
		continue;
	}
	p.kit = {
		id: k.id,
		title: k.title,
		summary: k.summary,
		adds: [
			...k.record_types.map((t) => `${t.plural} pipeline`),
			...Object.entries(k.fields).map(([on, fs]) => `${fs.length} fields on ${on === 'person' ? 'people' : on === 'account' ? 'companies' : on}`),
			...(k.email_templates.length ? [`${k.email_templates.length} email drafts`] : []),
		],
		source_url: k.source_url,
	};
}

// Only what the public pages show.
const keep = ['id', 'version', 'title', 'summary', 'description', 'tier', 'goals', 'publisher', 'author', 'needs', 'inputs', 'steps', 'guardrails', 'measure', 'prompt', 'example', 'kit', 'source_url'];
const out = list.map((p) => Object.fromEntries(keep.filter((k) => p[k] != null && p[k] !== '' && !(k === 'kit' && typeof p[k] === 'string')).map((k) => [k, p[k]])));

await writeFile(data, JSON.stringify(out, null, '\t') + '\n');
console.log(`Updated src/data/playbooks.json (${out.length} playbooks) from ${base}`);
