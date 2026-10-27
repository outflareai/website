// The changelog: one entry per day (UTC) for what reached Outflare Cloud that day.
// A day opens with its first deploy, gains lines with each later one, and turns final
// at the cutoff (midnight UTC); later deploys go into the next day.
// Entries are JSON files in ./changelog/, written by Cloud's deploy pipeline after
// each production deploy and checked by scripts/check-changelog.mjs before they merge.
// Self-hosted versions are the engine's SemVer tags (./releases.json); a day's
// version, like 2026.10.27, names the day and can't be installed.

import releaseList from './releases.json';

export type Kind = 'launch' | 'improvement' | 'fix' | 'security';
export type Edition = 'open-source' | 'cloud';

export interface Item {
	kind: Kind;
	// Which part of Outflare it changes, one of `areas` below.
	area: string;
	// open-source: in the engine, so it runs self-hosted and on Cloud. cloud: only on app.outflare.ai.
	edition: Edition;
	text: string;
	// Engine pull requests (public). Cloud pull requests are never listed.
	prs?: number[];
	// GitHub handles of outside contributors to thank.
	thanks?: string[];
	// When the deploy that shipped it finished (ISO 8601, UTC).
	at?: string;
}

export interface Day {
	version: string; // 2026.10.27
	date: string; // 2026-10-27
	// in-progress until the day's cutoff, then final and never changed again.
	status: 'in-progress' | 'final';
	// When the entry last changed (ISO 8601, UTC).
	updated: string;
	// The engine commit production ran at the end of the day.
	engine?: string;
	// Set only when known for certain, such as the first release.
	selfHosted?: string;
	items: Item[];
}

export interface Release {
	version: string; // v0.1.0
	date: string;
}

export const kinds: { id: Kind; label: string }[] = [
	{ id: 'launch', label: 'New' },
	{ id: 'improvement', label: 'Improved' },
	{ id: 'fix', label: 'Fixed' },
	{ id: 'security', label: 'Security' },
];

export const editions: Record<Edition, string> = { 'open-source': 'Open source', cloud: 'Cloud' };

export const areas: Record<string, string> = {
	agents: 'Agents and missions',
	crm: 'CRM',
	outreach: 'Outreach',
	deliverability: 'Deliverability',
	inbox: 'Inbox',
	lifecycle: 'Lifecycle email',
	seo: 'SEO',
	social: 'Social',
	'paid-ads': 'Paid ads',
	partners: 'Partners',
	analytics: 'Analytics',
	records: 'Customer records',
	connectors: 'Connectors',
	api: 'API, SDK, MCP and CLI',
	workspace: 'Workspace and settings',
	'self-hosting': 'Self-hosting',
};

const files = import.meta.glob<Day>('./changelog/*.json', { eager: true, import: 'default' });
export const days: Day[] = Object.values(files).sort((a, b) => b.date.localeCompare(a.date));

export const releases: Release[] = (releaseList as Release[]).slice().sort((a, b) => a.date.localeCompare(b.date));

// The self-hosted release that first carries a day's open-source changes: the first
// tag cut after that day. Engine changes reach main before production, so a tag on a
// later day contains them. A tag on the same day might not, so it doesn't count.
export function selfHostedFor(day: Day): string | undefined {
	return day.selfHosted ?? releases.find((r) => r.date > day.date)?.version;
}
