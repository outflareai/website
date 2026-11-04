---
title: Paths
description: Where people go step by step: the pages they view and the things they do, from a start, on the way to an end, or from whatever they did first.
sidebar:
  order: 9.8
---

<span class="pill shipped">Shipped</span> In the web app, the REST API and the MCP server.

**Paths** show where people actually go. Start from a page or an event (everyone who landed on the pricing page), or work back from one (everyone who paid), and see the pages they viewed and the things they did at each step, how many took each route, and where they stopped. Funnels check the route you expect; paths show the routes people take.

In the app, open **Analytics** in the sidebar, then **Paths**. Paths run inside Outflare and call no third-party service. They work from the page views [website tracking](/docs/guides/website-tracking/) records and the events your workspace sends or syncs.

## Ask it

- **Where paths begin or end**: **from a page or event** (every path starts there), **towards a page or event** (every path ends there, and you see the steps before it), or **from each person's first page or event** in the dates.
- **Steps are** page views, events or both. Events show with a lightning mark.
- **Steps shown**: 2 to 6, the start or end included.
- **Per step, before "other"**: how many pages or events a step lists before the rest fold into one *Other* row (up to 20).
- **A whole path takes at most**: how long from its first step, a day unless you say otherwise. For one visit's path, pick an hour.
- **Leave out** pages or events that get in the way, such as a cookie banner's event or a redirect page, as if they never happened.

## Read it

- Each column is a step. Each row is a page or event, with how many people were there; the bar is its share, and the faded part of the bar is how many went nowhere within the time limit.
- Hover a row to see how many came from, and went to, each row beside it.
- Towards an end, the end is the last column and shorter paths start further right.
- Each person counts once per step.

Save a question for everyone in the brand with a name; it keeps only the question, so every view counts again. Saved paths can go on a [dashboard](/docs/guides/dashboards/).

## Who can do what

Everyone in the workspace can run paths (`analytics.read`). Owners, admins and operators can save, change and delete questions (`analytics.manage`).

## For agents and scripts

The REST API is `POST /v1/brands/{brand}/insights/paths`, and `/v1/brands/{brand}/insights` keeps saved questions with funnels, trends and retention. See the [API reference](/docs/api/). The MCP tool is `run_paths`, with `save_insight` and the other saved-insight tools. Ask your agent something like *"Where do people go after landing on the pricing page, and where do most of them leave?"*
