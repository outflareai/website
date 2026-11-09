import { allDocs, toMarkdown } from '../lib/markdown';
import { positioning } from '../data/positioning';

// Every docs page in one Markdown file, for LLMs and agents that read a whole
// product at once (https://llmstxt.org). /llms.txt is the short index.
export async function GET({ site }: { site: URL }) {
	const docs = await allDocs();
	const head = `# Outflare\n\n> ${positioning.summary}\n\nShort index: ${new URL('/llms.txt', site).href}\n`;
	const text = [head, ...docs.map((d) => toMarkdown(d, site))].join('\n---\n\n');
	return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
