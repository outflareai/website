// The playbook library behind /playbooks/. playbooks.json is the engine's
// public list (GET /v1/playbooks), refreshed with `npm run sync-playbooks`;
// the playbooks themselves are files in the engine repository's playbooks/
// folder, and anyone can add one with a pull request.
import raw from './playbooks.json';
import { integrations } from './integrations';
import { repo } from './project';

export interface Playbook {
	id: string;
	version: number;
	title: string;
	summary: string;
	description?: string;
	tier: 'obvious' | 'clever' | 'edge';
	goals: string[];
	publisher: 'outflare' | 'community';
	author: { github: string; name?: string };
	needs: {
		data: { check: string; label: string }[];
		connections: { capability?: string; category?: string; label: string; optional?: boolean; recommended: string[]; recommended_names?: string[] }[];
	};
	inputs: { name: string; label: string; help?: string; example?: string; optional?: boolean }[];
	steps: { say: string; tools: string[] }[];
	guardrails: string[];
	measure: { metric: string; how: string }[];
	prompt: string;
	example?: string;
	source_url: string;
}

export const playbooks = raw as Playbook[];

export const tiers: { id: Playbook['tier']; label: string; blurb: string }[] = [
	{ id: 'obvious', label: 'Obvious', blurb: 'Wins almost every business should have running.' },
	{ id: 'clever', label: 'Clever', blurb: 'Use data you already collect in ways most teams miss.' },
	{ id: 'edge', label: 'Edge cases', blurb: 'Narrow, surprising and worth it when they fit.' },
];
export const tierLabel = (t: Playbook['tier']) => tiers.find((x) => x.id === t)?.label ?? t;

export const goalLabels: Record<string, string> = {
	customers: 'New customers',
	revenue: 'Revenue',
	activation: 'Activation',
	retention: 'Retention',
	partners: 'Partners',
	search: 'Search',
	ai_answers: 'AI answers',
	tracking: 'Tracking',
	replies: 'Replies',
};
export const goalLabel = (g: string) => goalLabels[g] ?? g.replace(/_/g, ' ');

const pages = new Set(integrations.map((i) => i.id));
export const hasIntegrationPage = (id: string) => pages.has(id);

export const contributeURL = `${repo.url}/tree/main/playbooks#readme`;
