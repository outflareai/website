// The sections of the marketing site that are written as Markdown in
// src/content/pages/<id>/. Each has a hub at /<id>/ listing its pages.
export interface Section {
	id: string;
	// Breadcrumb and hub name.
	label: string;
	title: string;
	description: string;
	h1: string;
	lede: string;
}

export const sections: Section[] = [
	{
		id: 'product',
		label: 'Product',
		title: 'Product: every module · Outflare',
		description: 'Every Outflare module: AI agents and missions, MCP, website analytics, SEO, AI visibility, cold email, deliverability, leads, inbox and more, in one open-source workspace.',
		h1: 'One workspace, every part of your marketing.',
		lede: 'Each module shares the same connectors, brand context, customer records and API, so your agents can work across all of them. Use one, or all of them.',
	},
	{
		id: 'solutions',
		label: 'Solutions',
		title: 'Solutions · Outflare',
		description: 'How founders and marketing teams use Outflare, and how to run your marketing from Claude, ChatGPT or Cursor through its MCP server.',
		h1: 'Outflare for how you work.',
		lede: 'The same open-source workspace, set up for a founder doing marketing alone, a marketing team with several brands, or the AI app you already use.',
	},
	{
		id: 'compare',
		label: 'Compare',
		title: 'Compare Outflare with other tools · Outflare',
		description: 'Honest side-by-side comparisons of Outflare with cold email, CRM, sales data and SEO tools: what each does best, what it costs and when to pick which.',
		h1: 'Outflare compared.',
		lede: 'Side by side with the tools people weigh it against. Where another tool is the better fit, we say so.',
	},
	{
		id: 'alternatives',
		label: 'Alternatives',
		title: 'Alternatives to popular marketing tools · Outflare',
		description: 'The best alternatives to popular cold email, CRM and SEO tools, including open-source and self-hosted options, with what each is good at.',
		h1: 'Alternatives worth a look.',
		lede: 'Shortlists for people moving off a tool, with open-source and self-hosted options and what each one is best at.',
	},
	{
		id: 'best',
		label: 'Best tools',
		title: 'The best marketing tools, compared · Outflare',
		description: 'Shortlists of the best AI marketing agents, cold email software, MCP servers for marketing, open-source CRMs and more, with how we chose them.',
		h1: 'The best tools, by job.',
		lede: 'Shortlists for one job each, with how we chose and who each tool suits. Outflare is on some of them; we say where it is not the right pick.',
	},
	{
		id: 'glossary',
		label: 'Glossary',
		title: 'AI marketing and GTM glossary · Outflare',
		description: 'Plain-English definitions of AI search, SEO, email deliverability and AI agent terms: GEO, AEO, LLM visibility, AI Mode, MCP, DMARC, warm-up and more.',
		h1: 'The AI marketing glossary.',
		lede: 'Short, plain definitions of the terms that come up when you market with AI and to AI: what each means, why it matters and what to do about it.',
	},
];

export const sectionById = (id: string) => sections.find((s) => s.id === id);
