---
title: Brands
description: Market several businesses from one workspace, each with its own website, context, projects and mailboxes, without reconnecting tools or re-inviting people.
sidebar:
  order: 1.4
---

<span class="pill shipped">Shipped</span> Brands with their own context, records, mailboxes and analytics, in the web app, the REST API and the MCP server.

Many companies market more than one business. Geonode runs geonode.com and repocket.com, and also makes games, on the web, on phones and on TVs. Separate workspaces would mean connecting every tool twice and inviting every person twice, and nobody could see everything at once. So a workspace can hold **brands** instead.

Each brand has its own website (its point of truth), its own context for agents, and its own projects, domains and mailboxes. Your connectors, people, API tokens, leads and suppression list stay shared, and nobody switches accounts or keys. You can also keep a person or an API token to some brands, so a brand's agency or contractor sees only that brand.

![The Brands page: each brand with its website, platforms and what belongs to it](/screens/brands-list.png)

## Add a brand

Open **Settings → Brands → Add a brand** and give its name, website and where it ships (web, iOS, Android, TV and so on). Add its other domains on its page, such as an app or help site. A workspace without brands works exactly as before. Anyone but a viewer can add a brand, and so can an API token or connected AI app that can make changes (the `context.manage` scope); only the workspace's own name and URL need `workspace.manage`.

Also on its page, under **Links**, add everywhere else the brand lives: its App Store and Google Play listings, TV app stores, the Chrome Web Store, Steam, socials and docs. Paste the address and Outflare works out what it is (apps.apple.com is the App Store); add a label such as "Fire TV" where it helps. Agents read the links with the brand's context. With your own Geonode account connected, Outflare also reads the brand's website and suggests the socials and listings it links to, for you to add or dismiss ([Finding a brand's links](/docs/guides/social/#finding-a-brands-links)).

The Brands page shows brands as cards or as a table you can sort; it remembers which you picked.

## Tell agents about it

Each brand's page has **About**: what it is, who it's for, goals, voice, rules and notes. Agents read it on top of the company's context:

- Rules add to the company's rules and never replace them, so "Never mention Geonode" for Repocket keeps every company-wide rule.
- The other fields win over the company's where you fill them in, such as a friendlier voice for a consumer app.
- **How our brands relate**, on the Company page, says what the brands share and when one may mention another.

Memories can belong to the company, to a brand or to a project. An agent working on Repocket reads the company's memories and Repocket's, never Geonode's. See [Memory and status](/docs/agents/memory/).

## Decide what belongs to each brand

On a brand's page, turn on the projects and sending domains that are its own. A project brings everything in it, and a domain brings its mailboxes. Anything you leave off is shared by every brand. Records inside a project always follow the project's brand, so move the project rather than its parts.

A brand's mailboxes only send for that brand's sequences, so Repocket never emails from a Geonode domain. Shared mailboxes can still send for any brand.

## See one brand at a time

Like a project in PostHog, you work on one brand at a time. The brand picker sits at the top of the sidebar, under your workspace (on a phone, in the top bar), and narrows every page to that brand: projects, sequences, lead lists, mailboxes, domains, missions, connectors and analytics. Outflare opens on the brand you picked last, or your first brand. The link keeps the choice (`?brand=repocket`), so a link you share opens on the same brand.

To compare brands side by side, pick **All brands** at the bottom of the picker. Each record then shows the brand it belongs to.

![Projects with All brands picked: each one shows its brand](/screens/brands-badges.png)

## Connect a tool once for every brand

Connectors belong to the workspace, so you connect Google Analytics, Search Console, your verification service or your ad accounts once and every brand uses them. Each brand still reads its own GA4 property, Search Console site or ad account on that one connection (see below).

You can narrow it down on the **Connectors** page, where the **Used by** column says who uses each connection. Open **More → Choose who uses it** to pick:

- **Shared from the workspace**: every brand, or only the brands you tick.
- **One brand's own**: for a brand with an account of its own, say Repocket's own Plausible. Only that brand uses it, and it takes the place of the shared Plausible for Repocket alone. The other brands keep the shared one.

With one brand picked, Connectors lists what that brand uses and marks each one as **Shared from workspace** or the brand's own. When you connect something new there, choose **Every brand** or **Only Repocket**. Someone kept to some brands only sees the connections their brands use.

In the API, every connection has `brand_id` (set on a brand's own) and `brand_ids` (the brands a shared one is shared with; empty means every brand). `GET /v1/workspaces/{ws}/integrations?brand=repocket` lists what a brand uses. Set who uses a connection with `brand_id` or `brand_ids` on `POST` or `PATCH /integrations`, or `?brand=` on the sign-in link. The MCP tools are `list_integrations` and `update_integration`.

## Analytics by brand

Each site in your analytics tools, such as a GA4 property, a Search Console site or a PostHog project, counts as a brand's when its domain is one of the brand's domains. Subdomains count too, so app.repocket.com is Repocket's. A site read through a brand's own connection always counts for that brand. For a site named after an app rather than a domain, pick its brand yourself (`PUT /v1/workspaces/{ws}/analytics/{id}/site-brand`), or mark it as shared.

## Keep brands from emailing the same person

Leads and the suppression list are shared, so one person is one lead, and an unsubscribe from any brand stops every brand. You can go further and keep two brands from cold emailing the same person close together. In **Settings → Brands**, turn on **Contacting the same person** and choose how many days to wait (1 to 365).

With the rule on, a brand's sequence skips anyone another brand emailed within that many days. Their enrollment shows as blocked with the reason `other_brand:geonode`, naming the brand that got there first. The rule checks only first emails, so follow-ups already under way carry on, and sequences shared by every brand don't count. To check before you enroll, call `POST /recipients/check` with `brand`.

## Reports by brand

**Sending reports** and **Cost per meeting** follow the brand picked in the sidebar, and both can group by brand to compare them side by side. In the API, `GET /reports` and `GET /outcomes/report` take `group_by=brand` and `?brand=`. A send, reply or meeting counts for its sequence's brand. Spend tied only to a mailbox or domain counts for that mailbox's or domain's brand.

The audit log and the events feed take `?brand=`, and every event and webhook payload carries `brand_id` when the changed record has a brand. A webhook can be kept to one brand: pick it under **Which brands** in Settings → Webhooks, or send `"brand": "repocket"` when you create it.

## Keep people and tokens to some brands

Owners and admins always see every brand. An operator or viewer can be kept to some brands: in **Settings → Members**, pick their brands in the Brands column, or pick them on the invite. An API token can be kept to one brand: choose it under **Which brands** when you create the token (`"brand": "repocket"` in the API). An MCP connection is a token, so the same goes for an agent.

Someone kept to some brands:

- sees those brands' projects, sequences, lists, mailboxes, domains, inbox, overview and analytics, plus anything shared;
- changes only their brands' records, so shared records are read-only to them;
- makes new records in their brand (or the brand of the project they work in);
- can't use what needs every brand, such as workspace settings, webhooks, missions and connecting tools. The app hides those pages, and the API answers `403`. In the [API reference](/docs/api/), these endpoints aren't marked `brand_limited`.

Changing someone's brands is in the audit log as `member.brands_changed`.

## API and MCP

| What | REST | MCP tool |
| --- | --- | --- |
| List brands | `GET /v1/workspaces/{ws}/brands` | `list_brands` |
| Add or edit one, including its links | `POST /brands`, `PATCH /brands/{brand}` | `create_brand`, `update_brand` |
| Links found on its website | `POST /brands/{brand}/links/discover`, `GET /brands/{brand}/link-suggestions` | `find_brand_links`, `list_brand_link_suggestions`, `add_brand_link`, `dismiss_brand_link` |
| A brand's own context | `GET`/`PATCH /brands/{brand}/context` | `get_brand_context`, `update_brand_context` |
| Company and brand context together | `GET /context?brand=repocket` | `get_context` with `brand` |
| Move records in or out | `POST /brands/{brand}/add`, `/remove` | `add_to_brand`, `remove_from_brand` |
| Keep a member to some brands | `PATCH /members/{user}` with `brand_ids` | (people only, in the app or API) |
| A token for one brand | `POST /tokens` with `brand` | (in the app or API) |
| The cross-brand contact rule | `GET`/`PATCH /brand-rules` | `get_brand_rules`, `set_brand_rules` |
| Reports by brand | `GET /reports?group_by=brand`, `GET /outcomes/report?group_by=brand` | `get_report`, `get_outcomes_report` |
| Analytics sites by brand | `GET /analytics/site-brands`, `PUT /analytics/{id}/site-brand` | `list_analytics_site_brands`, `set_analytics_site_brand` |

`{brand}` is the brand's handle (such as `repocket`) or its id. List endpoints take `?brand=` with a handle or id, `none` for shared records, or `all`. Set `OUTFLARE_BRAND` on the MCP server to make one brand its default.

```sh
curl -X POST https://app.outflare.ai/v1/workspaces/$WS/brands \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" \
  -d '{"name": "Repocket", "website": "repocket.com", "platforms": ["web", "ios", "android"],
       "links": [{"url": "https://apps.apple.com/app/repocket/id1234567890"}, {"url": "https://www.amazon.com/dp/B0EXAMPLE", "kind": "tv_app", "label": "Fire TV"}]}'
```

## Coming next

- Drafting a brand's context by reading its website.
