---
title: Follow your competitors
description: See who you compete with in search, follow their numbers each week from your own Ahrefs or DataForSEO account, and get a feed of what they publish and change.
sidebar:
  order: 15
---

<span class="pill shipped">Shipped</span> Suggested and tracked competitors, their weekly numbers and a feed of what changed, in the app, through the API and for agents.

Outflare keeps one list of the sites you compete with for each of your websites, and tells you what changes at them. The same list is used everywhere: [Presence](/docs/guides/coverage/) scans where they appear, [AI visibility](/docs/guides/ai-visibility/) counts them in AI answers, and agents read it. Every day Outflare suggests new ones; say yes or no. Track the ones that matter, and Outflare follows their numbers and what they publish.

In the app, open **Competitors** in the sidebar: **Overview** ranks you against them, and **Competitors** is the list.

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

## Who is dominating

**Competitors → Overview** ranks your brand and every competitor you track, and shows where you lead, where you trail and whether you're catching up. It reads only what Outflare already stores, so opening it costs nothing.

| Area | Where it comes from |
| --- | --- |
| Search visits | The monthly organic traffic estimate in your SEO connection's weekly overview |
| Keywords in the top 3 | The same overview |
| Linking sites | The same overview (referring domains) |
| AI answers | [AI visibility](/docs/guides/ai-visibility/): how many of your sampled answers in the last 28 days name each one |
| Placements | Presence: your live placements against the pages Presence still sees for each competitor |
| Social followers | Your own social accounts, and each competitor's followed profiles (below), read daily |
| Reviews | Review counts on your own review pages, and on each competitor's followed ones |

- **Share** is one brand's part of everyone's total in an area.
- **Score** (0 to 100) compares each brand with the leader of every area it's measured in, so a brand that leads everywhere scores 100. Each area counts once; **Weights** changes how much each one counts, and the page remembers your choice.
- **Rank** shows where each one stands now and 28 days ago.
- **Where you stand** says, for each area, whether you lead, are ahead, level, behind or far behind the typical competitor, and whether your share is gaining, steady or losing over 28 days.
- **Time to catch up** says when, at the last 12 weeks' pace, you pass the competitor just ahead, or the one just behind passes you. It needs six weeks of numbers.

Search numbers all come from one SEO connection so they share a scale, read on your own account. An area nobody has data in says what to connect.

Beside the scores, each row shows the site at a glance:

| Column | Where it comes from |
| --- | --- |
| DR | Domain Rating (0 to 100) from your SEO connection's latest read: Ahrefs' Domain Rating, or the other connection's authority score |
| Keywords | The keywords it ranks for, from the same read |
| Domain age | When its domain was first registered, from the public registration record (RDAP), which needs no account |
| Pages | How many pages a competitor's sitemaps list at OutflareBot's last look |

Under each name it says the day of its latest search numbers, or that it has none yet.

**Refresh all competitors** reads every competitor you track now instead of waiting for the weekly read: their search numbers on your own SEO connection (Ahrefs first, only the ones not read today, within its budget, so a second click the same day costs nothing), OutflareBot's look at their home page, and their followed social profiles and review pages. The numbers fill in within a few minutes, and the page updates itself. Without an SEO connection only their sites and profiles are read, and the page says to connect one.

Click a competitor for its own page: its score and rank next to yours, its Domain Rating, keywords, domain age and pages next to yours, every area head to head, and both shares over the year.

## Their social profiles and reviews

On a competitor's page, **Their social profiles and reviews** follows their social profiles (X, LinkedIn company pages, YouTube, Instagram, TikTok, Facebook, a subreddit, GitHub, Discord, Bluesky, Threads, Mastodon, DEV, Docker Hub) and their Trustpilot, G2, Capterra or Google review pages.

- **Suggested from their website.** OutflareBot's weekly look at their home page suggests the profiles it links to. Press **Follow**, or **Not theirs** to never see it again. You can also paste any profile or review page.
- **Read every day, on your own Geonode account.** Followed profiles are read with your own, for followers (or the channel's headline count, such as subscribers), and a review page's rating and review count. They need a page reader: [connect Geonode](/docs/integrations/seo/), and until you do, the page says so and nothing is read.
- **Kept apart from yours.** Their profiles never show in your Social or Reviews pages, your numbers, publishing, alerts or reply drafts. Only a review page's rating and count are kept, never their reviews.

Only tracked competitors are followed; dismiss or remove one and its reads stop.

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

# Who is dominating: scores, ranks, standings and time to catch up
curl -H "Authorization: Bearer $TOKEN" "$URL/v1/brands/$BRAND/competition"

# Read every tracked competitor now
curl -X POST -H "Authorization: Bearer $TOKEN" "$URL/v1/brands/$BRAND/competition/refresh"

# Follow a competitor's profile, or answer a suggestion
curl -X POST -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"url": "https://x.com/rivalhq"}' "$URL/v1/brands/$BRAND/competition/$COMPETITOR/profiles"
curl -X PATCH -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"url": "https://x.com/rivalhq", "state": "dismissed"}' "$URL/v1/brands/$BRAND/competition/$COMPETITOR/profiles"
```

Reading needs the `seo.read` scope and changing needs `seo.manage`; a brand's token sees only its brand's sites. Agents use the MCP tools `list_seo_competitors`, `add_seo_competitor`, `update_seo_competitor`, `remove_seo_competitor`, `check_seo_competitor`, `list_competitor_events`, `get_seo_competitor_gaps`, `get_competition`, `refresh_competition`, `list_competitor_profiles`, `follow_competitor_profile` and `answer_competitor_profile`, and can answer things like "what did our competitors publish this month?" "which keywords are we missing?" or "who is winning in search this month?".
