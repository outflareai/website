---
title: Website visitors
description: See which companies and people from your CRM visit your website, what they look at, and who is ready to talk, with an alert when someone becomes hot.
sidebar:
  order: 9.7
---

<span class="pill shipped">Shipped</span> In the web app, the REST API and the MCP server.

**Visitors** (in the sidebar after CRM) shows which companies and people came to your website, what they looked at and who is ready to talk. It is built on [website tracking](/docs/guides/website-tracking/): add your site and the snippet first.

## How visitors are named

Outflare only names a visitor it can tie to someone already in your workspace. It never buys or guesses identities.

- **Your product.** When your product tells Outflare who signed up or signed in (see [website tracking](/docs/guides/website-tracking/)), their earlier and later visits join their record.
- **Email clicks.** When someone clicks a link to your own site in a sequence or lifecycle email you sent them, the link carries a short signed token (`ofvisit`). The snippet sends it with the first page view and removes it from the address bar, and that browser's visits join the person the email went to.

The email-click token is safe to sit in a link:

- Outflare signs it, so nobody can make one up, and your public site key still can't name or merge anyone.
- It names one browser only: the first one to use it. The same link forwarded to a colleague, or opened on another device, names nobody.
- It is weaker than a sign-in: if someone the email was forwarded to clicks it and later signs in to your product as themselves, their browser and its visits move to their own record.
- Until the snippet removes it, the token is in the landing page's address, so your own server logs or other analytics may record it. It only works with your site, for seven days, and only until the first browser claims it.
- It lasts seven days, mail scanners and link checkers never get one, and it is never stored in your events.
- It is only added to links to your own site (a brand's domain or website, or one of your site's origins), and only while your site is tracked.

Turn it off with **Know people from email clicks** in the page's settings.

## Companies and people

Switch between companies and people for the last 7, 30 or 90 days. Each row shows pages viewed, key pages viewed, visits, the last page and a score. People are grouped under their company in your CRM, or under the company whose domain matches their email. Open a person to see their recent pages.

## Scores and hot visitors

Every person and company gets a score from 0 to 100. More key pages, more return visits, more pages and, for a company, more people from it score higher, and the score fades after 7, 14 and 30 days without a visit.

Key pages are the paths that show buying intent. The defaults are pricing, plans, demo, contact, booking, comparison, alternatives, enterprise, sign-up and trial pages. Set your own as paths; a trailing `*` matches everything under it, such as `/pricing*`.

When a person or company reaches the hot score (60 by default), Outflare sends the `visitor.became_hot` [webhook](/docs/api/webhooks/), at most once a week each, and they appear in your [digest](/docs/guides/digests/).

## Leave people out

Add your own company's domains under **Leave out these domains** so your team doesn't show up, and turn on **Leave out customers** to hide people and companies who already pay you.

## API and MCP

- `GET /v1/workspaces/{ws}/visitors` (scope `customers.read`): `view` (`companies` or `people`), `days`, `hot`, `limit` and `brand`.
- `GET` and `PUT /v1/workspaces/{ws}/visitors/settings` (`customers.read`, `customers.manage`).
- MCP tools: `list_website_visitors`, `get_visitor_settings`, `update_visitor_settings`.
