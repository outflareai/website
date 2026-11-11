---
title: Find and fix technical SEO issues · Outflare
description: One fixes list for technical SEO issues from site audits, keywords and backlinks, handed to your coding agent as a prompt and confirmed by the next crawl.
h1: Technical SEO issues, found, handed off and checked.
label: Fixes
lede: Outflare crawls your sites, checks every page against 61 rules, and puts what is wrong on one fixes list with page optimisation work from your keywords and links. You or your coding agent make the change; Outflare re-crawls and confirms it.
answer: Outflare finds technical SEO issues by crawling your sites with OutflareBot and checking every page against 61 audit rules, then adds keyword, ranking-drop and link work to the same fixes list. It doesn't edit your website or code. Each fix becomes a prompt or an issue for your coding agent, such as Claude Code, Cursor or Codex, or for a person, and when the change is live Outflare crawls again to confirm it is fixed or reopen it.
points:
  - 61 audit rules, grouped by URL template, with a 0 to 100 health score
  - One fixes list for site audits, keywords, drops and links
  - Copy a prompt for your coding agent; Outflare never edits your code
  - Re-checked by a crawl, automatically after a GitHub or Vercel deploy
docs:
  - label: Crawl and audit your sites
    href: /docs/guides/site-audits/
  - label: Fix autonomy
    href: /docs/guides/fix-autonomy/
  - label: See what each page ranks for
    href: /docs/guides/keywords/
  - label: GitHub and Vercel deploys
    href: /docs/integrations/deploys/
  - label: Track your backlinks
    href: /docs/guides/backlinks/
faqs:
  - q: Does Outflare fix my website automatically?
    a: No. Outflare never edits your site, pushes code or opens pull requests. It writes each fix up as a prompt or an issue for your coding agent or developer, and once the change is live it crawls the site again to confirm the fix or reopen it.
  - q: What technical SEO issues does the site audit find?
    a: Broken pages and links, redirect loops and chains, canonical and hreflang problems, missing or duplicate titles and descriptions, thin and duplicate content, orphan pages, noindex pages in sitemaps, insecure resources, pages robots.txt hides from AI search, missing alt text and more, 61 rules in all.
  - q: Can an AI agent work through the fixes list?
    a: Yes. An agent takes a fix with start_fix, reads its prompt, makes the change in your repository with its own tools, then calls verify_fix. Fix autonomy decides which fixes an agent in a mission may take without a person; redirects, canonicals, indexing, robots.txt and URL changes always wait for a person.
  - q: How does Outflare know a fix went live?
    a: Choose "It's live, check it", or call verify_fix, and Outflare crawls the site again. If you connect the site's GitHub repository or Vercel project, each production deploy starts a re-check two minutes later on its own.
  - q: Do I need an API key for site audits?
    a: No. OutflareBot needs no connector. Keyword fixes and ranking drops use your own Google Search Console, tracked rankings use your DataForSEO or Geonode account, and AI-written tickets use your own AI model.
related:
  - /product/seo/
  - /product/experiments/
  - /product/link-building/
  - /glossary/web-crawler/
  - /solutions/cursor/
  - /best/seo-reporting-tools/
updated: 2026-11-09
order: 102
---

## How it works

1. **Crawl.** Add your site under **Site audits** and crawl it now, daily or weekly. OutflareBot reads robots.txt and your sitemaps, follows links, and slows down when your server asks it to. Prove you own the site to crawl up to 10,000 pages.
2. **Audit.** Every page is checked against 61 rules, and the crawl gets a health score from 0 to 100. Issues are grouped by URL template, so 38 blog posts with no meta description are one fix to `/blog/*`, not 38 problems.
3. **Hand it off.** Copy the fix's prompt into your coding agent in the site's repository, or let your AI model write it up as a ticket.
4. **Confirm.** When the change is live, Outflare crawls again. A fix that is gone is confirmed; one that is still there, or comes back later, opens again.

## What goes on the fixes list

The fixes list is one list of work for everyone in the workspace and their agents. Several parts of Outflare add to it:

| Source | Examples |
| --- | --- |
| [Site audits](/docs/guides/site-audits/) | Broken pages, redirect chains, missing titles, duplicate content, orphan pages, hreflang errors |
| [Keyword targets](/docs/guides/keywords/) | A page's target keyword is missing from its title, H1 or meta description |
| Drops | Search clicks down 40% on a page, a tracked keyword fell five places, a page left Google's index, conversions halved |
| Internal links and cannibalisation | Pages that should link to a target page; searches where your pages split the clicks |
| [Backlinks](/product/link-building/) | Lost links to win back, broken pages with live links, toxic links to review |

Each fix follows its site's [brand](/product/brands/), says why it matters and how to fix it, and lists the pages it covers.

## How fixes get applied

Outflare does not change your website. It reads your site, your Search Console and your SEO data, and it [watches deploys](/docs/integrations/deploys/) read-only. It never pushes code, opens pull requests or deploys. The change is made by whoever works on your site's code:

- **Your coding agent.** Choose **Copy prompt** and paste it into Claude Code, Cursor, Codex or another agent in the site's repository. The prompt says what is wrong, why, how to fix it, which pages it covers and how to report back. An agent connected over [MCP](/product/mcp/) can run the whole loop itself: `start_fix`, `get_fix_prompt`, make the change, then `verify_fix` with the pull request link.
- **A developer.** **Copy as issue** gives a fix ticket as one Markdown issue, ready for GitHub or Linear.
- **You.** Many fixes, such as a missing meta description in a CMS, are a few minutes' work by hand.

## Fix tickets your AI model writes

The **Fixes** page groups fixes into tickets, one per problem and site. **Write ticket** asks your workspace's own [AI model](/docs/agents/ai-models/) to write it like a GitHub issue: a short summary, why it matters, the change in enough detail for a coding agent, a "done when" checklist, and what not to touch. It says whether the work is code, content or configuration.

You review every ticket: approve it, ask for changes ("keep titles under 55 characters"), or reject it with a reason. A reason you keep becomes a **guideline** for the site, brand or workspace, such as "titles end with | Northpeak" or "never change /legal/*", and every later ticket follows it. Without an AI connection, the button says to connect one; Outflare never writes tickets with a key of its own.

## Fix autonomy for agents

Fix autonomy sets how far agents in a [mission](/product/agents/) may go with the fixes list on their own:

| Mode | When an agent takes a fix |
| --- | --- |
| Copilot (default) | Every fix waits for a person |
| Rules | Fixes in the rules or categories you allow, such as `metadata`, run; the rest wait |
| Autonomous | Every fix runs, except the ones that always wait |

Fixes that change redirects, canonicals, indexing, robots.txt or URLs can move or hide a whole site in search, so they always wait for a person, in every mode. Changing the setting from inside a mission also waits for a person, so an agent can't give itself more room. Set it for the workspace or per site.

## Re-checked on every deploy

Connect the site's GitHub repository or Vercel project on your own account, and Outflare records each production deploy. Two minutes after one, it crawls the site again if it has open or unconfirmed fixes, so a fix is confirmed or reopened without anyone asking. The same deploys start [SEO experiments](/product/experiments/) on the real release date.

## Webhooks and the API

Every step is an event: `fix.found`, `fix.started`, `fix.updated`, `fix.verify_requested`, `fix.confirmed` and `fix.reopened`, so your own systems, Slack or a ticket tracker can follow along. The list is `GET /v1/brands/{brand}/fixes`, and a fix's prompt is `GET .../fixes/{fix}/prompt`. See the [API](/developers/api/).

## What Outflare doesn't do

- It doesn't edit your website, CMS or code, open pull requests or deploy.
- It doesn't let an agent change redirects, canonicals, indexing, robots.txt or URLs without a person's approval.
- It doesn't pay for anything on your behalf: AI tickets, rank checks and Search Console use your own accounts.
