// Helpers for the Markdown marketing pages (src/content/pages).
import { getCollection, type CollectionEntry } from 'astro:content';
import { sections } from '../data/sections';

export type Page = CollectionEntry<'pages'>;

export const sectionOf = (p: Page) => p.id.split('/')[0];
export const slugOf = (p: Page) => p.id.split('/').slice(1).join('/');
export const pathOf = (p: Page) => `/${sectionOf(p)}/${slugOf(p)}/`;

export async function allPages() {
	const ids = new Set(sections.map((s) => s.id));
	const pages = await getCollection('pages');
	for (const p of pages) {
		if (!ids.has(sectionOf(p))) throw new Error(`src/content/pages/${p.id}.md: "${sectionOf(p)}" is not a section in src/data/sections.ts`);
	}
	return pages.sort((a, b) => a.data.order - b.data.order || a.data.label.localeCompare(b.data.label));
}

export async function pageByPath(path: string) {
	return (await allPages()).find((p) => pathOf(p) === path);
}
