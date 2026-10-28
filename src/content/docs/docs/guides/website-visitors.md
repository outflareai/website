---
title: Website visitors
description: See which companies and people visit your website, what they look at, and who is ready to talk, with an alert when someone becomes hot. Optionally, match unknown visitors to a company with your own data provider.
sidebar:
  order: 9.7
---

<span class="pill shipped">Shipped</span> In the web app, the REST API and the MCP server.

**Visitors** (in the sidebar after CRM) shows which companies and people came to your website, what they looked at and who is ready to talk. It is built on [website tracking](/docs/guides/website-tracking/): add your site and the snippet first.

## How visitors are named

Outflare names a visitor it can tie to someone already in your workspace. It has no identity data of its own and never guesses. The exceptions are optional and run on your own accounts: [company lookups](#company-lookups) and [people by name](#people-by-name) below.

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

## Company lookups

Visitors nobody knows yet can be matched to a company from their IP address, using your own data provider: [People Data Labs](https://www.peopledatalabs.com) (IP Enrichment) or [Snitcher](https://www.snitcher.com) (IP to Company). Connect one under **Settings → Connectors** with your own key. Outflare never looks anything up on its own account. Lookups are off until you turn on **Look up companies from visitors' addresses** in the page's settings.

- **Who is looked up.** Only visitors who accepted your site's cookies. Each browser is looked up at most once a day and each address at most once a week, up to **Lookups a day at most** (500 by default). Lookups spend your provider's credits.
- **What is kept.** The address goes to your provider in a background job and is never stored. Outflare keeps a keyed hash of it, with the company's domain and name.
- **Home and phone connections.** A home, phone, VPN or data-centre connection names nobody. Those visitors are counted separately, as on such a network.
- **Nothing goes in your CRM on its own.** Lookups are often wrong, so they never add anything to your CRM.
  - A company your CRM already has at that domain is linked straight away and can turn hot.
  - Any other company is listed as **Not in CRM** until someone clicks **Add to CRM**. It is then added as a prospect, with its domain marked as coming from a lookup (unverified). It is never treated as having opted in.
- **Not a company (ISP).** Use this when an internet provider or mobile carrier is mistaken for its customers. Its visitors lose it, it is never named again, and any company record that only lookups put in your CRM is archived.
- **Old matches.** A company found for visitors who don't come back within 90 days, and that nobody added, is dropped.
- **Sites behind a proxy.** If your site sends its events through its own domain, Outflare sees your server's address instead of the visitor's. Lookups name nobody in that case unless your proxy passes on the visitor's address with a proxy secret (see [website tracking](/docs/guides/website-tracking/)).

## People by name

[RB2B](https://www.rb2b.com), [Vector](https://www.vector.co) and [Warmly](https://www.warmly.ai) name the people who visit a website. If you have your own account at one of them, Outflare can take in the people it names. Outflare never identifies anyone itself and keeps no identity data: the tool does the matching, on your account, and sends each person to a webhook.

1. **Connect the tool** under **Settings → Connectors**.
2. **Turn it on.** In the Visitors settings, turn on **Take in the people your tool names** and accept the notice. These tools only name people in the United States. You are responsible for saying so in your site's privacy policy, honouring opt-outs (including Global Privacy Control) and checking the rules where you sell. Never use it for visitors in the EU, UK, Canada or Australia.
3. **Add the webhook.** Copy the connection's webhook address from the settings into the tool's webhook settings. Keep it private: anyone who has it can add people to your review list. Removing the connection turns the address off.

What happens to each person the tool sends:

- **Already in your CRM.** If your CRM already has their email address, nothing about them changes. The visit is added to their history.
- **Someone new.** They become a person record: a prospect tagged with the tool, with their name, job title and LinkedIn profile.
  - People without an email address are skipped.
  - People at a domain you leave out are skipped.
- **Held for review.** New people stay off your people list, and no email of any kind goes to them until someone approves them.
- **People to review.** The Visitors page lists them under **People to review**.
  - **Approve** adds them to your lists like anyone else. They stay third-party prospects: cold email only, and never marketing email without their own consent.
  - **Reject** archives the record.
- **Switched off.** While the setting is off, Outflare ignores anything the tool sends and keeps nothing.

## Companies and people

Switch between companies and people for the last 7, 30 or 90 days. Each row shows pages viewed, key pages viewed, visits, the last page and a score. People are grouped under their company in your CRM, or under the company whose domain matches their email. Open a person to see their recent pages.

## Scores and hot visitors

Every person and company gets a score from 0 to 100. More key pages, more return visits, more pages and, for a company, more people from it score higher, and the score fades after 7, 14 and 30 days without a visit.

Key pages are the paths that show buying intent. The defaults are pricing, plans, demo, contact, booking, comparison, alternatives, enterprise, sign-up and trial pages. Set your own as paths; a trailing `*` matches everything under it, such as `/pricing*`.

When a person or company reaches the hot score (60 by default), Outflare sends the `visitor.became_hot` [webhook](/docs/api/webhooks/), at most once a week each, raises an [alert](/docs/guides/alerts/) for the owners and admins, and they appear in your [digest](/docs/guides/digests/).

## Leave people out

Add your own company's domains under **Leave out these domains** so your team doesn't show up, and turn on **Leave out customers** to hide people and companies who already pay you.

## API and MCP

- `GET /v1/workspaces/{ws}/visitors` (scope `customers.read`): `view` (`companies` or `people`), `days`, `hot`, `limit` and `brand`.
- `GET` and `PUT /v1/workspaces/{ws}/visitors/settings` (`customers.read`, `customers.manage`). Company lookups are `reveal_companies`, `reveal_daily_limit` and `not_companies`.
- `POST /v1/workspaces/{ws}/visitors/companies` (`customers.manage`): add a looked-up company to your CRM.
- `POST /v1/workspaces/{ws}/records/{record}/review` (`customers.manage`): approve or reject a person held for review. `GET .../records` lists held people only with `review=needs_review`.
- People by name settings are `reveal_people` and `accept_people_notice`. Each connection's webhook address is in `people_connections`.
- MCP tools: `list_website_visitors`, `get_visitor_settings`, `update_visitor_settings`, `add_visitor_company`, `review_record`.
