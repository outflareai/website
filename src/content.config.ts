import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

// Marketing pages written as Markdown, one folder per section of the site:
// src/content/pages/<section>/<slug>.md is served at /<section>/<slug>/
// (src/pages/[section]/[slug].astro), and each section has a hub page.
// sections.ts lists the sections. Every page answers its question in the
// first lines (answer), so search snippets and AI answers can quote it.
const pages = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
	schema: z.object({
		// <title>; keep it under about 60 characters.
		title: z.string(),
		// Meta description: 120 to 160 characters.
		description: z.string(),
		h1: z.string(),
		// The page's name in breadcrumbs, hubs and related links.
		label: z.string(),
		lede: z.string(),
		// Two to four sentences that answer the page's question on their own.
		answer: z.string(),
		// Short facts under the answer.
		points: z.array(z.string()).default([]),
		// An Outflare Cloud feature (AGENTS.md, "Open core").
		cloud: z.boolean().default(false),
		// The docs that explain it.
		docs: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
		faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
		// Paths of related pages on this site, such as /compare/outflare-vs-instantly/.
		related: z.array(z.string()).default([]),
		// When facts about other companies were last checked on their own sites.
		checked: z.coerce.date().optional(),
		updated: z.coerce.date(),
		// Order on the hub page; lower first.
		order: z.number().default(100),
		// A glossary term's name, for DefinedTerm data.
		term: z.string().optional(),
	}),
});

export const collections = {
	docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
	pages,
};
