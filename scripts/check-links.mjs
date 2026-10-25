// Fails if any internal link or #anchor in dist/ points at a page or heading
// that does not exist. Run after `npm run build`.
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../dist/', import.meta.url).pathname;
const files = [];
(function walk(dir) {
	for (const name of readdirSync(dir)) {
		const p = join(dir, name);
		if (statSync(p).isDirectory()) walk(p);
		else if (p.endsWith('.html')) files.push(p);
	}
})(root);

const target = (href) => join(root, href.endsWith('/') ? `${href}index.html` : href);
const problems = [];
for (const file of files) {
	const html = readFileSync(file, 'utf8');
	for (const [, path, anchor] of html.matchAll(/href="(\/[^"#?]*)(?:#([^"]*))?"/g)) {
		const t = target(path);
		if (!existsSync(t)) problems.push(`${file.slice(root.length)}: ${path} does not exist`);
		else if (anchor && t.endsWith('.html') && !readFileSync(t, 'utf8').includes(`id="${anchor}"`))
			problems.push(`${file.slice(root.length)}: ${path}#${anchor} has no such heading`);
	}
}
if (problems.length) {
	console.error([...new Set(problems)].join('\n'));
	process.exit(1);
}
console.log(`Checked links in ${files.length} pages.`);
