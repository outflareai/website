---
title: Open source and Cloud
description: What runs in the open-source engine, what Outflare Cloud adds, and how to tell which is which in these docs.
---

Outflare comes two ways: the open-source engine you run yourself, and Outflare Cloud, the hosted app at [app.outflare.ai](https://app.outflare.ai/). Both run the same engine.

## The line

**Tools are open source. Agents that keep working for you are Cloud.**

If a person does it or measures it, it's in the open-source engine. If it decides what to do next and acts on it, again and again, toward a target you set, it's in Outflare Cloud. Enterprise controls, the managed version of heavy work at large scale, and running the service itself are Cloud too. The full decision is [ADR 11](https://github.com/outflareai/outflare/blob/main/docs/adr/0011-open-core-line.md).

Two promises come with it:

- **Nothing moves back.** A feature in the open-source engine never becomes paid.
- **Bring your own keys, everywhere.** Neither the open-source engine nor Cloud lends you an API key or pays for your AI or data. Each workspace connects its own accounts, and you pay those providers directly. See [Connectors](/docs/integrations/connectors/).

## What you get

| | Open source | Outflare Cloud |
| --- | --- | --- |
| Every module in these docs: analytics, SEO, inbox, leads and lists, email campaigns, lifecycle email, social, customer records, outcomes and cost | Yes | Yes |
| Missions, the approval gate, send and spend limits, and the built-in agent | Yes | Yes |
| Teams, custom roles and brands | Yes | Yes |
| The API, SDKs, MCP server, CLI and every connector | Yes | Yes |
| Your data in your own Postgres | Yes | Hosted for you |
| Hosting and upgrades | You run them | Done for you |
| Sign up in the browser, nothing to install | | Yes |
| [PR autopilot](/docs/guides/pr-autopilot/): reactive PR for a brand every morning, with each quote, release and pitch approved by you | | Yes |
| Price | Free ([AGPL-3.0](/docs/project/license/)) | Free during early access |

Everything else these docs describe runs in both. Each Cloud-only feature has its own page, marked as below, and a row in this table.

## Coming to Cloud

These are on the way, and run only in Outflare Cloud:

- **More autopilots:** agents that keep working toward a target you set, like the [PR autopilot](/docs/guides/pr-autopilot/).
- **Enterprise controls:** single sign-on, SCIM, audit log export and approvals across teams.
- **Heavy work at scale:** AI visibility across many models, large site crawls and session replay.

Self-hosted and Cloud are both free for now; see [Pricing](/pricing/).

## How these docs mark Cloud-only features

A page for a feature that runs only in Outflare Cloud:

- has a **Cloud** badge next to its name in the sidebar;
- starts with <span class="pill cloud">Outflare Cloud</span>;
- says what the feature does for you and where to find it in the app.

## Which should I use?

- **Self-host** when your data must stay on your own servers, you want to read or change the code, or you already run Postgres and containers. Start with the [quickstart](/docs/quickstart/).
- **Use Outflare Cloud** when you'd rather not run servers. [Sign up](https://app.outflare.ai/signup) and connect your first tools in a few minutes.

Both serve the same API, so your scripts, agents and MCP setups work against either. [Pricing](/pricing/) has what each costs.
