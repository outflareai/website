// The product's modules, as the home page shows them. Outflare grows by
// adding modules: add one here (with its status) and the home page follows.

export type ModuleStatus = 'live' | 'building' | 'planned';

export interface Module {
	name: string;
	summary: string;
	status: ModuleStatus;
	docs?: string;
	// Inner SVG markup for a 24x24 stroke icon.
	icon: string;
}

export const moduleStatusLabel: Record<ModuleStatus, string> = {
	live: 'Live',
	building: 'Building',
	planned: 'Planned',
};

export const modules: Module[] = [
	{
		name: 'Agents and missions',
		summary: 'Give a goal in plain words. Your AI model drafts the plan, works within the limits you set and waits for approval where you choose.',
		status: 'live',
		docs: '/docs/agents/missions/',
		icon: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><path d="M4 22v-7"/>',
	},
	{
		name: 'Website analytics',
		summary: 'Visitors, pages, sources, search queries and conversions from Google Analytics, Search Console, PostHog and 13 more, side by side.',
		status: 'live',
		docs: '/docs/integrations/analytics/',
		icon: '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
	},
	{
		name: 'SEO',
		summary: 'Domain rating, backlinks, rankings, competitors and site audits from Ahrefs or DataForSEO, with weekly history and a budget you set.',
		status: 'live',
		docs: '/docs/integrations/seo/',
		icon: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
	},
	{
		name: 'Inbox',
		summary: 'Every conversation in one place, sorted by what it means, with labels, assignment and replies from the same address and thread.',
		status: 'live',
		docs: '/docs/guides/inbox/',
		icon: '<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
	},
	{
		name: 'Leads and lists',
		summary: 'Import leads or build lists from your own data providers, scored against your ideal customer, with suppression built in.',
		status: 'live',
		docs: '/docs/guides/lead-lists/',
		icon: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
	},
	{
		name: 'Email campaigns',
		summary: 'Sequences, sending domains and deliverability checks, with one policy check on every email and limits agents cannot get around.',
		status: 'live',
		docs: '/docs/guides/sequences/',
		icon: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
	},
	{
		name: 'Outcomes and cost',
		summary: 'Meetings, deals and spend from your calendar and CRM, so you can see what each project and campaign costs and returns.',
		status: 'live',
		docs: '/docs/guides/outcomes/',
		icon: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
	},
	{
		name: 'Brands',
		summary: 'Market several businesses from one workspace, each with its own website, context for agents, mailboxes and analytics, without connecting tools twice.',
		status: 'live',
		docs: '/docs/guides/brands/',
		icon: '<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>',
	},
	{
		name: 'Lifecycle email',
		summary: 'Receipts, onboarding and product email from your own Amazon SES, Postmark or Resend account, with versioned templates.',
		status: 'building',
		icon: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
	},
	{
		name: 'Email intelligence',
		summary: 'Classify every email that comes in, pull out what matters, and route it to the right person or tool.',
		status: 'building',
		icon: '<path d="M12 3l1.9 5.8L20 10l-6.1 1.2L12 17l-1.9-5.8L4 10l6.1-1.2z"/>',
	},
	{
		name: 'Customer data',
		summary: 'One first-party profile per customer, built from your website, product and CRM, for every module and agent to use.',
		status: 'planned',
		icon: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/>',
	},
];
