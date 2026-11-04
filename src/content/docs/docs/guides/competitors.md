---
title: Follow your competitors
description: See who you compete with in search, follow their numbers each week from your own Ahrefs or DataForSEO account, and get a feed of what they publish and change.
sidebar:
  order: 15
---

<span class="pill shipped">Shipped</span> Suggested and tracked competitors, their weekly numbers and a feed of what changed, in the app, through the API and for agents.

Outflare keeps one list of the sites you compete with for each of your websites, and tells you what changes at them. The same list is used everywhere: [Presence](/docs/guides/coverage/) scans where they appear, [AI visibility](/docs/guides/ai-visibility/) counts them in AI answers, and agents read it. Every day Outflare suggests new ones; say yes or no. Track the ones that matter, and Outflare follows their numbers and what they publish.

In the app, open **SEO** in the sidebar, then **Competitors**.

## What you need

- **A site.** Competitors are kept for the sites under **Site audits**. Add yours there; it doesn't need to be proved for this.
- **Ahrefs or DataForSEO, on your own account,** for suggestions and numbers. Outflare has no SEO data of its own and never lends you its account. You can still add competitors by hand without one, and OutflareBot's look works without one too.

## Suggested, tracked and dismissed

- **Suggested.** Every day your connection is asked for the 10 domains sharing the most keywords with your site, and they show with how many keywords you share. That is one read a site a day on your own account, within its monthly budget. Sites that rank in the top results beside you for at least two of your [tracked keywords](/docs/guides/keywords/) in the last week are suggested too, at no cost. Your own site and subdomains, and platforms such as YouTube or Reddit, are never suggested. At the top of the page, **Are these competitors?** lists them: select **Yes** to track one, **No** to dismiss it, or **Yes to all**.
- **Tracked.** Select **Yes** on a suggestion, or type one or several domains, separated by commas, at the top of the page and select **Add**. There is no limit. A competitor with a website that you add to an AI visibility cohort is tracked here too.
- **Dismissed.** A dismissed suggestion stays away when the connection suggests it again. Removing a competitor instead deletes it with its history, and the connection may suggest it again.

When your workspace has a customer record with the competitor's domain, the competitor is linked to it.

**Name it** in a competitor's menu to give it a name and the other names it goes by, such as a short name AI answers use. Agents set them with `update_seo_competitor`.

## What Outflare follows

- **Their numbers, from your connection.** Each week the snapshot takes an overview of up to 10 tracked competitors a site: domain rating, organic traffic and keywords, and referring domains. Each costs about what one of your own domains costs, and counts against the connection's monthly budget.
- **A light look at their site, from OutflareBot.** Once a week [OutflareBot](/bot/) reads a tracked competitor's robots.txt, its sitemaps and its home page, and nothing else. It obeys robots.txt and never follows their links. When their robots.txt doesn't allow OutflareBot, the page says so and shows only your connection's numbers. The look costs nothing; **Look at the site now** in a competitor's menu runs one straight away.

## The Changes feed

Every change is kept as an event under **Changes**:

| Event | When |
| --- | --- |
| New pages, Pages removed | Their sitemaps list pages they didn't before, or stop listing some, with up to 10 of the URLs |
| New title, New description | Their home page's title or meta description changed |
| Domain rating | It moved by a point or more |
| Traffic, Keywords | Organic traffic or ranking keywords moved by a tenth or more |
| Referring domains | They moved by a twentieth or more |

The first look and the first snapshot are a baseline, so changes show from the next week on.

## Keyword and link gaps

The weekly snapshot also reads the keywords and linking domains of the first five tracked competitors a site, 50 of each by default. Two tabs compare them with your own:

- **Keyword gaps** lists keywords a competitor ranks in the top 20 for that you don't rank for (**Missing**), or rank 3 places or more below (**Behind**). The ones most competitors share and most people search come first.
- **Link gaps** lists domains that link to your competitors but not to you, the ones linking to most competitors and strongest first.

Gaps compare against what your own connection read for you, so a gap can be a keyword or link outside that read. Opening the tabs costs nothing. The weekly read counts against the connection's budget; set how many rows it reads with `gap_rows` on the connection's settings, or 0 to turn gaps off. Gaps are ideas for content and links: Outflare never contacts a site for you.

## API and agents

```sh
# Competitors of one site, tracked first: free, reads what is stored
curl -H "Authorization: Bearer $TOKEN" "$URL/v1/workspaces/$WS/seo-competitors?site_id=$SITE"

# Track one
curl -X POST -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"site_id": "'$SITE'", "host": "rival.example"}' "$URL/v1/workspaces/$WS/seo-competitors"

# What changed in the last 30 days
curl -H "Authorization: Bearer $TOKEN" "$URL/v1/workspaces/$WS/seo-competitors/events?days=30"

# Domains that link to competitors but not to you
curl -H "Authorization: Bearer $TOKEN" "$URL/v1/workspaces/$WS/seo-competitors/gaps?site_id=$SITE&kind=links"
```

Reading needs the `seo.read` scope and changing needs `seo.manage`; a brand's token sees only its brand's sites. Agents use the MCP tools `list_seo_competitors`, `add_seo_competitor`, `update_seo_competitor`, `remove_seo_competitor`, `check_seo_competitor`, `list_competitor_events` and `get_seo_competitor_gaps`, and can answer things like "what did our competitors publish this month?" or "which keywords are we missing?".
