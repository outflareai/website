// The changelog's data checks and its Markdown record on GitHub.
//
//   node scripts/changelog.mjs render   writes changelog/ (one Markdown file per day and
//                                       an index) from src/data/changelog/*.json
//   node scripts/changelog.mjs check    fails on a malformed day, anything that looks
//                                       private, or a Markdown record out of step
//
// Days are written by Outflare Cloud's deploy pipeline, which runs `render` and `check`
// before it opens the pull request; CI runs `check` again on every pull request. The
// check is a backstop: Cloud lines are published only when their note says so.
import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const dataDir = join(root, 'src/data/changelog');
const outDir = join(root, 'changelog');
const engine = 'https://github.com/outflareai/outflare';

const kinds = { launch: 'New', improvement: 'Improved', fix: 'Fixed', security: 'Security' };
const editions = { 'open-source': 'Open source', cloud: 'Cloud' };
const areas = readFileSync(join(root, 'src/data/changelog.ts'), 'utf8').match(/export const areas[^{]*\{([\s\S]*?)\};/)[1];
const areaLabels = Object.fromEntries([...areas.matchAll(/'?([\w-]+)'?:\s*'([^']+)'/g)].map((m) => [m[1], m[2]]));

// What a security line may say until its fix is live everywhere and any advisory is out.
const securityWording = /^Security improvements( to [a-z ,-]+)?\.$/;

// Things that never belong in a public changelog, whatever a note says.
const private_ = [
	[/[\w.+-]+@[\w-]+\.[\w.-]+/, 'an email address'],
	[/\b\d{1,3}(\.\d{1,3}){3}\b/, 'an IP address'],
	[/https?:\/\/(?!(outflare\.ai|app\.outflare\.ai|github\.com\/outflareai)\b)/i, 'a link outside outflare.ai and github.com/outflareai'],
	[/\b[\w-]+\.(railway\.(app|internal)|up\.railway\.app|internal|local|svc)\b/i, 'an internal hostname'],
	[/\b(railway|cloudflare account|staff|admin console|\/admin|bugwatch|billing|invoice|revenue|costs? tab|abuse|fraud|turnstile|secret key|OUTFLARE_SECRET_KEY)\b/i, 'a hosted-only or internal subject'],
	[/\b(oft|ofa|ofs|ofi|sk|pk|ghp|gho|xox[abp])_[A-Za-z0-9_-]{8,}/, 'something that looks like a key or token'],
	[/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i, 'an internal id'],
	[/\b(users|customers|workspaces|signups|sign-ups)\b[^.]*\b\d{2,}\b|\b\d{2,}\b[^.]*\b(users|customers|workspaces|signups|sign-ups)\b/i, 'a production number'],
];

function load() {
	return readdirSync(dataDir)
		.filter((f) => f.endsWith('.json'))
		.sort()
		.reverse()
		.map((f) => ({ file: f, day: JSON.parse(readFileSync(join(dataDir, f), 'utf8')) }));
}

function problemsIn(file, d) {
	const out = [];
	const bad = (msg) => out.push(`${file}: ${msg}`);
	if (!/^\d{4}-\d{2}-\d{2}$/.test(d.date) || file !== `${d.date}.json`) bad('file name must be the date, YYYY-MM-DD.json');
	if (d.version !== d.date?.replaceAll('-', '.')) bad(`version must be ${d.date?.replaceAll('-', '.')}`);
	if (!['in-progress', 'final'].includes(d.status)) bad('status must be in-progress or final');
	if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?Z$/.test(d.updated ?? '')) bad('updated must be an ISO time in UTC');
	if (d.engine && !/^[0-9a-f]{7,40}$/.test(d.engine)) bad('engine must be a commit hash');
	if (d.through && !/^[0-9a-f]{7}\+[0-9a-f]{7}$/.test(d.through)) bad('through must be a production version, <engine>+<cloud>');
	if (d.selfHosted && !/^v\d+\.\d+\.\d+(-[\w.]+)?$/.test(d.selfHosted)) bad('selfHosted must be a version tag');
	if (!Array.isArray(d.items) || d.items.length === 0) bad('a day needs at least one line');
	for (const [n, i] of (d.items ?? []).entries()) {
		const at = `line ${n + 1}`;
		if (!kinds[i.kind]) bad(`${at}: kind must be one of ${Object.keys(kinds).join(', ')}`);
		if (!editions[i.edition]) bad(`${at}: edition must be open-source or cloud`);
		if (!areaLabels[i.area]) bad(`${at}: area must be one of ${Object.keys(areaLabels).join(', ')}`);
		if (typeof i.text !== 'string' || i.text.length < 10 || i.text.length > 400) bad(`${at}: text must be 10 to 400 characters`);
		if (i.edition === 'cloud' && i.prs?.length) bad(`${at}: Cloud lines never list pull requests`);
		if (i.prs && !i.prs.every((p) => Number.isInteger(p) && p > 0)) bad(`${at}: prs must be engine pull request numbers`);
		if (i.thanks && !i.thanks.every((h) => /^[A-Za-z0-9-]{1,39}$/.test(h))) bad(`${at}: thanks must be GitHub handles`);
		if (i.at && !(i.at.startsWith(d.date) && /Z$/.test(i.at))) bad(`${at}: at must be a UTC time on ${d.date}`);
		if (i.kind === 'security' && !securityWording.test(i.text)) bad(`${at}: security lines say only "Security improvements to <area>."`);
		for (const [re, what] of private_) if (re.test(i.text ?? '')) bad(`${at}: looks like ${what}`);
	}
	return out;
}

function markdown(d) {
	const lines = [`# Outflare ${d.version}`, ''];
	lines.push(d.status === 'final' ? `Final. Last updated ${d.updated.replace('T', ' ').slice(0, 16)} UTC.` : `In progress: this day closes at midnight UTC. Last updated ${d.updated.replace('T', ' ').slice(0, 16)} UTC.`);
	lines.push('', `On the web: https://outflare.ai/changelog/#${d.date}`);
	if (d.engine) lines.push(`Engine commit on Outflare Cloud: [${d.engine.slice(0, 7)}](${engine}/commit/${d.engine})`);
	if (d.selfHosted) lines.push(`Self-hosted release: [${d.selfHosted}](${engine}/releases/tag/${d.selfHosted})`);
	for (const [kind, label] of Object.entries(kinds)) {
		const items = d.items.filter((i) => i.kind === kind);
		if (!items.length) continue;
		lines.push('', `## ${label}`, '');
		for (const i of items) {
			const prs = (i.prs ?? []).map((n) => `[#${n}](${engine}/pull/${n})`).join(' ');
			const thanks = i.thanks?.length ? ` Thanks ${i.thanks.map((h) => `@${h}`).join(', ')}.` : '';
			const time = i.at ? ` (${i.at.slice(11, 16)} UTC)` : '';
			lines.push(`- **${editions[i.edition]}** · ${areaLabels[i.area]}: ${i.text}${thanks}${prs ? ` ${prs}` : ''}${time}`);
		}
	}
	return lines.join('\n') + '\n';
}

function render(days) {
	const files = new Map();
	for (const { day } of days) files.set(`${day.date.slice(0, 4)}/${day.date}.md`, markdown(day));
	const index = [
		'# Outflare changelog',
		'',
		'One file per day for what reached Outflare Cloud, named by the date in UTC. A day fills up as updates go live and is final at midnight UTC. **Open source** lines are in the [engine](https://github.com/outflareai/outflare) and reach self-hosted installs with the next release ([CHANGELOG.md](https://github.com/outflareai/outflare/blob/main/CHANGELOG.md)); **Cloud** lines are only on app.outflare.ai.',
		'',
		'Also at https://outflare.ai/changelog/, as JSON at https://outflare.ai/changelog.json and as RSS at https://outflare.ai/changelog.xml. These files are generated from `src/data/changelog/`; edit those, then run `node scripts/changelog.mjs render`.',
		'',
	];
	let month = '';
	for (const { day } of days) {
		const m = day.date.slice(0, 7);
		if (m !== month) {
			month = m;
			index.push('', `## ${new Date(`${m}-01T00:00:00Z`).toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' })}`, '');
		}
		const n = day.items.length;
		index.push(`- [${day.version}](${day.date.slice(0, 4)}/${day.date}.md): ${n} change${n === 1 ? '' : 's'}${day.status === 'final' ? '' : ' (in progress)'}`);
	}
	files.set('README.md', index.join('\n').replace(/\n{3,}/g, '\n\n') + '\n');
	return files;
}

const [cmd] = process.argv.slice(2);
const days = load();
const files = render(days);
if (cmd === 'render') {
	if (existsSync(outDir)) rmSync(outDir, { recursive: true });
	for (const [path, text] of files) {
		mkdirSync(join(outDir, path, '..'), { recursive: true });
		writeFileSync(join(outDir, path), text);
	}
	console.log(`Wrote ${files.size} files to changelog/.`);
} else if (cmd === 'check') {
	const problems = days.flatMap(({ file, day }) => problemsIn(file, day));
	for (const [path, text] of files) {
		const p = join(outDir, path);
		if (!existsSync(p) || readFileSync(p, 'utf8') !== text) problems.push(`changelog/${path} is out of step: run node scripts/changelog.mjs render`);
	}
	const want = new Set(files.keys());
	const walk = (dir, pre = '') =>
		readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(dir, e.name), `${pre}${e.name}/`) : [`${pre}${e.name}`]));
	if (existsSync(outDir)) for (const f of walk(outDir)) if (!want.has(f)) problems.push(`changelog/${f} has no day in src/data/changelog/`);
	if (problems.length) {
		console.error(problems.join('\n'));
		process.exit(1);
	}
	console.log(`Checked ${days.length} changelog days.`);
} else {
	console.error('usage: node scripts/changelog.mjs render|check');
	process.exit(2);
}
