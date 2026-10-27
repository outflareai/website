// Copies api/openapi.yaml from the main repo into spec/openapi.yaml.
//
//   npm run sync-spec               # from outflareai/engine@main (GITHUB_TOKEN: a token that can read it)
//   npm run sync-spec -- mailboxes  # from another branch, tag or commit
//   OUTFLARE_DIR=../outflare npm run sync-spec   # from a local checkout
import { readFile, writeFile } from 'node:fs/promises';

const ref = process.argv[2] || 'main';
const out = new URL('../spec/openapi.yaml', import.meta.url);

const dir = process.env.OUTFLARE_DIR;

let spec;
if (dir) {
	spec = await readFile(`${dir}/api/openapi.yaml`, 'utf8');
} else {
	const url = `https://raw.githubusercontent.com/outflareai/engine/${ref}/api/openapi.yaml`;
	const token = process.env.GITHUB_TOKEN;
	const res = await fetch(url, token ? { headers: { Authorization: `Bearer ${token}` } } : {});
	if (!res.ok) {
		console.error(`Could not fetch ${url}: ${res.status} ${res.statusText}`);
		process.exit(1);
	}
	spec = await res.text();
}
await writeFile(out, spec);
console.log(`Updated spec/openapi.yaml (${spec.length} bytes) from ${dir || ref}`);
