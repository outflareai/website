#!/usr/bin/env node
// Fails when a page, doc, data file or script in this repository names a real customer,
// a customer's brand or product, a partner or a person (AGENTS.md, "No real names").
//
//   node scripts/check-real-names.mjs              # every tracked text file
//   node scripts/check-real-names.mjs a.md b.md    # only these files
//   REAL_NAMES_FILE=names.txt node scripts/...     # also a fuller private list, one name a line
//
// The names are kept here only as SHA-256 hashes of the lowercase word, so this public file
// doesn't list them. It prints the file and line, never the name.
//
// A real company that is also a connector a workspace connects may be named as that
// connector, and only there: on the connector docs pages, or in text that is about connecting
// it, its account, key, budget or what it reads (the sentence that names it). Anywhere else (an example brand, a customer, "such as X and Y") fails.
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const sha256 = (s) => createHash('sha256').update(s).digest('hex');

// Customers, their brands and partners, and people (the team included). Never named.
const never = new Set([
	'1be22ec382ad1d4b07a57f96c135bd20fa8d372b4b90523ec5a5d0864e8cae3e',
	'b4339ff6c9f7bc5920532a5778377093b75c71daa4c05be791cd30553b2cafd0',
	'31611159e7e6ff7843ea4627745e89225fc866621cfcfdbd40871af4413747cc',
	'00288e37e35426e83827209ce6d0c37a75a4f45bdd44dc102380ed83a373ed25',
	'7ddac71b78999671c9d22677a496f4ef1fe6d127521ee0926256aea4f2b5f8e6',
	'a7addf2c6e799b2417259e5ea4d6f0b4bc0012da6a37d20058258a61a63e45fb',
	'f5a38e4245e1c0094edfe353a8d77577f61031999ec900c57de05640cb5459d9',
	'6df95ad0a252c668a60791c4747a38010aae58d60ca2bac205551b482c6982c9',
	'b0bb3493078f33dc8d944d1925da1272167881f8d701666f3868019905f45d66',
	'accca599f657ca9614464e655ad253f7d41076b05bab30664c792d889e456387',
	'34550715062af006ac4fab288de67ecb44793c3a05c475227241535f6ef7a81b',
	'23eb127b3caf920d3dd72f834b35b73e5b8bda870b0d7147838d182b5a9dd789',
]);
// Real companies that are also connectors: named only as the connector.
const connectorOnly = new Set(['53ebdaa0114088a121815671084f5846800761b6934320ce66a754f19947d286']);

// Words that show a sentence is about the connector itself.
const aboutConnector =
	/\b(connect\w*|connector\w*|integrations?|accounts?|keys?|tokens?|credits?|budgets?|readers?|scrap\w*|serp|search\w*|api|apis|plan|bills?|billed|pay|webhooks?|dashboard|fetch\w*|read|reads|reading|render\w*|crawl\w*|usage|loads?|needs?|check\w*|request\w*|through|via|dataforseo|ahrefs)\b/i;

// Generated from the connector catalog, and the connector docs: every mention there is the connector.
const catalogFiles = new Set(['src/data/integrations.json', 'src/data/playbooks.json']);
const skip = /(^|\/)(package-lock\.json)$|\.(png|jpe?g|webp|gif|ico|avif|woff2?|ttf|otf|pdf|mp4|webm|zip)$/i;

for (const n of extraNames()) (connectorOnly.has(sha256(n)) ? connectorOnly : never).add(sha256(n));

function extraNames() {
	const f = process.env.REAL_NAMES_FILE;
	if (!f) return [];
	return readFileSync(f, 'utf8')
		.split('\n')
		.map((l) => l.trim().toLowerCase())
		.filter((l) => l && !l.startsWith('#') && /^[a-z0-9]+$/.test(l));
}

const files = process.argv.length > 2 ? process.argv.slice(2) : execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' }).split('\0').filter(Boolean);

let bad = 0;
let checked = 0;
for (const file of files) {
	if (skip.test(file) || file === 'scripts/check-real-names.mjs') continue;
	let text;
	try {
		text = readFileSync(file, 'utf8');
	} catch {
		continue;
	}
	if (text.includes('\0')) continue;
	checked++;
	const lines = text.split('\n');
	const connectorPage = catalogFiles.has(file) || file.startsWith('src/content/docs/docs/integrations/');
	lines.forEach((line, i) => {
		const why = problem(lines, i, connectorPage);
		if (!why) return;
		bad++;
		console.error(`${file}:${i + 1}: ${why}`);
	});
}

function namesConnector(text) {
	return (text.toLowerCase().match(/[a-z0-9]+/g) ?? []).some((w) => connectorOnly.has(sha256(w)));
}

function problem(lines, i, connectorPage) {
	const words = lines[i].toLowerCase().match(/[a-z0-9]+/g) ?? [];
	if (words.some((w) => never.has(sha256(w)))) return 'names a real customer, brand, partner or person. Use Northpeak, Summitly or Acme, or describe it ("your web data connection").';
	if (connectorPage || !namesConnector(lines[i])) return '';
	// Specs and Markdown wrap sentences over lines: read the paragraph around the line, and
	// check each sentence on this line that names the connector.
	let from = i;
	let to = i;
	while (from > 0 && i - from < 8 && lines[from - 1].trim()) from--;
	while (to < lines.length - 1 && to - i < 8 && lines[to + 1].trim()) to++;
	let at = 0;
	for (let j = from; j < i; j++) at += lines[j].length + 1;
	const para = lines.slice(from, to + 1).join('\n');
	const end = at + lines[i].length;
	let pos = 0;
	for (const s of para.split(/(?<=[.!?])\s+/)) {
		const start = para.indexOf(s, pos);
		pos = start + s.length;
		if (pos < at || start > end || !namesConnector(s)) continue;
		if (!aboutConnector.test(s)) return 'names a real company outside its connector. Name it only where the text is about connecting or using that connector; for an example company use Northpeak, Summitly or Acme.';
	}
	return '';
}

if (bad) {
	console.error(`\n${bad} line(s) name a real customer, brand, partner or person (AGENTS.md, "No real names").`);
	process.exit(1);
}
console.log(`No real names in ${checked} files.`);
