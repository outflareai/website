---
title: Internal and test people
description: Leave your own team and your test accounts out of funnels, trends and the other analytics reports, with one switch and a list of email domains and addresses.
sidebar:
  order: 9.66
---

<span class="pill shipped">Shipped</span> In the web app, the REST API and the MCP server.

Your own team and your test accounts sign up, click around and "buy" all day, and that inflates every funnel. Outflare can leave them out of a brand's reports. In the app, open **Analytics** in the sidebar, then **Internal and test people**.

## Set it up

1. Under **Your team's email domains**, add one domain per line, such as `your-company.example`. Everyone with an email address at one of them is left out.
2. Under **Test accounts**, add the email address of each single account on another domain, one per line.
3. Press **Save list**. The page shows how many of the brand's people the list matches.
4. Switch **Leave them out of reports** on.

It is off until you turn it on.

## What it changes

While it is on, [funnels](/docs/guides/funnels/), [trends](/docs/guides/trends/), [retention](/docs/guides/retention/), stickiness, lifecycle and [paths](/docs/guides/paths/) count no event, visit or payment of a known person with such an address.

- **Nothing is deleted**, and nobody's record changes. Switch it off, or take an entry out of the list, and those people are counted again from the next report.
- **Only people Outflare knows by email are left out.** A teammate who visits your site without signing in looks like any other visitor.
- **A/B tests and Visitors have their own list.** [A/B tests](/docs/guides/ab-tests/) and the [Visitors](/docs/guides/website-visitors/) page leave out the domains under Visitors, settings, **Leave out these domains**.

## API and agents

`GET /v1/brands/{brand}/internal-people` reads the switch, both lists and how many people match. `PUT` replaces all three: send `enabled`, `domains` and `emails` together. Agents use the MCP tools `get_internal_people` and `set_internal_people`.
