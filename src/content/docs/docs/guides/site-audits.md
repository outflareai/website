---
title: Crawl and audit your sites
description: Add your websites, prove you own them, and let OutflareBot crawl them politely to find broken links, redirects, noindex pages and what robots.txt blocks.
sidebar:
  order: 13
---

<span class="pill shipped">Shipped</span> Sites, ownership checks, crawl settings, crawls, the audit, the fixes list with fix tickets, and the indexability report, in the app, through the API and for agents.

Outflare reads your own websites with its crawler, [OutflareBot](/bot/), and records every page it finds: its HTTP status, where redirects lead, which pages ask not to be indexed, and which pages your robots.txt keeps crawlers away from. It needs no connector or API key. SEO tools like [DataForSEO and Ahrefs](/docs/integrations/seo/) add what others see of your site, and are separate.

In the app, open **SEO** in the sidebar. **Site audits** lists your sites with their health and latest crawl, and opens each one's issues, ownership proof, crawl history and settings. **Fixes** is the fixes list below. **Keywords** shows what Google shows each page for and how it indexed them ([see what each page ranks for](/docs/guides/keywords/)). **Rankings & backlinks** is the [SEO tools](/docs/integrations/seo/) page, and **Backlinks** [tracks the links to your sites](/docs/guides/backlinks/).

## Add a site

Add the site's address, such as `https://www.example.com`. If one of your [brands](/docs/guides/brands/) lists that domain, the site joins that brand; otherwise you choose a brand or leave it shared.

## Prove you own it

Any site can be crawled lightly. Proving that you own a site lets you crawl it fully:

| | Not proved | Proved |
| --- | --- | --- |
| Pages per crawl | Up to 100 | Up to 10,000 |
| Pause between requests | At least 2 seconds | As little as 250 ms |
| robots.txt | Always obeyed | You may audit pages your own robots.txt hides |

Add any one of these, then ask Outflare to check (`POST .../verify`, or the `verify_seo_site` tool):

- **A DNS record:** a TXT record on your domain (without `www.`) with the value `outflare-site-verification=` followed by your site's token. The one-click button can [add it for you](/docs/guides/dns-records/).
- **A meta tag** in the `<head>` of the start page: `<meta name="outflare-site-verification" content="your token">`.
- **A file** at `/.well-known/outflare-site-verification.txt` holding the token.

Outflare checks a proved site again every 30 days. If the proof has gone, the site goes back to the lower limits.

## Crawl

Start a crawl, or set the site to crawl daily or weekly by itself. OutflareBot reads robots.txt and your sitemaps first, then follows links from the start page, one request at a time. It slows down when your server answers `429` or `503`, sends `Retry-After`, or answers slowly, and stops after ten errors in a row. [outflare.ai/bot](/bot/) says exactly how it behaves, for anyone who sees it in their logs.

Each page the crawl found is one of:

- **Fetched**, with its HTTP status. A 404 is a broken link, and a 3xx shows where it redirects.
- **Blocked**: robots.txt does not allow it.
- **Failed**: the server did not answer or answered with an error.
- **Skipped**: never reached, because the crawl hit its page limit or was stopped.

Each page also shows how it was found (from the start page, a link, a sitemap or a redirect), the page that led there, and whether it asks not to be indexed or followed.

For each HTML page, Outflare also keeps what an audit checks: the title, meta description, canonical, h1, language and hreflang, the structured data types, the word count, images without alt text, the viewport tag, the Open Graph title and image that link previews use, how many scripts, styles and images a secure page loads over plain http, and a fingerprint that matches pages with the same words. It never stores the page's text. It also keeps every link on the page, with its anchor text, so you can see a page's links out with the status each one returned (a 404 is a broken link) and the pages that link to it. A page in your sitemap that nothing links to is an orphan. A meta refresh counts as a redirect, and links marked `nofollow`, `ugc` or `sponsored` are not followed.

### Crawl settings

Every setting starts on a default that reads your site the way a search engine does, so most sites need none of them. Change them under the site's **Crawl settings** in the app, or with `PATCH .../seo-sites/{site}`. A crawl keeps the settings it started with.

| Setting | Default | What it does |
| --- | --- | --- |
| Pages per crawl (`max_pages`) | 100, or 10,000 once proved | How many pages one crawl reads. |
| How deep (`max_depth`) | No limit | How many clicks from the start page. |
| Find pages in sitemaps (`use_sitemaps`) | On | Read the sitemaps robots.txt lists, or `/sitemap.xml`. |
| Follow nofollow links (`follow_nofollow`) | Off | Follow links marked `rel="nofollow"` too. |
| Ignore URL parameters (`ignore_params`) | Off | Crawl `/shoes?color=red` as `/shoes`. |
| Only crawl / never crawl (`include_patterns`, `exclude_patterns`) | None | Patterns on a page's path, such as `^/blog/`. Leaving a page out wins over letting it in, and the start page is always crawled. |
| JavaScript (`render_js`) | Only pages that need it | Run pages' scripts through your own Geonode account: only for empty app shells, for every page, or never. See [below](#pages-your-firewall-blocks-and-pages-built-by-javascript). |
| Pause between pages (`crawl_delay_ms`) | 2 seconds, or 1 second once proved | The gap between requests. |
| Schedule (`schedule`, `schedule_hour`, `schedule_day`, `schedule_tz`) | By hand | Crawl every day or week, at an hour (and day) in your time zone. |

Each crawl says how many links its patterns and depth left out (`pages_excluded`) and how many pages it read with their scripts run (`pages_rendered`).

## The audit

When a crawl ends, Outflare checks every page against 61 rules and gives the crawl a **health score** from 0 to 100: the share of its pages with no error. Each issue says why it matters and how to fix it.

Issues are grouped by **URL template**, the path with the parts that change between sibling pages replaced by `*`, such as `/blog/*`. So 38 blog posts with no meta description show as one fix to one template, not 38 problems.

| Kind | What the rules find |
| --- | --- |
| Errors | Broken pages and server errors, links to broken pages, redirect loops and redirects that end on a broken page, a canonical that points to a broken page, a missing title |
| Warnings | Pages robots.txt hides from AI search, redirect chains, several canonicals or one that points to a noindex page, sitemaps that list noindex, blocked, redirecting, broken or non-canonical pages, invalid, broken or unconfirmed hreflang, content only JavaScript adds, duplicate or extra titles, missing meta descriptions, empty or missing h1s, thin and duplicate content, no viewport tag, orphan pages, pages not on HTTPS, insecure resources on secure pages, links to http pages |
| Notices | Links to redirects, temporary redirects, canonicals missing or pointing elsewhere, noindex and nofollow pages, nofollow on internal links, links without text, pages with no links out, too many links or only one link in, hreflang without the page itself, long, capitalised, underscored or parameter URLs, titles and descriptions too long or short, duplicate descriptions, extra h1s, no structured data, no Open Graph tags or share image, images without alt text, no language, deep, slow or large pages, no llms.txt |

Duplicates count only among pages meant to be indexed: a page marked `noindex`, or whose canonical points elsewhere, is a declared copy. [The engine docs](https://github.com/outflareai/outflare/blob/main/docs/crawler.md#the-audit) list every rule id.

## The fixes list

Each audit's issues go on the workspace's **fixes list**: one list of work for everyone in the workspace and their agents, so nothing is tracked in two places. A site audit adds one fix per rule and URL template, such as "pages in /blog/* have no meta description", with how many pages are left.

Other features add to the same list, such as [link opportunities](/docs/guides/backlinks/#link-opportunities-on-the-fixes-list) from your backlinks.

- Take a fix, mark it in progress, done or ignored (when the issue is intended), and leave a note.
- The next complete crawl checks a fix marked done. If the issue is gone, the crawl confirms it. If it is still there, or comes back later, the fix opens again.
- Fixes follow their site's brand, so a brand filter shows that brand's work.
- On the **Fixes** page, the list starts on what is still to do. Filter by status, severity or site, and open a fix to see why it matters, how to fix it and the pages it covers.

### Hand a fix to your coding agent

A fix can go straight to the coding agent that works on your site's code, such as Claude Code, Cursor or Codex, and come back checked:

1. Open the fix and choose **Copy prompt**. The prompt says what is wrong, why it matters, how to fix it and which pages it covers, and how to report back. Paste it into your agent in the site's repository.
2. When the change is live, choose **It's live, check it**. Outflare marks the fix done and crawls the site again.
3. If the issue is gone, the crawl confirms the fix. If it is still there, the fix opens again.

An agent can run the whole loop itself: `get_fix_prompt` to read the work, then `verify_fix` with a note such as the pull request link once the change is out. That needs a token with `seo.manage`. [Webhooks](/docs/api/webhooks/) tell your systems each step: `fix.found`, `fix.updated`, `fix.verify_requested`, `fix.confirmed` and `fix.reopened`.

### Fix tickets

The **Fixes** page groups the list into **tickets**: one per problem and site, such as "pages have no title", with every page behind it, however many URL templates they come from. Tickets are a view of the same fixes, so they always agree: a ticket is in progress while any of its fixes is, open while any is open, and done when all are.

Open a ticket to see its pages grouped by template, their clicks and impressions from Search Console over the last 28 days, the other tickets on the same site with their status, and the guidelines that apply.

**Let your AI model write it.** Choose **Write ticket**, and your workspace's own [AI model](/docs/agents/ai-models/) writes the ticket like a GitHub or Linear issue:

- a two-line summary for a person, and why it matters for search traffic, AI citations or visitors,
- the change, in enough detail for a coding agent,
- a "done when" checklist anyone can check,
- and what not to touch.

It writes from the issue, the pages, your brand and its website, the other tickets and how you reviewed them, and your guidelines. It also says whether the work is code, content or configuration. Without an AI connection the button says to connect one; Outflare never writes tickets with a key of its own.

**Review it.** You decide on every ticket:

- **Approve** it.
- **Ask for changes**: say what to change ("keep titles under 55 characters") and it is written again.
- **Reject** it, with a reason. Its fixes are ignored, so crawls stop raising them.

Choose to remember a reason, and it becomes a **guideline** for the site, the brand or the whole workspace. Every later ticket follows your guidelines, such as "titles end with | Northpeak" or "never change /legal/*", so recommendations get better the more you review. Manage them under **Guidelines** on the Fixes page.

**Hand it on.** **Copy as issue** gives the ticket as one Markdown issue, with the guidelines, every page and how to report back, ready for GitHub, Linear or your coding agent. When the change is out, **It's live, check it** crawls the site again to confirm it.

## Pages your firewall blocks, and pages built by JavaScript

Two kinds of page can't be read as served. A firewall or bot protection (Cloudflare, Akamai, DataDome and the like) can answer OutflareBot with a `403` or a challenge page instead of your page. And some sites send an almost empty page and build it in the browser with JavaScript (React, Vue, Angular and the like), so read as served it has no title, words or links.

For a site you have proved you own, a crawl can read both through **Geonode's Scraper API** with your own Geonode account: connect Geonode on the [Connectors](/docs/integrations/connectors/) page, and the next crawl uses it. Outflare never reads these pages with an account or key of its own.

- A blocked page is one that answered `403` or a challenge page. A rate limit (`429`) is waited out, not got around.
- A JavaScript page is one that looks like an empty app shell: under 150 words and a framework's mount point, such as `id="root"`. Geonode loads it in a browser and the audit checks what it built. Pages marked `noindex` are kept as served.
- Pages robots.txt disallows are never requested, through Geonode or otherwise.
- A page read this way shows `fetched_via: "geonode"`, and the crawl's `pages_fallback` counts them. Each costs Geonode tokens on your plan, and a page loaded in a browser costs more.

A crawl's `pages_firewalled` counts the blocked pages, and its `fallback_hint` says what would let the next crawl read them: `verify_site` (prove you own the site) or `connect_geonode`. Better still, let OutflareBot through your firewall: its user agent is on [outflare.ai/bot](/bot/).

## Indexability

The **Indexability** section of a site's audit shows which of its pages Google has indexed, and why some aren't. No single source has the whole picture:

- The crawl knows what your site asks for: each page's status, `noindex`, canonical and whether a sitemap lists it.
- Google Search Console's URL Inspection says what Google decided, but only for the pages it inspected, and it can be weeks old.
- Search Console's impressions prove a page is on Google.
- An [SEO tool](/docs/integrations/seo/) such as Ahrefs or DataForSEO sees pages ranking even where Search Console has nothing to say.

Outflare puts every page any of them knows in one list, and gives each a verdict from the strongest evidence:

| Verdict | Means |
| --- | --- |
| Indexed | Google showed it in results in the last 28 days, or URL Inspection says it's on Google. |
| Likely indexed | Your SEO tool sees it ranking, and Search Console says nothing against it. |
| Not indexed | URL Inspection says Google hasn't indexed it, and nothing shows it in results. |
| Unknown | No source has looked at it yet. |

When the sources disagree, results beat an old inspection. The report flags what needs doing, worst first, each with why it matters and how to fix it:

- **Errors:** pages that can be indexed but Google hasn't, and sitemap pages that redirect, are broken, are `noindex` or point their canonical elsewhere.
- **Warnings:** indexed pages that can no longer be indexed, pages where Google chose a different canonical, and pages Google knows that no link on the site reaches (orphans or old addresses, checked only after a complete crawl).
- **Notices:** sources that disagree, and indexable pages missing from the sitemap.

Click an issue to list its pages, and open a page to see what each source says about it. A snapshot is taken after every crawl and every Search Console sync, so the chart shows how indexing changes day by day over 90 days.

The report only reads what crawls and syncs already stored, so it costs nothing. It works from the sources you have: a crawl and the [Google Search Console connection](/docs/integrations/analytics/) for your own Google account; an SEO tool, on your own account, is optional. Until one is connected, the section says which to add.

## From the API or an agent

```sh
curl -X POST -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"url": "https://www.example.com", "schedule": "weekly"}' \
  https://app.outflare.ai/v1/workspaces/$WS/seo-sites
curl -X POST -H "Authorization: Bearer $TOKEN" https://app.outflare.ai/v1/workspaces/$WS/seo-sites/$SITE/verify
curl -X POST -H "Authorization: Bearer $TOKEN" https://app.outflare.ai/v1/workspaces/$WS/seo-sites/$SITE/crawls
curl -H "Authorization: Bearer $TOKEN" "https://app.outflare.ai/v1/workspaces/$WS/crawls/$CRAWL/pages?status=blocked"
curl -H "Authorization: Bearer $TOKEN" "https://app.outflare.ai/v1/workspaces/$WS/crawls/$CRAWL/pages?http_status=404"
curl -H "Authorization: Bearer $TOKEN" https://app.outflare.ai/v1/workspaces/$WS/crawls/$CRAWL/pages/$PAGE
curl -H "Authorization: Bearer $TOKEN" "https://app.outflare.ai/v1/workspaces/$WS/crawls/$CRAWL/issues?severity=error"
curl -H "Authorization: Bearer $TOKEN" "https://app.outflare.ai/v1/workspaces/$WS/crawls/$CRAWL/issues/link_broken?template=/blog/*"
curl -H "Authorization: Bearer $TOKEN" "https://app.outflare.ai/v1/workspaces/$WS/fixes?subject_id=$SITE&status=open"
curl -X PATCH -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"status": "in_progress", "assignee_id": "me"}' https://app.outflare.ai/v1/workspaces/$WS/fixes/$FIX
curl -H "Authorization: Bearer $TOKEN" https://app.outflare.ai/v1/workspaces/$WS/fixes/$FIX/prompt
curl -X POST -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"note": "Fixed the blog template"}' https://app.outflare.ai/v1/workspaces/$WS/fixes/$FIX/verify
curl -H "Authorization: Bearer $TOKEN" "https://app.outflare.ai/v1/workspaces/$WS/fix-tickets?subject_id=$SITE"
curl -X POST -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"feedback": "Keep titles under 55 characters"}' https://app.outflare.ai/v1/workspaces/$WS/fix-tickets/$TICKET/write
curl -X POST -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"decision": "reject", "note": "Legal pages are written by our lawyers", "guideline": "site"}' \
  https://app.outflare.ai/v1/workspaces/$WS/fix-tickets/$TICKET/review
curl -H "Authorization: Bearer $TOKEN" https://app.outflare.ai/v1/workspaces/$WS/seo-sites/$SITE/indexability
curl -H "Authorization: Bearer $TOKEN" "https://app.outflare.ai/v1/workspaces/$WS/seo-sites/$SITE/indexability/pages?issue=indexable_not_indexed"
```

Reading needs the `seo.read` scope; adding sites, changing their settings, checking ownership, crawling, and writing and reviewing tickets need `seo.manage`. Agents use the MCP tools `add_seo_site`, `update_seo_site`, `verify_seo_site`, `start_crawl`, `get_crawl`, `list_crawl_pages`, `get_crawl_page`, `list_crawl_issues`, `get_crawl_issue`, `list_fixes`, `update_fix`, `get_fix_prompt`, `verify_fix`, `list_fix_tickets`, `get_fix_ticket`, `get_fix_ticket_prompt`, `write_fix_ticket`, `review_fix_ticket`, `list_fix_guidelines`, `create_fix_guideline`, `delete_fix_guideline`, `get_site_indexability` and `list_indexability_pages` (see [MCP](/docs/agents/mcp/)).

On a self-hosted server, OutflareBot only visits public sites. Set `OUTFLARE_CRAWL_ALLOW_PRIVATE=true` to audit an intranet or a site in development.
