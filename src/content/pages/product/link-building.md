---
title: SEO link management and backlink tracking · Outflare
description: Track backlinks from your own Ahrefs or DataForSEO account, see links gained and lost, find sites linking to competitors, and manage placements and publishers.
h1: Link management for SEO, from your own link data.
label: Link building
lede: "Outflare keeps one history of the links to your sites, merged from your own Ahrefs and DataForSEO accounts, and turns it into work worth doing: links to win back, broken pages to redirect, and sites that link to your competitors but not to you. Placements and the publishers behind them sit beside it."
answer: Outflare is a link management tool, not a link-building service. Each week it reads the backlinks to your sites through your own Ahrefs or DataForSEO account, merges both into one list, and records every link gained, lost and regained. It suggests links to win back, broken pages to redirect and domains that link to your competitors but not to you, and lets you track placements and publishers per brand. It never buys links or contacts a site on its own; outreach goes through your own sequences, which you approve.
points:
  - Backlinks from Ahrefs and DataForSEO merged into one list
  - Every link gained, lost and regained, kept after the tools forget it
  - Win-back, broken-page and competitor-gap suggestions on the fixes list
  - Spam scores and a disavow file you upload yourself
docs:
  - label: Track your backlinks
    href: /docs/guides/backlinks/
  - label: Manage your brand's presence
    href: /docs/guides/coverage/
  - label: Follow your competitors
    href: /docs/guides/competitors/
  - label: Watch the news and find journalists
    href: /docs/guides/news-watch/
  - label: SEO tools
    href: /docs/integrations/seo/
faqs:
  - q: Is Outflare a link building tool?
    a: It is a link management tool. It tracks your backlinks, finds the links worth going after and keeps your placements and publishers in one place. It doesn't sell links, keep a database of sites for sale, or send link requests on its own.
  - q: Where does the backlink data come from?
    a: From your own Ahrefs or DataForSEO account, or both. Outflare has no link data of its own and never lends you an account. Until you connect one, the Backlinks page says which to add and reads nothing.
  - q: How much does backlink tracking cost?
    a: Outflare is free. The weekly read costs about $0.03 a site on DataForSEO, or about 50 to 200 Ahrefs API units a site at the default 200 links, paid to the provider within a monthly budget you set.
  - q: Can I do link building outreach from Outflare?
    a: Yes, through the same email sequences you use for any outreach, from your own mailboxes, with the policy check on every email. Picking an opportunity contacts nobody; a person or an agent you allow writes and starts the outreach.
  - q: Does Outflare disavow links for me?
    a: No. It scores every link for spam, and once you mark links or domains to disavow it gives you the file for Google Search Console's disavow tool. You upload it yourself.
  - q: Can I find sites that link to my competitors but not to me?
    a: Yes. For the competitors you track, Outflare lists domains rated 30 or more that link to two or more of them but not to you, and the competitor gaps endpoint returns domains that link to them but not to you.
related:
  - /product/seo/
  - /product/competitors/
  - /product/pr/
  - /product/fixes/
  - /compare/outflare-vs-ahrefs/
  - /best/rank-tracking-tools/
updated: 2026-11-09
order: 100
---

## What Outflare does with links

| Job | What you get | Runs on |
| --- | --- | --- |
| Backlink tracking | One list of the links to every site you audit, with each tool's view beside it | Your Ahrefs or DataForSEO account |
| Gained, lost and regained | A feed of every change, with the reason when the tool knows it | Stored, free to read |
| Link opportunities | Links to win back, broken pages to redirect, domains that link to competitors | Your stored links and crawls |
| Spam review | A 0 to 100 spam score, toxic links to review, a disavow file | Your SEO tool's judgement plus Outflare's own checks |
| Placements and publishers | Articles, listings, reviews and paid placements per brand, with the company and people behind each | Your CRM records |

## One list of backlinks from both tools

Each week your [Ahrefs or DataForSEO connection](/docs/integrations/seo/) reads the links to every site under **Site audits**, and Outflare merges what both found. A link found by both is still one row. When a link appears, disappears or comes back, Outflare records it and keeps it, so you still know what you lost after the tools have forgotten it.

The links table follows the shape of Ahrefs' backlinks report and only reads what Outflare stored, so filtering costs nothing:

- **Rating** of the linking domain, 0 to 100 (Ahrefs DR when Ahrefs saw the link).
- **Followed, nofollow, sponsored and UGC**, from the link's `rel` attributes.
- **New and Lost** over any range, from the last 7 days to all time.
- **Filters** on link type, DR, domain traffic, page type, spam score, anchor text and URL.
- **One link per domain** by default, or every link.

## Link opportunities on the fixes list

Each weekly read puts what is worth doing about a site's links on the workspace's [fixes list](/product/fixes/), next to the site audit's fixes:

| Fix | When |
| --- | --- |
| Win back a lost link | A domain rated 30 or more stopped linking to you in the last 90 days |
| Redirect a broken page | Live links point to a page your latest crawl found broken |
| A domain that links to competitors | A domain rated 30 or more links to two or more of your tracked [competitors](/product/competitors/) but not to you |
| Review toxic links | Toxic links nobody has reviewed yet |

Each fix comes with a prompt listing the links behind it, for you or your own agent. A fix the next read no longer finds is done, and one that comes back opens again. These are suggestions only: Outflare never contacts a site or asks for a link on its own.

## Placements, publishers and partners

Links are only part of a brand's presence. **Presence** (under **Outreach**) keeps every place a brand appears: articles, comparisons, reviews, backlinks, YouTube videos, forum threads, directory and app store listings, and paid placements. Each placement sits on a publisher's company record in your [CRM](/product/customer-data/), with the people involved, its arrangement (paid, earned, organic, exchange, affiliate) and any agreement, deliverables and invoices.

- **Discovery** brings in new finds daily from your news searches, backlink sources, social watches, pages AI answers cite, and Google results for searches such as `"Northpeak" alternatives`.
- **Page checks** record whether each page still links to you and names you, and flag **Link removed** when two checks agree it is gone.
- **Opportunities** rank sites worth your effort by SEO strength, how often AI answers cite them and how many competitors appear there, with the next step: pitch to be included, ask for a link, or win the link back.

Web searches, competitor scans and page reads run on your own DataForSEO, Geonode or Ahrefs connection, within its budget. See [Manage your brand's presence](/docs/guides/coverage/).

## Outreach, on your terms

Outflare finds and ranks opportunities, but people decide who to contact. When you pitch a publisher, it goes through the same [sequences](/product/cold-email/) as any outreach, from your own mailboxes, with the suppression list and send limits enforced on every email. A publisher marked **Do not contact** gets no automatic introduction task. For press, the [news watch and stories](/product/pr/) find the journalists who cover your topics and keep every quote and number sourced.

## For AI agents

Agents read the same data over the [API and MCP](/product/mcp/): `list_backlinks`, `list_backlink_events`, `get_backlinks_summary` and `get_seo_competitor_gaps` read what is stored for free, and `list_coverage_opportunities` gives the next outreach, highest leverage first. Ask: "Which strong links did we lose this month, and who linked to our competitors but not to us?"

## What Outflare doesn't do

- It doesn't sell links, run a marketplace of sites, or have link data of its own.
- It doesn't send link requests, guest post pitches or disavow files on its own. A person approves outreach, and you upload a disavow file yourself.
- It doesn't write guest posts for you to place.
