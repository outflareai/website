---
title: Dashboards
description: Put your saved funnels and trends on one page, all over the same dates, with notes between them.
sidebar:
  order: 9.8
---

<span class="pill shipped">Shipped</span> In the web app, the REST API and the MCP server.

A **dashboard** is one page of your saved [funnels](/docs/guides/funnels/), [trends](/docs/guides/trends/), [retention](/docs/guides/retention/) and [paths](/docs/guides/paths/) questions, all run over the same dates. Build one per question: the weekly numbers, a launch, a channel.

In the app, open **Analytics** in the sidebar, then **Dashboards**. Type a name and press **Create** to start one.

## Ask a question

At the top of Dashboards is a box: type what you want to know ("How many people opened the app each week, by plan?") and press **Ask**. You get a chart with a sentence on how it was built. **Open in the builder** to change it, or **Save this chart** to keep it and put it on a dashboard.

- **It runs on your own AI model.** The workspace connects its own key under **Connectors** and picks the model for "Analytics questions" in the AI settings. Until it does, the box stays off and links to Connectors. Outflare never supplies a model.
- **The model never sees your data.** It gets the question and the names of your events, their descriptions and property names from the [event dictionary](/docs/guides/customer-records/), your conversions and the fields a chart can break down by. Outflare runs the chart itself, so no people, values or numbers leave it. The better your dictionary describes your events, the better the answers.
- **When it can't answer**, it says why instead of drawing a chart.

Through the API, `POST /v1/brands/{brand}/insights/ask` with `{"question": "…"}` starts a question and `GET /v1/brands/{brand}/insights/ask/{id}` returns it: once `status` is `ready` it carries the chart's `kind` and `spec`, which you can run or save like any other.

## Tiles

**Add tile** opens a page inside the dashboard: build a new trend, funnel, retention, paths or lifecycle chart right there (it is saved and added in one step), pick one you saved before, or write a note (a few lines of text, for what the page is for or what to look at first). A funnel tile takes the full width; the others half of it. A trend saved as a number shows its totals, with the change on the period before. A trend tile carries the brand's [notes on these dates](/docs/guides/trends/) as markers, so a jump or a dip on the dashboard has its reason beside it; a dashboard shared by link shows the numbers without the notes.

Every tile runs its insight again when you open the page, with the dashboard's dates in place of its own, so nothing on a dashboard is ever out of date. Choose the dates at the top: a moving range such as the last 30 days, fixed dates, or **each tile's own dates** to let every insight keep what it was saved with. Tick **Compare with the period before** to show every trend against the same length of time before it.

## Filter the whole dashboard

Press **+ Filter** next to the dates to show every tile for just some events: a field such as `plan` or `utm_source`, a comparison and a value (`plan` is `pro`). Up to five filters show as chips at the top; the × takes one off. They apply to every event and page view in the dashboard's trends, funnels, retention and lifecycle tiles, and on its share link and in the digest too. Visits, payments, conversions, ad numbers and paths keep only their own filters.

## Edit a tile

Press **Edit** on a tile to change it without leaving the dashboard: the event or other thing it counts, filters, what it measures, the breakdown, the interval, how it shows (lines, areas, bars, a ring of shares, a map, one number or a table) and its name. It is the same builder as the [Trends](/docs/guides/trends/) and Funnels pages, with the chart updating as you change it. **Save** takes you back to the dashboard. A tile is a saved insight, so saving changes it on every dashboard that shows it. Press **Edit** on a note to change its text.

## Edit the dashboard

Press **Edit dashboard** to change the dashboard itself. Its name, description, whether its trends go in the digest, its share link and **Delete dashboard** show above the tiles, and you can drag a tile by the bar on top to move it, or by its bottom-right corner to resize it. Tiles in the way move down and gaps close up. Each tile also keeps arrows to move it left, right, up and down and to make it wider, narrower, taller or shorter on a twelve-column grid, and a cross to take it off the dashboard. Taking a tile off never deletes the saved funnel or trend. Press **Done** when it looks right; everyone in the brand sees the same layout.

Deleting a saved insight leaves its tile in place, saying so, until someone takes it off.

## Share by link

Under **Edit dashboard**, **Share by link** makes a link to the dashboard for people outside the workspace: a client, an investor, the wider team. Anyone with it sees the dashboard read-only at `app.outflare.ai/share/…`, every tile run live over the dashboard's dates (or dates they pick), and nothing else of the brand. Add a **password** so the link alone isn't enough, and an expiry (7 days to a year). A dashboard has one link: making a new one replaces it, and **Take the link back** stops it at once. The card says how often the link was opened.

## In the digest

Tick **Put its trends in the digest** and the dashboard's trends appear in the workspace's [digest](/docs/guides/digests/) as a "Dashboards" section: each number over the digest's week or day, against the period before.

## Who can do what

Everyone in the workspace can open dashboards (`analytics.read`). Owners, admins and operators can create, change, arrange and delete them (`analytics.manage`).

## For agents and scripts

The REST API is `/v1/brands/{brand}/dashboards` for dashboards and `/v1/brands/{brand}/dashboards/{dashboard}/tiles` for their tiles. See the [API reference](/docs/api/). Sharing is `POST` and `DELETE /v1/brands/{brand}/dashboards/{dashboard}/share`. The MCP tools are `list_dashboards`, `get_dashboard`, `create_dashboard`, `update_dashboard`, `delete_dashboard`, `add_dashboard_tile`, `remove_dashboard_tile`, `share_dashboard` and `unshare_dashboard`. Ask your agent something like *"Make a Weekly numbers dashboard with the sign-up funnel and a cost-per-sign-up trend on it."*
