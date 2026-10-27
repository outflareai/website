---
title: Playbooks
description: Ready-made growth recipes that say what they need, run as a mission on your own accounts, and wait for your approval. Anyone can add one on GitHub.
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

## Run one

- **In Outflare:** fill in the blanks and press **Start as a mission**. You get a [mission](/docs/agents/missions/) draft named after the playbook, with the prompt and guardrails as its instructions and the steps as its plan. Nothing runs until you approve it, and its mode decides whether changes are dry runs, wait for your approval or run within limits.
- **From your own AI app:** copy the prompt into Claude, ChatGPT or Cursor with the [Outflare MCP server](/docs/agents/mcp/) connected. The agent can read the steps with `get_playbook`.
- **From any agent or script:** call `POST /v1/workspaces/{ws}/playbooks/{id}/runs` with `inputs`, or the MCP tool `start_playbook`. It answers with the mission, or `409 connector_needed` while a required connection is missing.

Missions started from a playbook carry `playbook_id` and `playbook_version`, so you can compare results per playbook and version.

## API

| Call | What it does |
| --- | --- |
| `GET /v1/playbooks` | Every playbook. Public, no key needed |
| `GET /v1/playbooks/{id}` | One playbook |
| `GET /v1/workspaces/{ws}/playbooks` | Playbooks with `readiness` and `runs` for your workspace (`missions.read`) |
| `GET /v1/workspaces/{ws}/playbooks/{id}` | One, with its readiness (`missions.read`) |
| `POST /v1/workspaces/{ws}/playbooks/{id}/runs` | Start one as a mission draft (`missions.run`) |

## Write your own

Playbooks are open source (Apache-2.0): one `playbook.yaml` per folder in [`playbooks/`](https://github.com/outflareai/outflare/tree/main/playbooks#readme) in the Outflare repository. Recommend the connectors you trust, including your own tool once it is a connector, and send a pull request. The checks make sure every step names a real API operation and every recommended connector exists; a maintainer reviews it. Once merged, it ships with the next deploy and shows on outflare.ai and in every workspace, with a Community badge and your GitHub handle.
