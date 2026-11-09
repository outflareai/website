// Structured data (schema.org JSON-LD) the pages share, so search engines and
// AI assistants read the same facts the page shows. Only state what is true
// today: prices, features and ratings here must match the page.
import { site, repo, app } from '../data/project';
import { positioning } from '../data/positioning';

export type Crumb = { name: string; path: string };

export const organizationId = `${site.url}/#organization`;

export function breadcrumbs(crumbs: Crumb[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [{ name: 'Outflare', path: '/' }, ...crumbs].map((c, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: c.name,
			item: new URL(c.path, site.url).href,
		})),
	};
}

export function website() {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		'@id': `${site.url}/#website`,
		name: 'Outflare',
		url: `${site.url}/`,
		publisher: { '@id': organizationId },
	};
}

// The product itself. Free is true for both ways to run it: self-hosting, and
// Outflare Cloud during early access (src/pages/pricing.astro).
export function softwareApplication() {
	return {
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		'@id': `${site.url}/#software`,
		name: 'Outflare',
		description: positioning.summary,
		url: `${site.url}/`,
		applicationCategory: 'BusinessApplication',
		applicationSubCategory: 'Marketing automation',
		operatingSystem: 'Web, Linux (Docker)',
		license: 'https://www.gnu.org/licenses/agpl-3.0.html',
		isAccessibleForFree: true,
		installUrl: repo.url,
		downloadUrl: repo.url,
		softwareHelp: { '@type': 'CreativeWork', url: `${site.url}/docs/` },
		offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', url: app.signUp },
		publisher: { '@id': organizationId },
	};
}

export type Faq = { q: string; a: string };

export function faqPage(faqs: Faq[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
	};
}

// Escape "<" so a value can never close the script tag it sits in.
export const jsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c');
