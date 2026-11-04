---
title: Funnels
description: Follow people from an ad click or a website visit through sign-up to a first payment, and see where they drop off.
sidebar:
  order: 9.6
---

<span class="pill shipped">Shipped</span> In the web app, the REST API and the MCP server.

A **funnel** shows how many people got through each step of a journey, where the rest dropped off and how long each step took. For example: clicks on your Google ads, then website visitors from those ads, then sign-ups, then a first purchase within 3 days of signing up.

In the app, open **Analytics** in the sidebar, then **Funnels**. Funnels run inside Outflare and call no third-party service. They work from the visits [website tracking](/docs/guides/website-tracking/) records, the events your workspace sends or syncs, your [conversions](/docs/guides/attribution/), [payments](/docs/guides/transactions/) and, for the ad clicks bar, the numbers your connected ad accounts report.

## People, not events

A funnel counts people. Only people who did step 1 in the date range count in step 2, only those in step 2 count in step 3, and so on, so each bar shows exactly who you lost.

A visit from before someone signed up counts for them once your site identifies them, so *visited from a Google ad, then signed up* works across that moment. Someone who visited and never signed up is still counted, as an anonymous visitor.

## Steps

Add up to ten steps. Each one is:

- **Website visit**: a visit, filtered by its ad network (from the ad's click id), channel, source, campaign, landing page, device, country and more.
- **Event**: a product event by name, such as `signed_up`, filtered by any of its properties.
- **Page view**: a view of a page, filtered by its path, address, referrer or a query parameter such as `ref`.
- **Conversion**: one of your conversions, with the event and filters it already has.
- **Payment**: a successful payment, filtered by amount, product or currency. Tick **first** to count only someone's first ever payment.

Give any step a **time limit**: within so many minutes, hours, days or weeks of the step before, or of any earlier step. *A first payment within 3 days of signing up* is a payment step with a 3-day limit from the sign-up step. You can also limit the whole funnel from step 1.

## Read it

- Each bar shows the people who reached the step, the share of step 1 and of the step before, and the typical time it took. The striped part is who dropped off.
- **Ad clicks** puts your ad network's own click count for the same dates in front of step 1. Ad networks report clicks as daily totals, not people, so this bar is for comparison; the people start at the visit the ad brought.
- **Break down** splits every step by something about step 1, such as the campaign or the ad network, so you can compare campaigns side by side.
- **Over time** shows the funnel by the day, week or month people entered.
- Click any bar, or any count in the breakdown, to see the people behind it: who got there, or who dropped off before it, with when they did each step. Each one opens their profile.

## Save it

**Save** keeps a funnel for everyone in the brand, with a name. Choose a moving date range, such as the last 30 days, and it stays current. A saved funnel keeps only its steps and settings: every view counts again, so it is never out of date.

## Who can do what

Everyone in the workspace can run funnels (`analytics.read`); seeing the people behind a step needs `customers.read`. Owners, admins and operators can save, change and delete funnels (`analytics.manage`).

## For agents and scripts

The REST API is `POST /v1/brands/{brand}/insights/funnel` to run a funnel, `POST /v1/brands/{brand}/insights/funnel/people` for the people behind a step, `GET /v1/brands/{brand}/insights/catalog` for the events and fields you can use, and `/v1/brands/{brand}/insights` for saved funnels. See the [API reference](/docs/api/). The MCP tools are `get_insights_catalog`, `run_funnel`, `list_funnel_people`, `list_insights`, `get_insight`, `save_insight`, `update_insight` and `delete_insight`. Ask your agent something like *"Of the people who came from our Google ads last month, how many signed up, and how many of those paid within 3 days?"*
