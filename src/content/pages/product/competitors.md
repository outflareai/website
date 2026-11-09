---
title: "Competitor tracking and SEO competitor rank tracker · Outflare"
description: "Track competitors' search numbers weekly, see what they publish and change, find keyword and link gaps, and see who leads in search, AI answers and reviews."
h1: "Follow your competitors, and see who is winning."
label: Competitors
lede: "Outflare suggests the sites you compete with, follows their domain rating, traffic, keywords and links each week from your own Ahrefs or DataForSEO account, shows a feed of what they publish and change, and ranks you against them across search, AI answers, placements, social and reviews."
answer: "Outflare's Competitors page keeps one list of the sites you compete with, suggested daily from your own Ahrefs or DataForSEO connection, and follows each one's domain rating, organic traffic, ranking keywords and referring domains every week. It shows a feed of their new pages and title changes, the keywords and linking sites they have and you don't, and an Overview that scores and ranks you against them across search, AI answers, placements, social followers and reviews. Rank tracking for your own keywords lives on the Keywords page, with the competitors who outrank you."
points:
  - "Competitors suggested daily from shared keywords"
  - "Weekly domain rating, traffic, keywords and referring domains"
  - "Keyword gaps and link gaps against your own site"
  - "A score and rank across seven areas, with time to catch up"
docs:
  - label: Follow your competitors
    href: /docs/guides/competitors/
  - label: Keywords and rank tracking
    href: /docs/guides/keywords/
  - label: SEO connectors
    href: /docs/integrations/seo/
  - label: Presence
    href: /docs/guides/coverage/
faqs:
  - q: "How does Outflare find my competitors?"
    a: "Every day your own Ahrefs or DataForSEO connection is asked for the 10 domains sharing the most keywords with your site, and sites that rank beside you for at least two of your tracked keywords are suggested too, at no cost. You answer Yes or No, or add any domain by hand."
  - q: "What does Outflare track for each competitor?"
    a: "Each week, their domain rating, organic traffic, ranking keywords and referring domains from your SEO connection, and a light look at their robots.txt, sitemaps and home page by OutflareBot. Changes, such as new pages, a new title or a traffic move of a tenth or more, show in a Changes feed."
  - q: "Can I track competitors' Google rankings for my keywords?"
    a: "Yes. Rank tracking on the Keywords page checks Google's top 100 results for each keyword you track, weekly or daily, through your own DataForSEO or Geonode account, and keeps the top 10 results of every check so you can see who outranks you."
  - q: "Do I need an Ahrefs or DataForSEO account?"
    a: "For suggestions and search numbers, yes, on your own account and within a monthly budget you set. Without one you can still add competitors by hand, and OutflareBot's weekly look at their site still works."
  - q: "What does the Overview score mean?"
    a: "It compares each brand with the leader of every area it's measured in (search visits, top-3 keywords, linking sites, AI answers, placements, social followers and reviews), so a brand that leads everywhere scores 100. It also says where you lead or trail and, from the last 12 weeks' pace, when you'd pass the competitor just ahead."
related:
  - /product/seo/
  - /product/ai-visibility/
  - /product/analytics/
  - /product/reviews/
  - /compare/outflare-vs-semrush/
  - /best/rank-tracking-tools/
updated: 2026-11-09
order: 83
---

## How it works

1. **Add your site** under Site audits. It doesn't need to be proved for this.
2. **Connect Ahrefs or DataForSEO** on your own account. Outflare has no SEO data of its own and never lends its account.
3. **Answer the suggestions.** **Are these competitors?** lists the domains your connection suggests, with how many keywords you share. Select **Yes**, **No** or **Yes to all**, or type domains to add them.
4. **Read the feed and the Overview** each week, or press **Refresh all competitors** to read now.

The same list is used everywhere: [AI visibility](/product/ai-visibility/) counts competitors in AI answers, Presence scans where they appear, and agents read it.

## What Outflare follows

| Source | What it reads | Cost |
| --- | --- | --- |
| Your SEO connection, weekly | Domain rating, organic traffic, ranking keywords, referring domains | About what one of your own domains costs, within the connection's budget |
| OutflareBot, weekly | robots.txt, sitemaps and the home page only; it obeys robots.txt | Nothing |
| Your Geonode account, daily | Their followed social profiles and review pages: follower counts, ratings and review counts | Your Geonode usage |

Each competitor is read at most once a month by default, however the read is asked for, so even hundreds of competitors stay within budget.

## The Changes feed

| Event | When |
| --- | --- |
| New pages, Pages removed | Their sitemaps list new pages or drop some, with up to 10 URLs |
| New title, New description | Their home page's title or meta description changed |
| Domain rating | It moved by a point or more |
| Traffic, Keywords | Organic traffic or ranking keywords moved by a tenth or more |
| Referring domains | They moved by a twentieth or more |

Ask an agent "what did our competitors publish this month?" and it reads this feed.

## Keyword and link gaps

- **Keyword gaps** list keywords a competitor ranks in the top 20 for that you don't rank for (**Missing**), or rank 3 places or more below (**Behind**), with the most shared and most searched first.
- **Link gaps** list domains that link to your competitors but not to you. Click one to see the exact pages, anchor text and whether each link is nofollow.

Gaps are ideas for content and links. Outflare never contacts a site for you.

## Who is dominating

**Competitors → Overview** ranks your brand and every competitor across search visits, keywords in the top 3, linking sites, AI answers, placements, social followers and reviews. For each it shows **Share**, a 0–100 **Score**, **Rank** now and 28 days ago, **Where you stand** (lead, ahead, level, behind, far behind) and **Time to catch up** at the last 12 weeks' pace. It reads only what is stored, so opening it costs nothing.

Each competitor has its own page: its score next to yours, its top keywords with your position beside each, its pages that get the most search visits, the sites linking to it, and every placement Presence found it on.

## Competitor rank tracking

Search Console tells you your average position; [rank tracking](/docs/guides/keywords/) tells you where you rank today for the keywords you choose. Each check reads Google's top 100 results through your own DataForSEO or Geonode connection and keeps the top 10, so you see which competitors outrank you on every keyword and how that changes. See [SEO](/product/seo/) for the rest of the SEO module.

## For agents

The API and MCP server cover the list, the feed, gaps, the Overview and reading a competitor now (`list_seo_competitors`, `list_competitor_events`, `get_seo_competitor_gaps`, `get_competition`, `read_competitor_search` and more), with the `seo.read` and `seo.manage` scopes. Ask "which keywords are we missing?" or "who is winning in search this month?".

## What Outflare doesn't do

- It doesn't sell SEO data. Numbers come from your own Ahrefs or DataForSEO account, within the budget you set.
- It doesn't crawl competitors' sites deeply. OutflareBot reads only robots.txt, sitemaps and the home page.
- It doesn't estimate competitors' total visits or channels; their organic traffic estimate comes from your SEO connection. For market research, see [the best competitor analysis tools](/best/competitor-analysis-tools/) and [Outflare vs Similarweb](/compare/outflare-vs-similarweb/).
- It doesn't keep competitors' reviews, only their rating and count.
