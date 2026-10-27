---
title: Brand setup
description: "One checklist per brand: the website script, every DNS record in one go, then analytics, Search Console, email, payments, ads, social and a CRM. One click where it can be, and you can stop and pick up again any time."
sidebar:
  order: 1.5
---

<span class="pill shipped">Shipped</span> In the web app, the REST API and the MCP server.

Each [brand](/docs/guides/brands/) has its own setup checklist under **Company → Brand setup**. It goes in order, starting with what every brand needs and ending with the tools fewer brands use. Leave whenever you like: Home shows **Continue setting up Acme · 3 of 9** until every step is done or you close it, and you pick up where you left off.

A step is done when the workspace has it, however it got there. Connect Stripe on the Connectors page, or ask Claude to do it over MCP, and the payments step ticks off here too.

## The steps

1. **Add the website script.** One line on every page that records visits, sign-ups and where they came from ([website tracking](/docs/guides/website-tracking/)). Ticks off when the first visit arrives.
2. **Add your DNS records.** Every record the brand needs on its domain, in one list and added in one go: the one that proves the site is yours, so Outflare can [audit every page](/docs/guides/site-audits/), plus your sending domains' and tracking domain's records once you set those up. Outflare checks for them every minute for the first 15 minutes, then every hour for three days.
3. **Connect your analytics**, such as Google Analytics, PostHog or Plausible, so reports start with your history.
4. **Connect Search Console** (or Bing Webmaster Tools) for what people search to find you.
5. **Set up email** with your own sending provider.
6. **Connect payments**, so each channel shows the revenue it brings.
7. **Connect your ad accounts.**
8. **Connect your social accounts.**
9. **Connect your CRM.**

Any step can be left for later (**Do this later**) and brought back. Nothing else depends on it.

## Every way to do it

The first two steps change your website, so each offers every way to get it done, quickest first:

- **One click with your own tools.** Sign in with the Google account that runs your Google Tag Manager container, pick the container, and Outflare adds one Custom HTML tag named "Outflare" on all pages and publishes it. It works in a Tag Manager workspace of its own, so nobody else's unpublished changes go live with it, and it never edits your other tags. Untick **Publish it now** to review the change in Tag Manager first. For verification, connect the Cloudflare account your domain is on and Outflare adds the TXT record. It only ever adds records, each with the comment "Added by Outflare"; it never changes or deletes one.
- **Send to a developer.** A ready message with the snippet or DNS record and what to do with it, to copy or open in your own email.
- **Ask your AI coding tool.** A prompt for Claude Code, Cursor, Lovable or whichever tool edits your site. It says where the tag goes in common frameworks and site builders. Copy it, or open it straight in Claude or ChatGPT.
- **Do it myself.** The snippet, or the DNS record, meta tag and file, to add by hand.

Tag Manager and Cloudflare are your own accounts, connected to your workspace like any other [connector](/docs/integrations/connectors/). Outflare never uses an account of its own for them. A Cloudflare API token made from the "Edit zone DNS" template works as well as signing in.

## Your DNS records in one go

DNS is the fiddly part, so the brand's records are batched into one step instead of one per feature. The list shows each group, what it's for and which records are already in place:

- **Website ownership:** a TXT record on the brand's domain.
- **Sending email:** the records each of the brand's sending domains needs to send.
- **Tracking links:** the CNAME for a tracking domain on the brand's domain.

**Add them all** adds every missing record at once. With your own Cloudflare connected it's one request; at a DNS provider that supports Domain Connect, you approve one group, come back and the next one opens by itself. The other tabs give a developer message, an AI coding tool prompt, or the records to add by hand, all for the whole list.

## When something goes out of date

Outflare is new and moves fast: the website script gets new versions, API operations are replaced and connections expire. Install health watches what you have installed and tells you when something needs you:

| Problem | When |
| --- | --- |
| Website script missing | A site key that has never sent a visit, a day after it was made |
| Website script silent | A site that sent visits but none for two days |
| Website script outdated | Pages still running an older copy of the script than the one Outflare serves |
| Site not verified | A site whose DNS record hasn't been found |
| Connection broken | A connected tool that needs signing in again |
| Client outdated | The SDK, CLI or MCP server you use is older than the version Outflare supports (critical) or the latest one (warning) |
| Deprecated API call | Your code still calls an operation marked deprecated |

Problems show at the top of the brand's setup page with a **Fix** button, and on Home under **Needs you**. Outflare clears each one when it's fixed.

## For agents and the API

- `GET /v1/workspaces/{ws}/brands/{brand}/setup` (MCP `get_brand_setup`): the steps, each `todo`, `waiting`, `done` or `skipped`, with `next_step`. The two install steps carry `install`: the snippet or DNS record, `ai_prompt`, the `developer` message and the brand's Tag Manager or Cloudflare connections.
- `PATCH .../setup` (`update_brand_setup`): skip or bring back steps, or close the checklist.
- `POST .../setup/prepare` (`prepare_brand_setup`): make the brand's site key or add its site, so the step has something to install.
- `POST .../setup/install` (`install_brand_setup`): the one-click install, queued. `GET .../setup/tag-containers` (`list_tag_containers`) lists the containers to pick from.
- `POST .../setup/check` (`check_brand_setup`): look for the DNS record now.
- `GET /v1/workspaces/{ws}/brands/{brand}/dns` (`get_brand_dns`): every DNS record the brand needs, grouped, each `in_place` or `missing`, with the developer message and AI prompt for the whole list.
- `POST .../brands/{brand}/dns` (`add_brand_dns`): add every missing record through one of the workspace's Cloudflare connections, queued. Answers `409 nothing_to_add` when nothing is missing.
- `GET /v1/workspaces/{ws}/install-health` (`get_install_health`): every problem above, worst first, each with the tool or page that fixes it. They also appear in `GET /status` as `install_broken` and `install_outdated`, and as the `install.issue_opened` and `install.issue_resolved` [webhooks](/docs/api/webhooks/).
