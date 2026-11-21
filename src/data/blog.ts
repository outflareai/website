// Blog posts, newest first. Each post is a page in src/pages/blog/<slug>.astro.
export type Post = { slug: string; title: string; description: string; published: string; updated: string; minutes: number };

export const posts: Post[] = [
	{
		slug: 'why-we-built-outflare',
		title: 'Why we built Outflare',
		description:
			'We ran growth on a dozen tools that each kept their own copy of the customer. Why we replaced them with one, how it fits together, and what it changes for sales, marketing, product and support.',
		published: '2026-11-20',
		updated: '2026-11-20',
		minutes: 12,
	},
];
