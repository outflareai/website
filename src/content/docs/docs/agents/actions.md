---
title: Agent actions
description: Decide what each agent may change on its own, approve the rest one at a time or as a pattern, and see every change an agent made.
sidebar:
  order: 3
---

<span class="pill shipped">Shipped</span> Agent actions in the web app, the REST API and the MCP server.

Every change an agent makes in your workspace is an **action**. You decide what each agent may change on its own, everything else waits for you, and every change is kept: what it was, why the agent made it, and who approved it. It works the same for any agent: Claude or ChatGPT connected over [MCP](/docs/agents/mcp/), a script with an API token, or Outflare's own agent running a [playbook](/docs/agents/playbooks/).

Agent actions replace [missions](/docs/agents/missions/), which are retired.

## The Agents page

**Agents** in the sidebar has three views for the brand you picked:

- **Waiting for you**: changes held until you approve or reject them. Each card leads with the question the agent is asking, then its reason and exactly what will run.
- **Everything**: every change your agents made, what ran, what failed and what was refused.
- **What agents may do**: each agent's rules, which you set.

**Runs** lists the playbooks Outflare's agent is carrying out. Changes about no brand, such as invites and connections, are under **Settings → Team activity**.

## Turn it on for an agent

- **An app you connect** ([Connect Claude, ChatGPT or Cursor](/docs/agents/connect/)) starts with **Every change waits for you** switched on.
- **An API token**: tick **It's an agent: send its changes through the action layer** when you create or edit it, or set `action_gate`:

```sh
curl -X POST "$OUTFLARE_URL/v1/workspaces/$WS/api-tokens" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"name": "Growth agent", "scopes": ["sequences.read", "sequences.manage"], "action_gate": true}'
```

From then on the token reads as before, and each change it makes is an action. Only a signed-in person can turn this off for a token.

## What happens to a change

| Your rules say | The agent gets | What happens |
| --- | --- | --- |
| **Run** | The normal answer | It runs, and is kept as a change that ran (or failed) |
| **Hold**, or nothing matches | `202` with the held `action` | Nothing changes until a person approves it |
| **Refuse** | `403 action_refused` | Nothing changes |

A new agent has no rules, so it starts out asking for everything.

**Always a person.** These wait for a person whatever the rules say: mailboxes, sending servers, senders, sign-ins, API tokens, webhooks, connections, email providers, the suppression list, company context, one-off emails, and the fixes that [fix autonomy](/docs/guides/fix-autonomy/) holds. Every email still passes the [policy check](/docs/concepts/policy-check/).

## Rules for an agent

A rule (a **grant** in the API) says what happens to one agent's changes that match it. Only a signed-in person who may manage agent actions sets them, on **Agents → What agents may do** or with the API:

```sh
# Let the agent create sequences on its own, at most 5 a day.
curl -X POST "$OUTFLARE_URL/v1/workspaces/$WS/action-grants" \
  -H "Cookie: outflare_session=..." -H "Content-Type: application/json" \
  -d '{"token_id": "'$AGENT'", "method": "POST", "path": "brands/*/sequences", "mode": "run", "daily_limit": 5}'

# Never let it delete one.
curl -X POST "$OUTFLARE_URL/v1/workspaces/$WS/action-grants" \
  -H "Cookie: outflare_session=..." -H "Content-Type: application/json" \
  -d '{"token_id": "'$AGENT'", "method": "DELETE", "path": "brands/*/sequences/*", "mode": "refuse"}'
```

- **path** is the route after `/v1/workspaces/{ws}/` for a workspace route (`api-tokens`), or starting at `brands/*/` for a brand route (`brands/*/sequences`). `*` matches one segment and a trailing `**` everything under it; `**` alone is everything.
- **method** is `POST`, `PUT`, `PATCH` or `DELETE`, or left out for any.
- **mode** is `run`, `hold` or `refuse`.
- **daily_limit** is the most changes a rule runs in a day (UTC). The rest wait for you.
- **daily_spend_cents**, **monthly_spend_cents** and **total_spend_cents** cap what the changes spend on your own accounts. Once the next change would pass the cap, it waits for you.

When several rules match, the most specific decides, and on a tie the stricter one wins. `GET .../action-grants` lists them and `DELETE .../action-grants/{id}` removes one.

[Paid ads](/docs/integrations/paid-media/) have rules of their own on top: raising a campaign's daily budget by more than a fifth always waits for a person, and a pause always runs.

## Approve a pattern once

When you approve a held change you can choose **Approve and remember**: changes that match the same fields run from then on, and anything outside the pattern still waits. Over the API, add `remember` to the approval:

```sh
curl -X POST "$OUTFLARE_URL/v1/brands/$BRAND/actions/$ACTION/approve" \
  -H "Cookie: outflare_session=..." -H "Content-Type: application/json" \
  -d '{"note": "Good", "remember": {"fields": ["template_id"], "daily_limit": 20}}'
```

A pattern never lets through a change that always needs a person.

## Decide

- **One at a time:** `POST /v1/brands/{brand}/actions/{id}/approve` runs the change as the agent, through every check again, and answers with the result. `POST .../actions/{id}/reject` with a `note` turns it down.
- **A batch:** `POST /v1/brands/{brand}/actions/decide` with `{"approve": [...], "reject": [...], "note": "..."}`, up to 100 at once.
- **The inbox over the API:** `GET /v1/brands/{brand}/actions?status=held`.

An agent never approves a change, its own or another agent's. A held change nobody decides within 30 days expires.

Agents: send an `Outflare-Reason` header with each change, written as the yes or no question a person answers, then why. The card shows it.

## Outflare's agent: runs

Start a [playbook](/docs/agents/playbooks/) and Outflare's own agent carries it out in turns, on your own [AI model](/docs/agents/ai-models/). You choose how much it may do on its own:

| Mode | What it does |
| --- | --- |
| **Copilot** (the default) | Every change waits for you |
| **Autonomous** | Changes run within the budget you set. Changes that always need a person still wait |
| **Dry run** | Nothing changes. You see what it would have done |

Open a run under **Agents → Runs** to read what each turn did, decide its held changes, write to it, and pause, resume or stop it. Over the API: `POST /v1/workspaces/{ws}/playbooks/{id}/agent-runs` starts one, `GET /v1/brands/{brand}/agent-runs` lists them, and `POST .../agent-runs/{id}/updates` writes to one. A run that can't carry on (no AI model connected, or three failed turns) pauses and says why.

## Permissions and webhooks

| Scope | Lets you |
| --- | --- |
| `actions.read` | See every agent change and the rules |
| `actions.approve` | Approve and reject held changes |
| `actions.manage` | Set and remove rules (a signed-in person only) |
| `agents.read`, `agents.run` | See and start runs of Outflare's agent |

`action.held`, `action.approved` and `action.rejected` can be sent to [webhooks](/docs/api/webhooks/), so a chat tool can tell you when something waits.
