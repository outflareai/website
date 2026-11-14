---
title: Playbooks
description: Ready-made growth recipes that say what they need, run on your own accounts, and wait for your approval. Anyone can add one on GitHub.
sidebar:
  order: 4
---

<span class="pill shipped">Shipped</span> Playbooks in the web app, the REST API and the MCP server.

A **playbook** is a ready-made recipe for growth, such as welcoming new sign-ups, answering interested replies within the hour or getting named in AI answers. Each one says what data and connections it needs, the steps it takes with Outflare's tools, what it will never do, how you'll know it worked, and the prompt that runs it. Browse them all at [outflare.ai/playbooks](/playbooks/).

## What your workspace shows

**Playbooks** in the sidebar lists every playbook with whether your workspace is ready for it:

- **Ready**: every required connection and data source is in place.
- **Connect first**: a connection is missing. Only your own accounts count: Outflare never lends its keys, so the playbook won't start until you connect what it needs. It names the connectors that work, with a link to [Connectors](/docs/integrations/connectors/).
- **Needs data**: your workspace doesn't collect what the playbook reads yet (for example, no site added to SEO). It can still start, and the agent tells you what it found.

Open one to see what it needs, its steps and the API operations each step uses, what it won't do, how to tell it worked, and its prompt with your inputs filled in.

## A playbook's home in your brand

A playbook with a setup kit shows **In this brand** at the top once the kit is set up: every rule, journey, list and signal type it added, whether each is on, and what it has done. Above them are the [signals](/docs/guides/signals/) it raised: how many need attention, how many are late, and how many closed as won or not useful in the last 90 days, so you can tell whether the playbook earns its place. **Set it up now, without a run** adds the kit's parts as drafts straight from the page, so a playbook that is only rules and journeys needs no AI model.

## Your own playbooks

**New playbook** groups rules, journeys, smart lists and signal types your brand already has under a name of your own, such as "Save accounts that go quiet". It gets the same home as a ready-made playbook, so one page answers whether the whole motion works. A playbook owns none of its parts: a part can sit in several playbooks, and removing a playbook removes only the grouping, never a rule, journey, list or signal type. From the API it is `/v1/brands/{brand}/own-playbooks` (MCP `list_own_playbooks`, `create_own_playbook`, `update_own_playbook`, `delete_own_playbook`).

Playbooks for customer teams: **Flag renewals and quiet accounts for their owners** puts every company that goes quiet or comes up for renewal in Needs attention, and **Grow your share of each customer's spend** adds [share of wallet](/docs/guides/customer-records/#company-groups-and-share-of-wallet) fields and flags the healthy companies with the most room left.

## Run one

- **In Outflare:** fill in the blanks, choose a mode and press **Start**. Outflare's agent carries the playbook out in turns on your own [AI model](/docs/agents/ai-models/), as a [run](/docs/agents/actions/#outflares-agent-runs) you follow on the **Agents** page. The mode is your say on what it may do alone: **copilot** holds every change for you, **autonomous** runs changes within the budget you set, and **dry run** changes nothing and shows what it would have done.
- **From your own AI app:** copy the prompt into Claude, ChatGPT or Cursor with the [Outflare MCP server](/docs/agents/mcp/) connected. The agent can read the steps with `get_playbook`, and its changes go through [agent actions](/docs/agents/actions/).
- **From any agent or script:** call `POST /v1/workspaces/{ws}/playbooks/{id}/agent-runs` with `inputs` and a `mode`, or the MCP tool `run_playbook`. It answers with the run, or `409 connector_needed` while a required connection is missing.

Missions started from a playbook carry `playbook_id` and `playbook_version`, so you can compare results per playbook and version.

## Setup kits

Some playbooks need things set up before their first run, such as a pipeline in the CRM, fields on people and email drafts. Those playbooks come with a **setup kit**, so you don't build it by hand and every workspace gets the same fields, which reports and other playbooks can rely on.

When you open such a playbook, **What it sets up** lists each part of the kit:

- **Adds**: new to your workspace.
- **Extends**: an option list you made yourself gains the options it's missing.
- **Have**: already there and set up the same way.
- **Conflict**: you already have something under the same name, set up differently (for example a text field where the kit wants a number).

Tick **Set up what it needs when I start**, and the kit is added in the same step as the run. A kit only ever adds: nothing you already have changes, email drafts arrive unpublished so you read and publish them first, and while anything conflicts it changes nothing and tells you what's in the way. Setting it up again changes nothing.

The first kit, **Creator partnerships**, adds a Partnerships pipeline (Found, Vetted, Pitched, Negotiating, Agreed, Live, Measured, Renewed or Declined) with the creator, deal type, fee, deliverables, platform, go-live date, post, content rights, tracked link and promo code; creator fields on people (platforms, audience size, topics, rate card, past sponsors); and email drafts for the brief, a go-live reminder, thanks with first results, and an invite for customers who create. The creator playbooks use it.

Setting up a kit needs permission to manage the data catalog (`catalog.manage`), and to manage email (`emails.manage`) when it adds email drafts. Agents use the MCP tools `preview_kit` and `apply_kit`, or `apply_kit` on `start_playbook`.

## API

| Call | What it does |
| --- | --- |
| `GET /v1/playbooks` | Every playbook. Public, no key needed |
| `GET /v1/playbooks/{id}` | One playbook |
| `GET /v1/workspaces/{ws}/playbooks` | Playbooks with `readiness` and `runs` for your workspace (`missions.read`) |
| `GET /v1/workspaces/{ws}/playbooks/{id}` | One, with its readiness (`missions.read`) |
| `POST /v1/workspaces/{ws}/playbooks/{id}/runs` | Start one as a mission draft (`missions.run`); `apply_kit: true` also sets up its kit |
| `GET /v1/kits`, `GET /v1/kits/{id}` | Setup kits, with the playbooks that use each. Public, no key needed |
| `GET /v1/workspaces/{ws}/kits/{id}/preview` | What a kit would add, extend, reuse or conflict with (`customers.read`) |
| `POST /v1/workspaces/{ws}/kits/{id}/apply` | Set it up (`catalog.manage`, and `emails.manage` for email drafts). `409 conflict` names what's in the way |

## Write your own

Playbooks are open source (Apache-2.0): one `playbook.yaml` per folder in [`playbooks/`](https://github.com/outflareai/outflare/tree/main/playbooks#readme) in the Outflare repository, with optional setup kits in `playbooks/kits/`. Recommend the connectors you trust, including your own tool once it is a connector, and send a pull request. The checks make sure every step names a real API operation and every recommended connector exists; a maintainer reviews it. Once merged, it ships with the next deploy and shows on outflare.ai and in every workspace, with a Community badge and your GitHub handle.
