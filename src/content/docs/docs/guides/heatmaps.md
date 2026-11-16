---
title: Heatmaps
description: See where visitors click on each page of your website and how far down they scroll, per kind of device. Counts only, a heatmap never names a visitor.
sidebar:
  order: 9.83
---

<span class="pill shipped">Shipped</span> In the web app, the REST API and the MCP server.

A **heatmap** shows where visitors click on a page and how far down they scroll. It tells you whether people see your call to action, what they click that isn't a link, and where they stop reading.

Heatmaps come from the [website tracking](/docs/guides/website-tracking/) snippet you already have, run inside Outflare and call no third-party service. They are off until you turn them on: open **Analytics › Recordings › Settings** and switch on **Heatmaps** (the same settings as [session recordings](/docs/guides/session-recordings/)).

In the app, open **Analytics** in the sidebar, then **Heatmaps**.

## Read it

The list shows your pages with their page views, clicks and clicks per view, for the period and device you pick. Open a page to see its heatmap:

- **Clicks**: the warmer a spot, the more clicks landed there.
- **Scrolling**: the share of page views that got at least as far as each part of the page. The numbers at the top say how far half of them got.

Pages are laid out differently on each kind of device, so a heatmap shows desktop, tablet or phone, one at a time.

With recordings on, the page itself is drawn behind the heatmap, as a recent visit first saw it, with a link to watch that visit. Without, the heatmap is drawn on a plain sheet the page's size.

## What is counted

A heatmap is counts only: a page, a day, a kind of device and a place on the page. It never names a visitor and holds nothing they typed. Where consent is needed (see the [consent banner](/docs/guides/consent-banner/)), only visitors who allow analytics are counted. `data-replay="off"` on the snippet keeps heatmaps off for that site.

Counts are kept for 90 days. Pages are told apart by their path, without the query string.

## API and agents

| Call | What it does |
| --- | --- |
| `GET /v1/brands/{brand}/heatmaps/pages` | Pages by clicks, with their page views (`days`, `device`) |
| `GET /v1/brands/{brand}/heatmaps?path=/pricing` | One page's clicks and scroll depth, for one `device` |

In the MCP server: `list_heatmap_pages` and `get_heatmap`. Ask your agent how far down most phone visitors get on your pricing page, and where they click most.
