// Docs describe what app.outflare.ai does today, so a pull request that
// documents an engine or Cloud change merges only once production runs it.
// CI runs this on every pull request (the "deployed" job):
//
//   - If the pull request changes spec/openapi.yaml, production must serve
//     exactly that file at /v1/openapi.yaml.
//   - Each "Needs outflareai/outflare#NN" (or outflareai/cloud#NN) line in
//     the pull request's description names a pull request that must be
//     merged and included in the version production reports at /v1/meta
//     (<engine commit>+<cloud commit>).
//
// Until then the check fails and says what it is waiting for. Re-run it once
// the deploy is done. Reading the private repositories needs DEPLOY_CHECK_TOKEN.
//
//   APP_URL=https://app.outflare.ai PR_BODY="..." SPEC_CHANGED=1 node scripts/check-deployed.mjs
import { readFile } from 'node:fs/promises';

const app = (process.env.APP_URL || 'https://app.outflare.ai').replace(/\/$/, '');
const token = process.env.DEPLOY_CHECK_TOKEN || '';
const body = process.env.PR_BODY || '';
const specChanged = process.env.SPEC_CHANGED === '1';

const problems = [];

async function get(url, headers = {}) {
	const res = await fetch(url, { headers: { 'User-Agent': 'outflare-docs-check', ...headers } });
	if (!res.ok) throw new Error(`${url}: ${res.status} ${res.statusText}`);
	return res;
}

const meta = await (await get(`${app}/v1/meta`)).json();
const [engineLive, cloudLive] = String(meta.version || '').split('+');
console.log(`Production (${app}) runs ${meta.version || 'an unknown version'}.`);

if (specChanged) {
	const live = await (await get(`${app}/v1/openapi.yaml`)).text();
	const ours = await readFile(new URL('../spec/openapi.yaml', import.meta.url), 'utf8');
	if (live.trim() !== ours.trim()) {
		problems.push(
			'spec/openapi.yaml is not what production serves yet. Wait for the engine change to deploy (or re-copy the spec with npm run sync-spec if production is newer), then re-run this check.',
		);
	} else {
		console.log('ok    spec/openapi.yaml matches production');
	}
}

const needs = [...body.matchAll(/\bNeeds:?\s+(?:https:\/\/github\.com\/)?outflareai\/(outflare|cloud)(?:#|\/pull\/)(\d+)/gi)].map(
	(m) => ({ repo: m[1].toLowerCase(), number: Number(m[2]) }),
);
const gh = (path) =>
	get(`https://api.github.com/repos/outflareai/${path}`, {
		Accept: 'application/vnd.github+json',
		...(token ? { Authorization: `Bearer ${token}` } : {}),
	}).then((r) => r.json());

for (const { repo, number } of needs) {
	const name = `outflareai/${repo}#${number}`;
	const live = repo === 'outflare' ? engineLive : cloudLive;
	try {
		const pr = await gh(`${repo}/pulls/${number}`);
		if (!pr.merged_at) {
			problems.push(`${name} is not merged yet.`);
			continue;
		}
		if (!live) {
			problems.push(`${name} is merged, but production doesn't report which ${repo} commit it runs yet.`);
			continue;
		}
		// The live commit contains the merge when it is the same or ahead of it.
		const cmp = await gh(`${repo}/compare/${pr.merge_commit_sha}...${live}`);
		if (cmp.status === 'identical' || cmp.status === 'ahead') {
			console.log(`ok    ${name} is live`);
		} else {
			problems.push(`${name} is merged but not deployed yet (production runs ${repo} ${live}). Re-run this check after the deploy.`);
		}
	} catch (err) {
		problems.push(
			`Could not check ${name}: ${err.message}.${token ? '' : ' The private repositories need the DEPLOY_CHECK_TOKEN secret (AGENTS.md).'}`,
		);
	}
}

if (!specChanged && needs.length === 0) console.log('Nothing here waits on a deploy.');
for (const p of problems) console.log(`::error::${p}`);
process.exit(problems.length ? 1 : 0);
