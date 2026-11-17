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

Drag a step by its handle to move it, or use **Move up** and **Move down**. Time limits, breakdowns and exclusions that name a step follow it to its new place, and the funnel tells you when one had to be reset. Remove any step, the first included, with its ×; the rest are numbered again.

Give any step a **time limit**: within so many minutes, hours, days or weeks of the step before, or of any earlier step. *A first payment within 3 days of signing up* is a payment step with a 3-day limit from the sign-up step. You can also limit the whole funnel from step 1.

## Optional steps

Every step is **Required** unless you set it to **Optional**. People who skip an optional step still carry on, and count at the next step if they did it. Use it when not everybody takes the same route: in *ad click, signed up, first payment*, some buyers already had an account, so a required sign-up step would hide them. With sign-up optional, the payment bar counts everyone who paid after the ad click, the sign-up bar still shows who signed up on the way, and its label says how many skipped it.

The steps after an optional one show their share of the last required step, so the numbers stay honest. The first and last steps are always required, and a time limit or an exclusion can't count from an optional step. Any-order funnels have no optional steps. To drop people who did something instead, use [Leave people out](#leave-people-out).

## In any order

Funnels count steps in order: step 2 only counts after step 1. Set **Order** to **In any order** under Options when the order doesn't matter, such as the three things a new account should set up in its first week. Step 1 is then whichever step a person did first in the dates, and each bar after it is how many people had done that many of the steps within the funnel's time limit: *1 step*, *2 steps*, up to *All 3 steps*. An any-order funnel has no exclusions and no per-step time limits, and a breakdown needs every step to be of the same kind, because any step can be the first.

## Leave people out

Under the steps, **Leave out people who…** drops from the whole funnel everyone who did something between two steps: for example, everyone who contacted support between signing up and paying. Describe it like a step (an event, a page, a conversion, a payment, with filters) and say between which steps. Every bar then counts the same, smaller group, so you can compare a funnel with and without them. Up to five.

## Count companies instead

**Count** switches a funnel from people to **companies**. A company counts once, through the people linked to it: it reaches a step when any of its people does, and all of their visits, events and payments count for it. Visitors nobody has identified belong to no company and are left out. The people behind a step are then companies, each opening its profile.

## Read it

- Each bar shows the people who reached the step, the share of step 1 and of the step before, and the typical time it took. The striped part is who dropped off.
- **Show ad clicks and spend** puts your ad network's own click count for the same dates beside the chart, as a dashed bar marked *Reference, not a step*. Ad networks report clicks as daily totals, not people, so it is there for comparison and has no number: the people start at step 1. Turn it off with the switch above the chart.
- **Break down** splits every step by something about step 1, such as the campaign or the ad network, so you can compare campaigns side by side. Choose **A/B test version** to split people by the version of an [A/B test](/docs/guides/ab-tests/) they were first shown, and see where each version wins or loses people.
- A breakdown can also use **a later step's property**, such as the plan chosen at the sign-up step, or **a field of the person**, such as their country or plan. Person fields are the ones safe to chart: choices, numbers and short text you defined, never a name, an address or a confidential field. In an any-order funnel a breakdown by a later step isn't available.
- **Conversion over time** draws the share who finished as a line, one point per day, week or month people started in, with a table of who started and finished underneath. The newest period is dotted: people in it still have time to finish.
- **Time to convert** shows how long people took to reach a step from the one before: the median, the average, and a bar for each span of time from under a minute to over 30 days. A median of minutes with a tail of days usually means two kinds of people; pick the step to look at when the funnel has more than two.
- Click any bar, or any count in the breakdown, to see the people behind it: who got there, or who dropped off before it, with when they did each step. Each one opens their profile.
- In that list, **Save as a list** puts everyone there with a record into a new static [list](/docs/guides/smart-lists/), to mail, score or compare. Visitors not signed in have no record and are skipped; the list says how many. *Signed up, never paid* as a list is a sequence waiting to happen.
- **What did people who finished do differently?** compares, for everyone at step 1, the events, pages and properties of the people who reached a step with those who didn't. Properties are what your records say about identified people, such as `plan: pro` or `country: AU`, never anything that identifies one person (email, phone, name). Each row shows the share of each group who did or had it and how many times more likely finishing was (over 1 went with finishing, under 1 with dropping off). It runs when you press **Compare**, since it reads every event and page view, and leaves out anything fewer than three people did. For funnels of people, not companies.

## Save it, and link to it

Nothing saves by itself. While you build or change a funnel you are working on a draft: the chart updates as you go, and the bar at the top says **Not saved**, **Saved** or **Unsaved changes**.

- **Save** keeps a funnel for everyone in the brand, with a name. **Save changes** updates the saved funnel you have open, and only then does anyone else see the change.
- **Cancel** puts a saved funnel back as it was. **Save as a copy** keeps your changes as a new funnel and leaves the original alone.
- Leaving the page with unsaved changes to a saved funnel asks first.

Every funnel has its own address. A saved funnel's address opens that funnel, and a draft's address carries its steps and settings, so **Copy link** gives a teammate exactly what you are looking at, saved or not. Back, forward and reload keep your place. A link to a funnel that was deleted says so and offers the way back to the list.

Choose a moving date range, such as the last 30 days, and a saved funnel stays current. It keeps only its steps and settings: every view counts again, so it is never out of date. [Trends](/docs/guides/trends/), [retention](/docs/guides/retention/) and [paths](/docs/guides/paths/) save and link the same way.

## Who can do what

Everyone in the workspace can run funnels and the comparison (`analytics.read`); seeing the people behind a step needs `customers.read`, and saving them as a list `customers.manage`. Owners, admins and operators can save, change and delete funnels (`analytics.manage`).

## For agents and scripts

The REST API is `POST /v1/brands/{brand}/insights/funnel` to run a funnel (with `exclusions`, `by`, `order` and `optional` on a step), `POST /v1/brands/{brand}/insights/funnel/people` for the people behind a step and `.../people/save` to keep them as a list, `.../funnel/correlation` for what converters did differently, `GET /v1/brands/{brand}/insights/catalog` for the events and fields you can use, and `/v1/brands/{brand}/insights` for saved funnels. See the [API reference](/docs/api/). The MCP tools are `get_insights_catalog`, `run_funnel`, `list_funnel_people`, `save_funnel_people`, `run_funnel_correlation`, `list_insights`, `get_insight`, `save_insight`, `update_insight` and `delete_insight`. Ask your agent something like *"Of the people who came from our Google ads last month, how many signed up, and how many of those paid within 3 days?"*
