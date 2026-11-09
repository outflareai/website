import type { APIRoute, GetStaticPaths } from 'astro';
import { allDocs, docMarkdownPath, toMarkdown, type Doc } from '../../lib/markdown';

// A Markdown copy of every docs page, at the page's path plus .md
// (/docs/guides/warmup.md), for agents and AI search: the same words without
// the page chrome. Each docs page links to its copy (src/components/Head.astro).
export const getStaticPaths = (async () =>
	(await allDocs()).map((doc) => ({
		params: { slug: docMarkdownPath(doc).replace(/^\/docs\//, '').replace(/\.md$/, '') },
		props: { doc },
	}))) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props, site }) =>
	new Response(toMarkdown((props as { doc: Doc }).doc, site!), {
		headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
	});
