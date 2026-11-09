// Plain Markdown versions of the docs for LLMs and agents: /llms-full.txt and
// a .md copy of every docs page (src/pages/docs/[...slug].md.ts). MDX imports
// and component tags are dropped so only the words and code stay.
import { getCollection, type CollectionEntry } from 'astro:content';

export type Doc = CollectionEntry<'docs'>;

export const docPath = (d: Doc) => `/${d.id.replace(/\/?index$/, '')}/`;
export const docMarkdownPath = (d: Doc) => {
	const id = d.id.replace(/\/index$/, '');
	return `/${id === 'docs' ? 'docs/index' : id}.md`;
};

export async function allDocs() {
	return (await getCollection('docs')).sort((a, b) => a.id.localeCompare(b.id));
}

// Strip what only MDX understands, outside code fences.
export function toMarkdown(d: Doc, site: URL) {
	const out: string[] = [];
	let fence = false;
	for (const line of (d.body ?? '').split('\n')) {
		if (/^\s*(```|~~~)/.test(line)) fence = !fence;
		if (!fence) {
			if (/^import\s.+from\s+['"].+['"];?\s*$/.test(line)) continue;
			// Self-closing or opening/closing component tags on their own line.
			if (/^\s*<\/?[A-Z][\w.]*(\s[^>]*)?\/?>\s*$/.test(line)) continue;
		}
		// Status pills (<span class="pill shipped">Shipped</span>) read as bold words.
		out.push(fence ? line : line.replace(/<span class="pill[^"]*">([^<]+)<\/span>/g, '**$1**'));
	}
	const body = out.join('\n').replace(/\n{3,}/g, '\n\n').trim();
	const url = new URL(docPath(d), site).href;
	const head = [`# ${d.data.title}`, '', `Source: ${url}`];
	if (d.data.description) head.push('', `> ${d.data.description}`);
	return `${head.join('\n')}\n\n${body}\n`;
}
