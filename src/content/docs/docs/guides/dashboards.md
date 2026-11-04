---
title: Dashboards
description: Put your saved funnels and trends on one page, all over the same dates, with notes between them.
sidebar:
  order: 9.8
---

<span class="pill shipped">Shipped</span> In the web app, the REST API and the MCP server.

A **dashboard** is one page of your saved [funnels](/docs/guides/funnels/) and [trends](/docs/guides/trends/), all run over the same dates. Build one per question: the weekly numbers, a launch, a channel.

In the app, open **Analytics** in the sidebar, then **Dashboards**. Type a name and press **Create** to start one.

## Tiles

**Add tile** puts a saved funnel or trend on the dashboard, or a note (a few lines of text, for what the page is for or what to look at first). A funnel tile takes the full width; a trend tile half of it. A trend saved as a number shows its totals, with the change on the period before.

Every tile runs its insight again when you open the page, with the dashboard's dates in place of its own, so nothing on a dashboard is ever out of date. Choose the dates at the top: a moving range such as the last 30 days, fixed dates, or **each tile's own dates** to let every insight keep what it was saved with. **Settings** renames the dashboard, sets its description and turns on **against the period before** for every trend.

## Arrange

Press **Arrange** to move and resize tiles. Each tile gets arrows to move it left, right, up and down and to make it wider, narrower, taller or shorter on a twelve-column grid, and a cross to take it off the dashboard. Taking a tile off never deletes the saved funnel or trend. Press **Done arranging** when it looks right; everyone in the brand sees the same layout.

Deleting a saved insight leaves its tile in place, saying so, until someone takes it off.

## Who can do what

Everyone in the workspace can open dashboards (`analytics.read`). Owners, admins and operators can create, change, arrange and delete them (`analytics.manage`).

## For agents and scripts

The REST API is `/v1/brands/{brand}/dashboards` for dashboards and `/v1/brands/{brand}/dashboards/{dashboard}/tiles` for their tiles. See the [API reference](/docs/api/). The MCP tools are `list_dashboards`, `get_dashboard`, `create_dashboard`, `update_dashboard`, `delete_dashboard`, `add_dashboard_tile` and `remove_dashboard_tile`. Ask your agent something like *"Make a Weekly numbers dashboard with the sign-up funnel and a cost-per-sign-up trend on it."*
