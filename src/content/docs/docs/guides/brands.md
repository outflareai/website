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

Open **Settings → Brands → Add a brand** and give its name, website and where it ships (web, iOS, Android, TV and so on). Add its other domains on its page, such as an app or help site. A workspace without brands works exactly as before.

Also on its page, under **Links**, add everywhere else the brand lives: its App Store and Google Play listings, TV app stores, the Chrome Web Store, Steam, socials and docs. Paste the address and Outflare works out what it is (apps.apple.com is the App Store); add a label such as "Fire TV" where it helps. Agents read the links with the brand's context.

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

The brand picker under the workspace name in the sidebar narrows every page to one brand: projects, sequences, lead lists, mailboxes, domains, missions and analytics. The link keeps the choice (`?brand=repocket`), so a link you share opens on the same brand. With **All brands**, each record shows the brand it belongs to.

![Projects with All brands picked: each one shows its brand](/screens/brands-badges.png)

## Analytics by brand

Each site in your analytics tools, such as a GA4 property, a Search Console site or a PostHog project, counts as a brand's when its domain is one of the brand's domains. Subdomains count too, so app.repocket.com is Repocket's. For a site named after an app rather than a domain, pick its brand yourself (`PUT /v1/workspaces/{ws}/analytics/{id}/site-brand`), or mark it as shared.

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
| A brand's own context | `GET`/`PATCH /brands/{brand}/context` | `get_brand_context`, `update_brand_context` |
| Company and brand context together | `GET /context?brand=repocket` | `get_context` with `brand` |
| Move records in or out | `POST /brands/{brand}/add`, `/remove` | `add_to_brand`, `remove_from_brand` |
| Keep a member to some brands | `PATCH /members/{user}` with `brand_ids` | (people only, in the app or API) |
| A token for one brand | `POST /tokens` with `brand` | (in the app or API) |
| Analytics sites by brand | `GET /analytics/site-brands`, `PUT /analytics/{id}/site-brand` | `list_analytics_site_brands`, `set_analytics_site_brand` |

`{brand}` is the brand's handle (such as `repocket`) or its id. List endpoints take `?brand=` with a handle or id, `none` for shared records, or `all`. Set `OUTFLARE_BRAND` on the MCP server to make one brand its default.

```sh
curl -X POST https://app.outflare.ai/v1/workspaces/$WS/brands \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" \
  -d '{"name": "Repocket", "website": "repocket.com", "platforms": ["web", "ios", "android"],
       "links": [{"url": "https://apps.apple.com/app/repocket/id1234567890"}, {"url": "https://www.amazon.com/dp/B0EXAMPLE", "kind": "tv_app", "label": "Fire TV"}]}'
```

## Coming next

- A rule that stops two brands emailing the same person, and reports split by brand.
- Drafting a brand's context by reading its website.
