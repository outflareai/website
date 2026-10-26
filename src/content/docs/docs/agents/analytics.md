---
title: Analytics for agents
description: How an agent asks Outflare how a website is doing, what changed and why, in one call, with the tool and dates for every number and the fix for anything missing.
sidebar:
  order: 5
---

<span class="pill shipped">Shipped</span> In the REST API and the MCP server.

Outflare stores what every [analytics tool](/docs/integrations/analytics/) and [SEO tool](/docs/integrations/seo/) reports, lined up by website. Two answers are shaped for an agent that needs an answer rather than raw numbers. Both read stored data, so they are free and fast, and they never call a provider.

## Start with "what changed?"

`get_analytics_changes` (`GET /v1/workspaces/$WS/analytics/changes`) answers for each website, in one call:

- **Headline sentences** the agent can repeat as they are, each naming its tool and dates: *"Visitors 1,180, up 68.6% on the 7 days before (700) (Plausible, 2026-10-17 to 2026-10-23)."*
- **Each tool, this period against the one before.** Each tool is compared over its own latest stored days, so Search Console running two or three days behind is not read as a drop. `days` sets the period: 7 by default, 28 for month on month.
- **Search clicks and impressions** added up across Google and Bing.
- **Movers**: the pages, sources and search queries that rose or fell most. Pages and sources come from one tool, because adding two tools' counts of the same visits would double them.
- **Unusual days**: a spike or a drop well outside the 28 days before, including days where nothing was recorded (usually a tracking problem).
- **SEO moves** since the previous weekly snapshot: domain rating, referring domains, ranking keywords, and the keywords that moved up or down.
- **Gaps**: what is missing for a full picture, and the fix. For example, no search console, no conversions, a sync that is failing or late, or no SEO tool. Each gap lists the connector ids for `request_connection` or the action to take.

```sh
curl -H "Authorization: Bearer $TOKEN" "$URL/v1/workspaces/$WS/analytics/changes?host=example.com&days=28"
```

## Then "what can I ask?"

`get_analytics_catalog` (`GET /analytics/catalog`, and the MCP resource `outflare://analytics/catalog`) lists, for each website:

- the tools, and the metrics each has stored per report
- the days stored and the last sync
- the SEO tools, with their snapshots and the budget left
- the same gaps

Its `ask` field maps common questions to the tool that answers them:

| Question | Tool | Cost |
| --- | --- | --- |
| What changed? | `get_analytics_changes` | Free |
| Totals for each website | `get_analytics_overview` | Free |
| A trend, or the top pages or queries over months | `query_analytics_history` | Free |
| Do the tools agree? | `compare_analytics_tools` | Free |
| Today, or a report that isn't stored | `get_analytics_report` | Live: spends the provider's rate limit |
| SEO over time | `get_seo_history` | Free |
| Backlinks or competitors for any domain | `get_seo_report` | Live: costs money, within the monthly budget |

## Prompts

For clients that show MCP prompts (Claude Desktop lists them under the + menu), three prompts run a whole review:

- **`weekly_website_review`**: this week against last week, covering traffic, search, movers, unusual days, SEO, and what to connect or fix. It ends in under 250 words.
- **`explain_traffic_change`**: why traffic rose or fell. It finds which pages, sources and queries moved, and checks whether every tool sees the same change. A drop in only one tool is usually tracking, not traffic.
- **`seo_check`**: rankings, links and keyword moves from the weekly snapshots, tied to real search clicks. It only makes paid SEO calls with your OK.

## How agents are told to behave

The MCP server's instructions tell an agent to:

- start with `get_analytics_changes`
- use the stored-data tools before the live ones
- give the tool and dates for every number
- never add two tools' visitors together
- offer the fix each gap names, with `request_connection` rather than asking for keys in chat

Analytics and SEO answers come back as compact JSON, with no indentation and no empty values, and decimals cut to two places (four below 1), so they use less of the agent's context.
