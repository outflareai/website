// The connector directory behind /integrations/. integrations.json is the
// engine's public catalog (GET /v1/connectors), refreshed with
// `npm run sync-integrations`; this file only adds the words the pages use.
import raw from './integrations.json';

export interface Integration {
	id: string;
	name: string;
	category: string;
	summary?: string;
	description?: string;
	website?: string;
	docs_url?: string;
	auth_methods?: string[];
	capabilities?: string[];
	status: 'available' | 'planned';
	pricing?: string;
	dark_logo?: boolean;
}

export const integrations = raw as Integration[];

// Categories in the order the directory lists them, with the docs page that
// explains what Outflare does with each.
export const categories: { id: string; label: string; blurb: string; docs: string }[] = [
	{ id: 'model', label: 'AI models', blurb: 'The model that plans and runs your missions.', docs: '/docs/agents/missions/' },
	{ id: 'email_verification', label: 'Email verification', blurb: 'Every address is checked before its first email.', docs: '/docs/integrations/email-verification/' },
	{ id: 'data', label: 'Lead data', blurb: 'Find people, reveal emails and enrich leads.', docs: '/docs/integrations/connectors/' },
	{ id: 'sequencer', label: 'Sequencers', blurb: 'Bring campaigns, leads and mailboxes over when you switch.', docs: '/docs/integrations/connectors/' },
	{ id: 'mailbox_provider', label: 'Mailbox suppliers', blurb: 'Buy and connect sending mailboxes.', docs: '/docs/integrations/cheap-inboxes/' },
	{ id: 'analytics', label: 'Website analytics', blurb: 'Traffic, pages, sources and search queries in one place.', docs: '/docs/integrations/analytics/' },
	{ id: 'seo', label: 'SEO', blurb: 'Domain rating, backlinks, rankings and site audits.', docs: '/docs/integrations/seo/' },
	{ id: 'payments', label: 'Payments', blurb: 'Who pays you, with their plan and revenue on each person.', docs: '/docs/guides/revenue-from-stripe/' },
	{ id: 'calendar', label: 'Calendars', blurb: 'Meetings booked, tied back to the reply that won them.', docs: '/docs/integrations/calendars-and-hubspot/' },
	{ id: 'crm', label: 'CRM', blurb: 'Replies, interested leads and meetings synced to your CRM.', docs: '/docs/integrations/calendars-and-hubspot/' },
	{ id: 'dns', label: 'DNS', blurb: 'SPF, DKIM, DMARC and tracking records set for you.', docs: '/docs/integrations/connectors/' },
	{ id: 'signals', label: 'Signals', blurb: 'Buying signals that tell you who to reach and when.', docs: '/docs/integrations/connectors/' },
];

export const categoryOf = (id: string) =>
	categories.find((c) => c.id === id) ?? { id, label: id.replace(/_/g, ' ').replace(/^./, (s) => s.toUpperCase()), blurb: '', docs: '/docs/integrations/connectors/' };

// What each capability means to a person, not an engineer.
const capabilityWords: Record<string, string> = {
	verify: 'Checks each address before it is emailed',
	'data.search_people': 'Searches for people that match your ideal customer',
	'data.find_email': 'Finds work email addresses',
	'data.enrich_person': 'Enriches leads with job, company and contact details',
	'import.campaigns': 'Imports your campaigns and their steps',
	'import.leads': 'Imports your leads',
	'import.mailboxes': 'Imports your sending mailboxes',
	'vendor.mailboxes': 'Orders new mailboxes and domains',
	'control.mailboxes': 'Pauses and resumes mailboxes it hosts',
	'observe.mailboxes': 'Reads mailbox health and warm-up status',
	'analytics.read': 'Reads traffic, pages, sources and events',
	'seo.read': 'Reads domain rating, backlinks, keywords and audits',
	'meetings.sync': 'Records the meetings people book',
	'deals.sync': 'Records deals and their stages',
	'crm.push': 'Pushes replies and interested leads to your CRM',
	plan: 'Plans and runs missions from a goal you type',
};
export const capabilityText = (cap: string) => capabilityWords[cap];

export const signIn = (i: Integration) => {
	const m = i.auth_methods ?? [];
	if (m.includes('oauth2') && m.includes('api_key')) return 'Sign in or API key';
	if (m.includes('oauth2')) return 'Sign in';
	if (m.includes('api_key')) return 'API key';
	return 'Nothing to connect';
};

export const logo = (i: Integration) => `/integrations/logos/${i.id}.svg`;
export const darkLogo = (i: Integration) => (i.dark_logo ? `/integrations/logos/${i.id}.dark.svg` : logo(i));
