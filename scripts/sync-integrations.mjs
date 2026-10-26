// Copies the connector catalog and every connector's logo from an Outflare
// server into the site, for the /integrations/ pages.
//
//   npm run sync-integrations                                  # from https://app.outflare.ai
//   OUTFLARE_URL=http://localhost:8080 npm run sync-integrations   # from a local `make run`
//
// Writes src/data/integrations.json and public/integrations/logos/{id}.svg
// (plus {id}.dark.svg where the company has a light-on-dark variant).
import { mkdir, rm, writeFile } from 'node:fs/promises';

const base = (process.env.OUTFLARE_URL || 'https://app.outflare.ai').replace(/\/$/, '');
const data = new URL('../src/data/integrations.json', import.meta.url);
const logos = new URL('../public/integrations/logos/', import.meta.url);

async function get(path) {
	const res = await fetch(base + path);
	if (!res.ok) {
		console.error(`Could not fetch ${base + path}: ${res.status} ${res.statusText}`);
		process.exit(1);
	}
	return res;
}

const { data: catalog } = await (await get('/v1/connectors')).json();

// Only what the public pages show: nothing about this server's own setup.
const keep = ['id', 'name', 'category', 'summary', 'description', 'website', 'docs_url', 'auth_methods', 'capabilities', 'status', 'pricing'];
const out = catalog
	.filter((c) => c.id !== 'builtin')
	.map((c) => Object.fromEntries(keep.filter((k) => c[k] != null && c[k] !== '').map((k) => [k, c[k]])));

await rm(logos, { recursive: true, force: true });
await mkdir(logos, { recursive: true });
for (const c of out) {
	const id = encodeURIComponent(c.id);
	const light = await (await get(`/v1/connectors/${id}/logo.svg`)).text();
	const dark = await (await get(`/v1/connectors/${id}/logo.svg?theme=dark`)).text();
	await writeFile(new URL(`${c.id}.svg`, logos), light);
	if (dark !== light) {
		await writeFile(new URL(`${c.id}.dark.svg`, logos), dark);
		c.dark_logo = true;
	}
}

await writeFile(data, JSON.stringify(out, null, '\t') + '\n');
console.log(`Updated src/data/integrations.json (${out.length} connectors) and their logos from ${base}`);
