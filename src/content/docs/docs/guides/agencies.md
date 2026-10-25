---
title: Agencies
description: Run outbound for many clients from one login and one agent, with a workspace per client, an agency team, agency-wide tokens and white label.
sidebar:
  order: 12
---

<span class="pill shipped">Shipped</span>

An agency runs outbound for many clients from one login. Create one on the **Agency** page (or `POST /v1/agencies`). Each client gets its own workspace, with its own mailboxes, leads, sequences and inbox, so nothing mixes between clients. You can bring in workspaces you already own as clients when you create the agency.

## Clients

**Add a client** on the Clients tab (`POST /v1/agencies/{ag}/clients`) to create a new client workspace. The Clients tab shows every client at a glance for the last 7 days: active and paused mailboxes, live sequences, sends, reply and bounce rates, and replies waiting. The worst bounce rate is listed first, so problems stand out.

Taking a client out of the agency (`DELETE /v1/agencies/{ag}/clients/{ws}`) keeps all its data. If nobody owned the workspace directly, the person removing it becomes its owner.

## Your team

People you add on the Team tab get their agency role (owner, admin, operator or viewer) in every client workspace. If someone also has a higher role directly in one workspace, the higher role wins. Invite a client's own staff to just their workspace from that workspace's Members page. An agency always keeps at least one owner.

## One agent for every client

An **agency token** (`ofa_…`, on the Agent tokens tab) works in every client workspace with the scopes you give it. Its scopes can't go beyond your own agency role. Allow it to create clients and an agent can onboard a new client on its own.

Run the [MCP server](/docs/agents/mcp/) with `OUTFLARE_AGENCY` instead of `OUTFLARE_WORKSPACE`, and the agent gets three more tools: `list_clients`, `use_client` to switch between clients, and `create_client`.

```sh
claude mcp add outflare \
  -e OUTFLARE_URL=https://outflare.example.com \
  -e OUTFLARE_TOKEN=ofa_... \
  -e OUTFLARE_AGENCY=<agency id> \
  -- node /path/to/outflare/mcp/dist/index.js
```

## White label

On the Branding tab, set a brand name, a logo (an `https` URL), an accent colour and a support email. They replace Outflare in every client workspace, and are returned as `brand` on each client workspace and in `/v1/me`.

## Agency log

Changes to clients, the team, tokens and branding are recorded at `GET /v1/agencies/{ag}/events` and on the Log tab. Changes inside a client workspace stay in that workspace's audit log.
