---
title: Heatmaps
description: See where visitors click on each page of your website and how far down they scroll, per kind of device. Counts only, a heatmap never names a visitor.
sidebar:
  order: 9.83
---

<span class="pill shipped">Shipped</span> In the web app, the REST API and the MCP server.

A **heatmap** shows where visitors click on a page and how far down they scroll. It tells you whether people see your call to action, what they click that isn't a link, and where they stop reading.

Heatmaps come from the [website tracking](/docs/guides/website-tracking/) snippet you already have, run inside Outflare and call no third-party service. They are off until you turn them on with the switch at the top right of **Analytics › Heatmaps**, which also turns them off again. **Settings** beside it opens the settings heatmaps share with [session recordings](/docs/guides/session-recordings/), where you choose which pages are counted.

In the app, open **Analytics** in the sidebar, then **Heatmaps**.

## Read it

The list shows your pages with their page views, clicks and clicks per view, for the period and device you pick. Open a page to see its heatmap:

- **Clicks**: the warmer an area, the more clicks landed there. **Show** chooses how much is drawn over the page: **Busiest areas** (the default, which leaves the quiet parts clear), **Every click**, **Top 10 spots, numbered**, or **The page only**.
- **Most clicked**: the ten spots with the most clicks, each named by what sits under it (a link or button with its text, or the text with "not a link or button"), with its clicks and its share of all clicks. Pick one to see it on the page.
- **Scrolling**: the share of page views that got at least as far as each part of the page. The numbers at the top say how far half of them got.

Pages are laid out differently on each kind of device, so a heatmap shows desktop, tablet or phone, one at a time.

The page itself is drawn behind the heatmap. Heatmaps take their own picture of each page, the first time a visitor clicks on it and again once the picture is a week old, so they work without [session recordings](/docs/guides/session-recordings/). Until a page has its picture, its heatmap is drawn on a plain sheet the page's size.

## What to look for

- **A busy spot that is not a link or button.** Visitors expect it to do something. Make it a link, or make it look less like one.
- **Your main button low on the Most clicked list.** It is being missed. Move it up the page or make it stand out.
- **Most clicks on the menu or search.** Visitors didn't find what they came for on this page.
- **A sharp drop in Scrolling.** Visitors stop reading there. Put what matters most above that point.

## What is counted

A heatmap is counts only: a page, a day, a kind of device and a place on the page. It never names a visitor and holds nothing they typed. The picture of the page behind the counts is taken from one visitor's browser with the same hiding as a recording (fields are always hidden, and all text when **Hide all text** is on) and is kept without the visitor. Turn on **Hide all text** if your pages show things about the person looking at them. Where consent is needed (see the [consent banner](/docs/guides/consent-banner/)), only visitors who allow analytics are counted. `data-replay="off"` on the snippet keeps heatmaps off for that site.

Counts are kept for 90 days. Pages are told apart by their path, without the query string.

## API and agents

| Call | What it does |
| --- | --- |
| `GET /v1/brands/{brand}/heatmaps/pages` | Pages by clicks, with their page views (`days`, `device`) |
| `GET /v1/brands/{brand}/heatmaps?path=/pricing` | One page's clicks and scroll depth, for one `device` |
| `GET /v1/brands/{brand}/heatmaps/snapshot?path=/pricing` | The picture of the page behind its heatmap |

In the MCP server: `list_heatmap_pages` and `get_heatmap`. Ask your agent how far down most phone visitors get on your pricing page, and where they click most.

## Pages with steps

Some pages change what they show without changing their address: the steps of a sign-up, a wizard. Outflare tells the steps apart by the step marked as current (`aria-current="step"`) or, without one, the first heading in view, and gives each its own heatmap and picture. The Heatmaps list shows such a page once with its number of steps, and its heatmap has a **Step** picker, busiest step first. A page keeps at most 12 steps. With **Hide all text** on, steps are named by a number instead of their heading.

## Leaving pages out

Tick pages in the Heatmaps list and choose **Exclude from tracking**. They are added to **Never these pages** in the settings, for recordings and heatmaps alike, and what was counted on them is deleted. On the Recordings list you can tick visits and choose **Exclude their pages from tracking**.
