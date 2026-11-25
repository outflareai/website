// The product's modules, as the home page shows them. Outflare grows by
// adding modules: add one here (with its status) and the home page follows.

export type ModuleStatus = 'live' | 'building' | 'planned';

export interface Module {
	name: string;
	summary: string;
	status: ModuleStatus;
	// growth: find, win and keep customers. company: the rest of the business
	// (money, people, goals).
	area: 'growth' | 'company';
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
		area: 'growth',
		docs: '/docs/agents/missions/',
		icon: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><path d="M4 22v-7"/>',
	},
	{
		name: 'Website analytics',
		summary: 'Visitors, pages, sources, search queries and conversions from Google Analytics, Search Console, PostHog and 13 more, side by side.',
		status: 'live',
		area: 'growth',
		docs: '/docs/integrations/analytics/',
		icon: '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
	},
	{
		name: 'SEO',
		summary: 'Domain rating, backlinks, rankings, competitors and site audits from Ahrefs or DataForSEO, with weekly history and a budget you set.',
		status: 'live',
		area: 'growth',
		docs: '/docs/integrations/seo/',
		icon: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
	},
	{
		name: 'Inbox',
		summary: 'Every conversation in one place, sorted by what it means, with labels, assignment and replies from the same address and thread.',
		status: 'live',
		area: 'growth',
		docs: '/docs/guides/inbox/',
		icon: '<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
	},
	{
		name: 'Leads and lists',
		summary: 'Import leads or build lists from your own data providers, scored against your ideal customer, with suppression built in.',
		status: 'live',
		area: 'growth',
		docs: '/docs/guides/lead-lists/',
		icon: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
	},
	{
		name: 'Lead finder',
		summary: 'On Outflare Cloud: finds companies that fit your ideal customer, the people to contact there and their work email, then shows the replies and meetings that came of it.',
		status: 'live',
		area: 'growth',
		docs: '/docs/guides/lead-finder/',
		icon: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><circle cx="11" cy="9" r="2.5"/><path d="M7 15a4 4 0 0 1 8 0"/>',
	},
	{
		name: 'Email campaigns',
		summary: 'Sequences, sending domains and deliverability checks, with one policy check on every email and limits agents cannot get around.',
		status: 'live',
		area: 'growth',
		docs: '/docs/guides/sequences/',
		icon: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
	},
	{
		name: 'Outcomes and cost',
		summary: 'Meetings, deals and spend from your calendar and CRM, so you can see what each brand and sequence costs and returns.',
		status: 'live',
		area: 'growth',
		docs: '/docs/guides/outcomes/',
		icon: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
	},
	{
		name: 'Brands',
		summary: 'Market several businesses from one workspace, each with its own website, context for agents, mailboxes and analytics, without connecting tools twice.',
		status: 'live',
		area: 'growth',
		docs: '/docs/guides/brands/',
		icon: '<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>',
	},
	{
		name: 'Social',
		summary: 'Followers and post numbers for every brand on X and LinkedIn, and helpful Reddit replies you approve before they post.',
		status: 'live',
		area: 'growth',
		docs: '/docs/guides/social/',
		icon: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51 6.83 3.98"/><path d="m15.41 6.51-6.82 3.98"/>',
	},
	{
		name: 'Reviews',
		summary: 'Every review of your brands on Trustpilot, G2, Capterra and Google, a review score with its direction, and answers drafted for you to post.',
		status: 'live',
		area: 'growth',
		docs: '/docs/guides/reviews/',
		icon: '<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>',
	},
	{
		name: 'Paid media',
		summary: 'Spend, clicks and conversions from Google, Meta, LinkedIn, Microsoft, Reddit and X Ads next to the rest of your numbers.',
		status: 'live',
		area: 'growth',
		docs: '/docs/integrations/paid-media/',
		icon: '<path d="M3 11l18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
	},
	{
		name: 'Partnerships',
		summary: 'Every site and person a brand works with in one partner CRM: sponsorships, SEO links, integrations and affiliates, each with its own pipeline, from first contact to what it brought in.',
		status: 'live',
		area: 'growth',
		docs: '/docs/guides/partnerships/',
		icon: '<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/>',
	},
	{
		name: 'Lifecycle email',
		summary: 'Receipts, onboarding and product email from your own Amazon SES, Postmark or Resend account, with versioned templates.',
		status: 'live',
		area: 'growth',
		docs: '/docs/guides/lifecycle-email/',
		icon: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
	},
	{
		name: 'Email intelligence',
		summary: 'Classify every email that comes in, pull out what matters, and route it to the right person or tool.',
		status: 'building',
		area: 'growth',
		icon: '<path d="M12 3l1.9 5.8L20 10l-6.1 1.2L12 17l-1.9-5.8L4 10l6.1-1.2z"/>',
	},
	{
		name: 'Customer data',
		summary: 'One record per person and company, built from your website, product, CRM and campaigns, for every module and agent to use.',
		status: 'live',
		area: 'growth',
		docs: '/docs/guides/customer-records/',
		icon: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/>',
	},
	{
		name: 'Money',
		summary: 'The whole company\'s money in one place: revenue, ad spend, outreach, AI, partner payouts and staff pay across every brand, with profit and margin in your own currency.',
		status: 'live',
		area: 'company',
		icon: '<rect width="20" height="14" x="2" y="5" rx="2"/><path d="M2 10h20"/>',
	},
	{
		name: 'People',
		summary: 'Everyone who works at the company, with their department, team and manager, and the work accounts the company hands them.',
		status: 'live',
		area: 'company',
		docs: '/docs/guides/team/',
		icon: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/>',
	},
	{
		name: 'Goals',
		summary: 'Goals, projects and tasks for the whole company or one brand, so people and agents see what matters most and work toward it.',
		status: 'live',
		area: 'company',
		docs: '/docs/guides/goals/',
		icon: '<path d="M4 22V4"/><path d="M4 4h12l-2 4 2 4H4"/>',
	},
];
