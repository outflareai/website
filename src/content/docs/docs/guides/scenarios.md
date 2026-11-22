---
title: Scenarios
description: What if. Put your inputs on sliders, write plain formulas between them, and see the forecast month by month against things as they are today.
sidebar:
  order: 9.8
---

<span class="pill shipped">Shipped</span> In the web app, the REST API and the MCP server.

Reports say what happened. A **scenario** asks what would happen: if sign-ups grew by a fifth, if fewer customers left, if the price went up. You choose the inputs, write the sums between them, and move the sliders. The chart draws two lines: the scenario, and the same sums with every input left where it is today.

In the app, open **Analytics** in the sidebar, then **Scenarios**. It runs inside Outflare and calls no third-party service.

## Move the inputs

A new scenario starts with a simple growth model: sign-ups, the share who start paying, the share of customers lost each month, revenue per customer, and the customers you have now. Drag a slider or type a number and the forecast follows. **Reset to today** puts every input back.

Under each input is its value **today**. That is what the dashed line uses.

## Make it yours

Press **Edit inputs and formulas** to change everything. Nothing in the starting model is fixed.

- **Inputs** have a name, a short name for formulas (lower case letters, digits and underscores), and are counted as a number, a percent or money. Set where the slider starts and ends, or leave it to run from nothing to twice today's value.
- **Today's value** is a number you type in, or it **comes from a saved report** and is read fresh each time the scenario opens:
  - a [trend](/docs/guides/trends/) gives its total over its dates, such as sign-ups in the last 30 days;
  - a [funnel](/docs/guides/funnels/) gives the percent of its first step that reached its last;
  - a [lifetime value](/docs/guides/lifetime-value/) report gives what a customer has paid by its last finished period.
- **Formulas** are worked out each month from top to bottom. A formula can use inputs, the formulas above it, numbers, brackets and `+ - * /`. `prev(customers)` is that line's value the month before, and **Starts from** says what it is before the first month. `month` counts from 1, and `min(a, b)` and `max(a, b)` pick the smaller or larger.
- A percent input is typed as 12.5 and counts as 0.125 in a formula, so `signups * signup_to_paying` gives new customers.
- Choose which formula **the chart draws**, how many **months ahead** to look, and optionally **a target to reach**.

For example:

```text
new_customers = signups * signup_to_paying
customers     = prev(customers) * (1 - lost_each_month) + new_customers
revenue       = customers * revenue_per_customer
```

## Read it

- The first number is the chart's line in the last month, against the same as things are.
- **Difference** is that line added up over all the months, less the same as things are: what the change is worth over the period.
- With a target, **Reaches** is the month the scenario first gets there, and when today's pace would, looking up to ten years ahead.
- **Also worked out** lists every other formula in the first and last month.

## Save it and put it on a dashboard

Name it and press **Save** to keep the inputs where you set them. On a [dashboard](/docs/guides/dashboards/), **Add tile** has **Scenario**: the tile shows the headline numbers and the two lines, and **Edit** opens the sliders. Today's values are read again each time, so the dashed line stays current.

## Agents and the API

Agents run one with `run_scenario` and save it with `save_insight`. Through the API it is `POST /v1/brands/{brand}/insights/scenario` with `inputs` and `formulas`, and optionally `months`, `output` and `target`. The answer has every formula month by month as `values` (the scenario) and `baseline` (as things are). Money is in whole units of the brand's currency.
