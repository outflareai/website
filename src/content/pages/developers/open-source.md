---
title: Open-source, self-hosted marketing platform · Outflare
description: "Outflare's engine is AGPL-3.0 and self-hosts with Docker Compose and Postgres; its SDKs are Apache-2.0. See what is open, what is Cloud and how to contribute."
h1: An open-source marketing platform you can run yourself.
label: Open source
lede: The whole Outflare engine, its web app, API and every module in the docs are open source under AGPL-3.0. Run it on your own server with Docker Compose and Postgres, read the code that decides what it sends, and add your own connector with a YAML file.
answer: Outflare is an open-source marketing platform. Its engine and web app are AGPL-3.0, and its SDKs and MCP server are Apache-2.0. You can self-host it for free with Docker Compose, as two containers (the engine and Postgres), or use Outflare Cloud at app.outflare.ai, which runs the same engine and is free during early access. Agents that keep working toward a target on their own, such as the PR autopilot, are Cloud only.
points:
  - "Engine and web app: AGPL-3.0; SDKs, MCP server and connectors: Apache-2.0"
  - Two containers to self-host, with Postgres the only dependency
  - Every module, the API, MCP and every connector are in the open engine
  - Nothing in the open engine ever moves to paid
docs:
  - label: Open source and Cloud
    href: /docs/project/open-source-and-cloud/
  - label: Self-hosting with Docker Compose
    href: /docs/self-hosting/docker-compose/
  - label: Open source and licensing
    href: /docs/project/license/
  - label: Contributing
    href: /docs/project/contributing/
  - label: Build a connector
    href: /docs/integrations/build-a-connector/
  - label: How it works
    href: /docs/concepts/architecture/
faqs:
  - q: Is Outflare really open source?
    a: Yes. The engine, web app, API spec and deploy files are AGPL-3.0, and the SDKs, MCP server and connectors in integrations/ are Apache-2.0. The source is published at github.com/outflareai/outflare.
  - q: Is self-hosting free?
    a: Yes. There is no per-seat or per-mailbox price when you self-host. You pay only for your own server and for the third-party accounts you connect, such as your AI model or SEO data provider.
  - q: What do I need to self-host Outflare?
    a: A Linux server with Docker and the Compose plugin; 1 vCPU and 1 GB of RAM is enough to start. The stack is two containers, the Outflare engine and Postgres 16, plus HTTPS in front if anyone other than you will use it.
  - q: What is only in Outflare Cloud?
    a: Agents that keep working toward a target on their own (the PR autopilot, the Lead finder, Support assistant Auto and Paid ads Autopilot), plus hosting and sign-up in the browser. Every module, the API, MCP, the CLI and every connector are in the open-source engine too.
  - q: Can I use Outflare inside my company without publishing my changes?
    a: Yes. Running it for your own team, modified or not, creates no obligation. The AGPL applies when you offer a modified version to other people over a network; then you share the source of your changes with them.
  - q: Does a self-hosted server send data to Outflare?
    a: Release images send one small anonymous report a day, which also checks for updates and security fixes. One setting turns it off, and a build from source sends nothing unless it is given a stats server.
related:
  - /developers/api/
  - /developers/sdk/
  - /best/open-source-crm/
  - /product/customer-data/
  - /best/ai-marketing-agents/
  - /solutions/founders/
updated: 2026-11-09
order: 30
---

## What is open and what is Cloud

Outflare comes two ways: the open-source engine you run yourself, and Outflare Cloud at [app.outflare.ai](https://app.outflare.ai/). Both run the same engine. The line is simple: **tools are open source; agents that keep working for you are Cloud.** If a person does it or measures it, it is in the open engine. If it decides what to do next and acts on it, again and again, toward a target you set, it is in Cloud.

| | Open source | Outflare Cloud |
| --- | --- | --- |
| Every module: analytics, SEO, inbox, leads, email campaigns, lifecycle email, social, customer records, outcomes | Yes | Yes |
| Missions, the approval gate, send and spend limits, the built-in agent | Yes | Yes |
| Teams, custom roles and brands | Yes | Yes |
| The API, SDKs, MCP server, CLI and every connector | Yes | Yes |
| Your data | In your own Postgres | Hosted for you |
| Hosting and upgrades | You run them | Done for you |
| PR autopilot, Lead finder, Support assistant Auto, Paid ads Autopilot | | Yes |
| Price | Free (AGPL-3.0) | Free during early access |

Two promises come with it. A feature in the open-source engine never becomes paid. And neither edition lends you an API key: every workspace connects its own AI, data and email accounts and pays those providers directly. The full table is on [Open source and Cloud](/docs/project/open-source-and-cloud/).

## The licences

| Part | Licence | What it means |
| --- | --- | --- |
| Engine, web app, API spec, deploy files | AGPL-3.0 | Use, self-host and change it freely. If you run a modified version as a service for others, publish your changes. |
| [TypeScript and Python SDKs](/developers/sdk/), MCP server | Apache-2.0 | Embed them in anything, closed-source included. |
| Connectors in `integrations/` | Apache-2.0 | Copy and adapt them freely. |
| The website and docs | Apache-2.0 | Reuse the docs and examples. |

Building a closed-source product that talks to Outflare through the [API](/developers/api/) or an SDK doesn't bring your code under the AGPL. See [Open source and licensing](/docs/project/license/); it is a summary, not legal advice.

## Self-host with Docker Compose

The repository ships `deploy/docker-compose.yml` with two services: `postgres` (Postgres 16) and `engine` (the Outflare binary with the built web app). That is the whole stack. There is no Redis: Postgres is also the job queue.

```sh
git clone https://github.com/outflareai/outflare
cd outflare
cp deploy/.env.example deploy/.env
echo "OUTFLARE_SECRET_KEY=$(openssl rand -base64 32)" >> deploy/.env
# edit deploy/.env: set a strong POSTGRES_PASSWORD
docker compose -f deploy/docker-compose.yml up -d
```

Open `http://your-server:8080`; the first visit creates the owner account and first workspace. Then put HTTPS in front (a two-line Caddy file does it), back up the database together with `OUTFLARE_SECRET_KEY`, and upgrade with `git pull` and `docker compose up -d --build`. Migrations run when the engine starts and only add to the schema. Each release will also ship a bundle that pulls a published image for amd64 and arm64; no version has been released yet, so install from the repository for now. The steps are in [Self-hosting with Docker Compose](/docs/self-hosting/docker-compose/).

Release images send one anonymous report a day, which also checks for updates. It is described field by field in [Usage stats and update checks](/docs/self-hosting/telemetry/), and one setting turns it off.

## Why open source for marketing

Marketing tools hold some of a company's most sensitive data: mailbox credentials, every prospect you contacted and every reply.

- **You own the data.** It lives in your Postgres. Query it, back it up, move it.
- **You can read the send path.** The code that decides whether an email goes out, the [policy check](/docs/concepts/policy-check/), is there to read.
- **No lock-in.** If the project goes somewhere you don't like, fork it.
- **Agents are first-class.** The app uses the same public API your scripts and [AI agents](/product/agents/) do.

## Build a connector with a YAML manifest

Anyone can add their service to Outflare without writing Go. A connector is a folder in `integrations/connectors/<id>/` with a `manifest.yaml` describing your API, a `logo.svg`, and a `tests.yaml` of recorded answers that prove the manifest works. Outflare reads the manifest and makes the calls itself: templates only fill in values such as `{{api_key}}`, answers are read with dotted paths, and every connection uses the workspace's own key.

Today a manifest can add an **email verification** service (the `verify` capability). Enrichment, email finding and notifications are planned; other kinds of connectors are built into the engine by its maintainers for now. Once merged, a connector shows on every workspace's Connectors page, in `GET /v1/connectors`, for agents over MCP, and with a **Verified** or **Community** badge that says who built it. See [Build a connector](/docs/integrations/build-a-connector/).

## Contributing

The engine is published at [outflareai/outflare](https://github.com/outflareai/outflare). Bug reports, ideas, connectors, docs fixes and code are welcome.

1. Open an issue for anything larger than a small fix, so the approach is agreed first.
2. Read `AGENTS.md` in the repository, the conventions guide for people and coding agents alike, and set up a [development environment](/docs/self-hosting/development/).
3. Open a pull request. Maintainers work in a private repository and publish each release as one commit, so a maintainer brings your change in with you credited as its author, and it ships in the next release.

Contributions need the Contributor License Agreement: you keep your copyright, and a bot asks you to sign with one sentence on your first pull request. See [Contributing](/docs/project/contributing/).

## What it doesn't include

- No hosted AI, data or sending. Self-hosted or Cloud, you connect your own accounts.
- No agency accounts or white label. A workspace is one company, which can have several [brands](/product/brands/).
