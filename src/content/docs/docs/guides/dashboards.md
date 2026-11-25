---
title: Dashboards
description: Put your saved funnels and trends on one page, all over the same dates, with notes between them.
sidebar:
  order: 9.8
---

<span class="pill shipped">Shipped</span> In the web app, the REST API and the MCP server.

A **dashboard** is one page of your saved [funnels](/docs/guides/funnels/), [trends](/docs/guides/trends/), [retention](/docs/guides/retention/) and [paths](/docs/guides/paths/) questions, all run over the same dates. Build one per question: the weekly numbers, a launch, a channel.

In the app, open **Analytics** in the sidebar, then **Dashboards**. Type a name and press **Create** to start one.

## Start from a template

You don't have to build a dashboard tile by tile. Under **Start from a template** on the Dashboards page, each ready-made dashboard says what it adds, and **Add this dashboard** creates it in one click.

- **Management report.** The monthly numbers a management team asks for, from your payments: revenue by month, new customers, new against returning revenue, revenue by product, order value (average and typical), paying customers, [lifetime value](/docs/guides/lifetime-value/), [money kept](/docs/guides/retention/) and [how customers are spread](/docs/guides/distribution/).

A template only reads data every brand has, so it fills in as soon as payments arrive, with nothing to set up. Each report it adds is saved as your own: rename it, change it, move it or take it off like any other tile, and find it under **All reports**. Every tile keeps its own dates, a year by month. Adding a template again makes a second dashboard and never changes the first.

Things that need a choice only you can make are left for you to add: your sign-up [funnel](/docs/guides/funnels/), customer [balances](/docs/guides/balances/) and a what-if [scenario](/docs/guides/scenarios/).

## All reports

**Analytics → All reports** lists everything saved for the brand in one table: dashboards, funnels, trends, retention and paths questions, and saved Tracker reports. Search by name, narrow the list by type or by who made it, and sort by when each last changed or when you last opened it. A row opens the report, and **New** starts a dashboard, funnel, trend, retention or paths question.

Every saved report has its own address, lifecycle and stickiness questions and saved Tracker reports included, so you can link to one, pin it, and find it again under Recents.

**Tags** group reports that belong together. In the Tags column, choose **Add tag** and type a few words of your own, such as a launch or a weekly meeting, with commas between them. Select a tag on any row, or pick one from the **Tag** menu, to see only the reports that have it.

## Ask a question

At the top of Dashboards is a box: type what you want to know ("How many people opened the app each week, by plan?") and press **Ask**. You get a chart with a sentence on how it was built. **Open in the builder** to change it, or **Save this chart** to keep it and put it on a dashboard.

- **It runs on your own AI model.** The company connects its own key under **Connectors** and picks the model for "Analytics questions" in the AI settings. Until it does, the box stays off and links to Connectors. Outflare never supplies a model.
- **The model never sees your data.** It gets the question and the names of your events, their descriptions and property names from the [event dictionary](/docs/guides/customer-records/), your conversions and the fields a chart can break down by. Outflare runs the chart itself, so no people, values or numbers leave it. The better your dictionary describes your events, the better the answers.
- **When it can't answer**, it says why instead of drawing a chart.

Through the API, `POST /v1/brands/{brand}/insights/ask` with `{"question": "…"}` starts a question and `GET /v1/brands/{brand}/insights/ask/{id}` returns it: once `status` is `ready` it carries the chart's `kind` and `spec`, which you can run or save like any other.

## Tiles

**Add tile** opens a page inside the dashboard: build a new trend, funnel, retention, paths or lifecycle chart right there (it is saved and added in one step), pick one you saved before, or write a note (a few lines of text, for what the page is for or what to look at first). A funnel tile takes the full width; the others half of it. A trend saved as a number shows its totals, with the change on the period before. A trend tile carries the brand's [notes on these dates](/docs/guides/trends/) as markers, so a jump or a dip on the dashboard has its reason beside it; a dashboard shared by link shows the numbers without the notes.

Every tile runs its insight again when you open the page, with the dashboard's dates in place of its own, so nothing on a dashboard is ever out of date. Choose the dates at the top: a moving range such as the last 30 days, fixed dates, or **each tile's own dates** to let every insight keep what it was saved with. Tick **Compare with the period before** to show every trend against the same length of time before it.

## A saved query as a tile

Some numbers don't fit a chart builder: your largest customers and how long since each last paid, who is due to buy again before the month ends, one table joined to another. Save that as a [query](/docs/guides/query-and-search/) under Data, Queries, and put it on the dashboard beside the charts.

**Add tile** lists the brand's saved queries under **Saved queries**. Press **Add**, and the tile shows the chart saved with the query when it has one, otherwise its rows as a table (up to 200), with **Open the query** to change it. Rows for a person or company link to their page. The tile runs the query again each time the dashboard opens.

- **It keeps its own dates.** The query says which dates it covers, so the dashboard's dates, comparison and filters don't change it.
- **It is shared with the team.** Everyone who opens the dashboard runs the query, so a private query is shared with the brand first (the app asks), and it stays shared while it is on a dashboard.
- **A share link shows only its name.** The rows are for the brand's signed-in team.

Agents add one with `add_dashboard_tile` and `saved_query_id`; through the API it is `POST /v1/brands/{brand}/dashboards/{dashboard}/tiles` with `saved_query_id`.

## Filter the whole dashboard

Press **+ Filter** next to the dates to show every tile for just some events: a field such as `plan` or `utm_source`, a comparison and a value (`plan` is `pro`). Up to five filters show as chips at the top; the × takes one off. They apply to every event and page view in the dashboard's trends, funnels, retention and lifecycle tiles, and on its share link and in the digest too. Visits, payments, conversions, ad numbers and paths keep only their own filters.

## Edit a tile

Click a tile's title, or **Edit**, to open it full screen without leaving the dashboard. Change the event or other thing it counts, filters, what it measures, the breakdown, the interval, how it shows (lines, areas, bars, a ring of shares, a map, one number or a table) and its name. It is the same builder as the [Trends](/docs/guides/trends/) and [Funnels](/docs/guides/funnels/) pages, with the chart updating as you change it and the same bar at the top:

- **Save changes** keeps your changes and takes you back to the dashboard. A tile is a saved insight, so saving changes it on every dashboard that shows it.
- **Cancel** puts it back as it was. Nothing changes until you save.
- **Save as a copy** saves your version as a new insight and adds it to this dashboard, leaving the original alone.

The menu on each tile does the rest without opening the builder: **Rename**, **Duplicate** (a copy on the same dashboard), **Open in Trends** (or Funnels, Retention, Paths) to see it on its own page with its own link, and **Take off the dashboard**. Press **Edit** on a note to change its text.

### A tile with its own dates

Every tile follows the dates at the top of the dashboard. To keep one on its own dates, such as sign-ups over the last 12 months on a dashboard that shows the last 30 days, choose **Keep its own dates** in the tile's menu, or **Keep this report's own dates** at the top of the builder, and pick the dates under Options there. The tile shows a label with its dates, and it keeps them on a share link too. **Follow the dashboard's dates** puts it back.

## Edit the dashboard

Press **Edit dashboard** to change the dashboard itself. Its name, description, whether its trends go in the digest, its share link and **Delete dashboard** show above the tiles, and you can drag a tile by the bar on top to move it, or by its bottom-right corner to resize it. Tiles in the way move down and gaps close up. Each tile also keeps arrows to move it left, right, up and down and to make it wider, narrower, taller or shorter on a twelve-column grid, and a cross to take it off the dashboard. Taking a tile off never deletes the saved funnel or trend. Press **Done** when it looks right; everyone in the brand sees the same layout.

Deleting a saved insight leaves its tile in place, saying so, until someone takes it off.

## Share by link

Under **Edit dashboard**, **Share by link** makes a link to the dashboard for people outside the company: a client, an investor, the wider team. Anyone with it sees the dashboard read-only at `app.outflare.ai/share/…`, every tile run live over the dashboard's dates (or dates they pick), and nothing else of the brand. Add a **password** so the link alone isn't enough, and an expiry (7 days to a year). A dashboard has one link: making a new one replaces it, and **Take the link back** stops it at once. The card says how often the link was opened.

## In the digest

Tick **Put its trends in the digest** and the dashboard's trends appear in the company's [digest](/docs/guides/digests/) as a "Dashboards" section: each number over the digest's week or day, against the period before.

## Who can do what

Everyone in the company can open dashboards (`analytics.read`). Owners, admins and operators can create, change, arrange and delete them (`analytics.manage`).

## For agents and scripts

The REST API is `/v1/brands/{brand}/dashboards` for dashboards and `/v1/brands/{brand}/dashboards/{dashboard}/tiles` for their tiles. See the [API reference](/docs/api/). Sharing is `POST` and `DELETE /v1/brands/{brand}/dashboards/{dashboard}/share`. `GET /v1/brands/{brand}/dashboards/templates` lists the templates, and creating a dashboard with `template` set to a template's key starts from it. The MCP tools are `list_dashboards`, `list_dashboard_templates`, `get_dashboard`, `create_dashboard`, `update_dashboard`, `delete_dashboard`, `add_dashboard_tile`, `remove_dashboard_tile`, `share_dashboard` and `unshare_dashboard`. Ask your agent something like *"Make a Weekly numbers dashboard with the sign-up funnel and a cost-per-sign-up trend on it."*
