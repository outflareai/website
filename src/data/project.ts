// Facts about the Outflare project that several pages show. Keep this file in
// step with the main repo's docs/roadmap.md: it is the one place the site
// says what has shipped and what is still coming.

// The live site and how to reach the team.
export const site = {
	url: 'https://outflare.ai',
	email: 'hello@outflare.ai',
};

// Outflare Cloud, the hosted app. Sign-up is open and free during early access.
export const app = {
	url: 'https://app.outflare.ai',
	signIn: 'https://app.outflare.ai/',
	signUp: 'https://app.outflare.ai/signup',
};

// The engine's public GitHub repository. Change it here and every page follows.
export const repo = {
	owner: 'outflareai',
	name: 'outflare',
	url: 'https://github.com/outflareai/outflare',
	roadmap: 'https://github.com/outflareai/outflare/blob/main/docs/roadmap.md',
	issues: 'https://github.com/outflareai/outflare/issues',
	website: 'https://github.com/outflareai/website',
};

export type Status = 'shipped' | 'building' | 'planned' | 'later';

export interface Milestone {
	step: number | null;
	title: string;
	status: Status;
	summary: string;
	docs?: string;
}

// The v1 milestones, one pull request each in the main repo.
export const milestones: Milestone[] = [
	{
		step: 1,
		title: 'Foundation',
		status: 'shipped',
		summary: 'Go engine, Postgres schema and job queue, API skeleton, OpenAPI contract, Docker Compose, CI.',
		docs: '/docs/concepts/architecture/',
	},
	{
		step: 2,
		title: 'Workspace and access',
		status: 'shipped',
		summary: 'Sign-in, workspaces, members and roles, invites, scoped API tokens, audit log.',
		docs: '/docs/guides/workspaces-and-access/',
	},
	{
		step: 3,
		title: 'Mailboxes',
		status: 'shipped',
		summary: 'Bulk CSV import, SMTP and IMAP sign-in checks, SPF/DKIM/DMARC health, pools, daily limits, encrypted credentials.',
		docs: '/docs/guides/import-mailboxes/',
	},
	{
		step: 4,
		title: 'Leads and suppression',
		status: 'shipped',
		summary: 'Fast lead CSV import with dedupe and custom fields, lists, a suppression list of emails and domains, and the recipient policy check.',
		docs: '/docs/guides/import-leads/',
	},
	{
		step: 5,
		title: 'Sequences and sending',
		status: 'shipped',
		summary: 'Sequence builder, scheduler, the policy check, SMTP sending, mailbox rotation, unsubscribe and bounce handling.',
		docs: '/docs/guides/sequences/',
	},
	{
		step: 6,
		title: 'Inbox',
		status: 'shipped',
		summary: 'IMAP sync, unified inbox, threads, replies, stop on reply, replies sorted by meaning, assign, snooze, done and labels.',
		docs: '/docs/guides/inbox/',
	},
	{
		step: 7,
		title: 'Cheap Inboxes, Google and Microsoft',
		status: 'shipped',
		summary: 'OAuth and admin-level authorisation for Google Workspace and Microsoft 365; Cheap Inboxes import and sync by API key, with Google app passwords paced for you.',
		docs: '/docs/integrations/cheap-inboxes/',
	},
	{
		step: 8,
		title: 'Web app polish and TypeScript SDK',
		status: 'building',
		summary: 'Workspace overview, URL routing and mobile layout; @outflare/sdk with ok() errors, installed from the repository.',
		docs: '/docs/sdk/typescript/',
	},
	{
		step: 9,
		title: 'MCP server for agents',
		status: 'shipped',
		summary: 'Claude, Cursor and other MCP clients run a workspace through 415 tools over the API, held to the token\'s scopes and the send policy.',
		docs: '/docs/agents/mcp/',
	},
	{
		step: 10,
		title: 'Sending domains',
		status: 'shipped',
		summary: 'Every sending domain with daily DNS and blocklist checks, issues with the exact fix, sending stats, and pause and daily caps enforced by the policy check.',
		docs: '/docs/guides/sending-domains/',
	},
	{
		step: 11,
		title: 'Warm-up',
		status: 'shipped',
		summary: 'Turn warm-up on in your connected EmailBison, Instantly or Smartlead account, and see each mailbox\'s warm-up score.',
		docs: '/docs/guides/warmup/',
	},
	{
		step: 12,
		title: 'Mailbox allocation',
		status: 'shipped',
		summary: 'Each active sequence gets enough ready mailboxes for its daily target, from its own team first, with follow-ups kept on their mailbox, teams and senders, suggestions or automatic changes, and sending limits for agent tokens.',
		docs: '/docs/guides/mailbox-allocation/',
	},
	{
		step: 13,
		title: 'Campaigns in other sequencers',
		status: 'shipped',
		summary: 'EmailBison, Instantly and Smartlead campaigns share the same mailbox allocation: Outflare reads each account every 5 minutes and adds or removes mailboxes there, after you review the first plan. Mailboxes also connected in Apollo are flagged.',
		docs: '/docs/guides/mailbox-allocation/#campaigns-in-other-sequencers',
	},
	{
		step: 14,
		title: 'Projects',
		status: 'shipped',
		summary: 'One go-to-market motion per project: a versioned brief people and agents work from, the domains, mailboxes, lead lists and sequences that run it, one pause switch, one daily limit, and API tokens that stay inside it.',
		docs: '/docs/guides/projects/',
	},
	{
		step: 15,
		title: 'Infrastructure plans',
		status: 'shipped',
		summary: 'Ask for domains and mailboxes by a date and get one plan: approve it once and Outflare buys or waits for you, checks DNS, connects and warms the mailboxes, and moves each one through warming, ready, resting and retired.',
		docs: '/docs/guides/infrastructure/',
	},
	{
		step: 16,
		title: 'Agent missions',
		status: 'shipped',
		summary: 'Type a goal and the AI model you pick (Claude, OpenAI, Gemini or Mistral) drafts the mission, then Outflare\'s own agent runs it with your key, or give the goal to your own agent: it reads the brief, rehearses in a dry run, sends its plan for approval, asks for the tools it needs, and works within send and spend limits, with every call logged and changes held for approval when you choose.',
		docs: '/docs/agents/missions/',
	},
	{
		step: 17,
		title: 'Sending servers',
		status: 'shipped',
		summary: 'Mailboxes from SMTP vendors or your own mail server, grouped by the IPs they share, with daily IP blocklist checks, automatic pause and a shared daily limit.',
		docs: '/docs/guides/sending-servers/',
	},
	{
		step: 18,
		title: 'Lead lists from data providers',
		status: 'shipped',
		summary: "Search the customer's own Apollo or People Data Labs account into a lead list, find emails through a waterfall of providers with a cache and credit caps, score fit against the project's ideal customer, leave out anyone suppressed or already contacted, and refresh on a schedule.",
		docs: '/docs/guides/lead-lists/',
	},
	{
		step: 19,
		title: 'Outcomes and cost',
		status: 'shipped',
		summary: 'Meetings from Google Calendar, Outlook, Calendly, Cal.com and HubSpot, deals from HubSpot, a spend ledger tagged by project and by who spent it, and cost per meeting by project and sequence, with warehouse export.',
		docs: '/docs/guides/outcomes/',
	},
	{
		step: 20,
		title: 'Connectors, verification, switching, health and reports',
		status: 'shipped',
		summary: 'One connectors framework (API key or OAuth, connect links so agents never see keys), eight verification services, Instantly and Smartlead importers, mailbox health from every signal, and reports by any dimension.',
		docs: '/docs/integrations/connectors/',
	},
	{
		step: 21,
		title: 'Agencies and tracking domains',
		status: 'shipped',
		summary: 'A workspace per client with an agency team, agency-wide agent tokens and white label; optional tracking domain, click tracking and unsubscribe header settings.',
		docs: '/docs/guides/agencies/',
	},
	{
		step: 22,
		title: 'Usage stats and update checks',
		status: 'shipped',
		summary: 'An anonymous daily report from self-hosted servers (off on the first-run form, in Settings or with OUTFLARE_TELEMETRY=off) that also brings update and security notices.',
		docs: '/docs/self-hosting/telemetry/',
	},
	{
		step: 23,
		title: 'Analytics connectors',
		status: 'shipped',
		summary: 'Read Google Analytics, Search Console, Bing Webmaster Tools, PostHog, Plausible, Fathom, Matomo, Umami, Mixpanel, Amplitude, Cloudflare, Simple Analytics, Clarity and Vercel through the same five reports, on an Analytics page, the API and MCP.',
		docs: '/docs/integrations/analytics/',
	},
	{
		step: 24,
		title: 'SEO connectors',
		status: 'shipped',
		summary: 'DataForSEO and Ahrefs for domain rating, backlinks, keyword rankings, competitors and site audit, with a monthly budget per connection, every call costed in Outcomes and weekly snapshots shown next to each website.',
		docs: '/docs/integrations/seo/',
	},
	{
		step: 25,
		title: 'Analytics for agents',
		status: 'shipped',
		summary: 'One call says what changed on each website: headlines with their tool and dates, period on period, top movers, unusual days, SEO moves and the connector that fills each gap; a catalog of what can be asked, MCP prompts and compact answers.',
		docs: '/docs/agents/analytics/',
	},
	{
		step: 26,
		title: 'Lifecycle email',
		status: 'shipped',
		summary: 'Receipts, password resets and onboarding email from your own Amazon SES, Postmark or Resend account: setup guides with a prompt your AI agent can follow, verified sending domains, versioned templates with live preview, delivery events and automatic suppression.',
		docs: '/docs/guides/lifecycle-email/',
	},
	{
		step: null,
		title: 'CLI, more CRMs, provider marketplace, Cloud',
		status: 'later',
		summary: 'A CLI for scripting, Salesforce, Pipedrive and Attio, and a marketplace for data, model and mailbox providers.',
	},
];

export const statusLabel: Record<Status, string> = {
	shipped: 'Shipped',
	building: 'Next up',
	planned: 'Planned for v1',
	later: 'After v1',
};
