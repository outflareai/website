// Copies api/openapi.yaml from the main repo into spec/openapi.yaml.
//
//   npm run sync-spec               # from main (GITHUB_TOKEN: a token that can read the private repository)
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
	// The engine's code is a folder of the Cloud repository; a branch, tag
	// or commit from before it moved is still read from the engine's own.
	const urls = [
		`https://raw.githubusercontent.com/outflareai/cloud/${ref}/upstream/outflare/api/openapi.yaml`,
		`https://raw.githubusercontent.com/outflareai/engine/${ref}/api/openapi.yaml`,
	];
	const token = process.env.GITHUB_TOKEN;
	const tried = [];
	for (const url of urls) {
		const res = await fetch(url, token ? { headers: { Authorization: `Bearer ${token}` } } : {});
		if (res.ok) {
			spec = await res.text();
			break;
		}
		tried.push(`${url}: ${res.status} ${res.statusText}`);
	}
	if (spec === undefined) {
		console.error(`Could not fetch the spec:\n${tried.join('\n')}`);
		process.exit(1);
	}
}
await writeFile(out, spec);
console.log(`Updated spec/openapi.yaml (${spec.length} bytes) from ${dir || ref}`);
