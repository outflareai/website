---
title: Missions
description: Give an agent a goal inside a project, with a brief, a mode, limits and approvals, and see every call it makes.
sidebar:
  order: 3
---

<span class="pill shipped">Shipped</span> Missions in the REST API, the MCP server and the web app.

A **mission** is a goal an agent works toward inside a [project](/docs/guides/projects/), such as "book 10 meetings with fintech CFOs in Australia by 30 November". Type the goal in plain words and the AI model you chose drafts the plan, or let your own agent start one. Either way the agent reads the project's brief, rehearses, sends you its plan, and works within the mode and limits you approve. You see every call it made and why, approve or reject its changes, answer its questions, and pause or stop it at any time, from the dashboard or over the API.

![The Missions list: status, how changes run, progress toward the goal, and what needs you](/screens/missions-list.png)

## Start from a goal

You don't need an agent of your own. Connect an [AI model](/docs/agents/ai-models/) (Claude, OpenAI, Gemini, Mistral, xAI, or a router such as OpenRouter) with your own API key; usage is billed by the provider, to your account. Then type the goal in the box at the top of the Missions page, which says which model it uses.

![The goal box on the Missions page](/screens/goal-box.png)

The model drafts the mission from a summary of your workspace: mailbox counts and capacity, lead and suppression counts, sequence names, the project brief and which connectors are connected. **Lead lists, email addresses and credentials are never sent.** The draft holds a name, a goal to track, the steps, instructions, email and spend limits, an end date, the connectors it needs (as connect requests) and its questions. It is saved waiting for your approval, so nothing runs yet.

![A planned mission: its question and the connector it needs, waiting for approval](/screens/planned-mission.png)

Over the API it is one call, and over MCP the `plan_mission` tool:

```sh
curl -X POST "$OUTFLARE_URL/v1/workspaces/$WS/missions/plan" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"goal": "Book 10 meetings with fintech CFOs in Australia by 30 November"}'
```

Without an AI model connected, it answers `409` with `connector_needed`; with no model picked, `ai_model_needed`; past the workspace's monthly AI limit, `ai_budget_reached`.

## Who runs it

When you approve a mission, choose who carries it out.

![Approving: who runs it, and how its changes run](/screens/approve-runner.png)

- **Outflare's agent** (`"runner": "builtin"`). Your chosen AI model carries out the plan with your key, in turns. It gets an API token of its own: operator scopes, never more than yours, and never `missions.approve`. It goes through the same gate as any agent, so the mode below still decides whether its changes run, wait for you or are dry runs. Even in autonomous mode, changes that could send data out or change where mail goes (email replies, mailboxes, senders, webhooks, connectors, tokens and so on) wait for you, because the agent reads text from outside your workspace. See [how the agent is kept on course](/docs/agents/ai-models/#how-the-agent-is-kept-on-course). A turn runs straight away, whenever you write to the mission or decide on a held change, and when the agent asks to look again (15 minutes to a day). Each turn's cost is recorded in the mission's spend. If the model is disconnected or its key stops working, the mission's spend limit or the workspace's monthly AI limit is reached, the model declines, or three turns fail in a row, the mission pauses and says why.
- **Your own agent** (`"runner": "external"`), such as Claude Code over MCP or a script. It acts by sending the mission header, as below.

![A mission run by Outflare's agent after its first turn: a held sequence, its progress note, and when it looks again](/screens/builtin-agent.png)

## How a mission runs

1. **The mission is created**, by Outflare from your goal or by your agent. It starts as a draft or waiting for approval. Nothing it changes in a draft runs: every write is a dry run.
2. **It reads the brief and rehearses.** `GET /v1/workspaces/{ws}/missions/{id}` returns the mission, the project brief, the limits, progress, open requests and your latest notes.
3. **It asks for the tools it needs.** If it needs an email verifier or a data provider that isn't connected, it posts a connect request. You connect it (paste the key or sign in), or press **Send a link** to get a one-time link for whoever holds the key; they don't need an Outflare account. The request closes by itself once the tool is connected, and Outflare's agent carries on straight away. If the tool is already connected, the request is refused with `already_connected`, so an agent never asks twice.
4. **It submits its plan.** You approve it and choose how its changes run.
5. **It works**, posting progress and questions. Your messages reach it at its next check-in.
6. **It finishes** with a report. Its sequences are paused.

## How changes run

An agent acts inside a mission by adding one header to its ordinary API calls:

```http
Outflare-Mission: 27f975ce-56ff-4631-9352-a152480d08fa
Outflare-Reason: Create the approved sequence
```

Apps connected through [Connect your AI](/docs/agents/connect/) make changes only this way, unless you turn off **Only inside missions** for the app: a write without the header is refused with `403 mission_required`.

Every call is logged against the mission. Reads always run. What happens to a write depends on the mission:

| Mission | A write |
| --- | --- |
| Draft, or waiting for approval | **Dry run.** Recorded, never run. The answer is `202` with the recorded change. |
| Running, **Dry run** mode | Dry run. |
| Running, **Approve each change** mode | **Held.** The answer is `202`; the change waits until someone approves it, then runs as the agent. |
| Running, **Autonomous** mode | **Runs**, within the mission's limits and the token's own limits. |
| Paused | Refused. Reads still work, and its sequences stop sending. |
| Completed, stopped or failed | Every call in the mission is refused. |

A held or dry-run write answers like this:

```json
{
  "mission_action": { "id": "…", "summary": "Create sequence", "status": "pending" },
  "approval_required": true,
  "dry_run": false,
  "message": "Held for approval: a person must approve this before it runs."
}
```

The agent polls `GET .../missions/{id}/actions/{action_id}` for the decision, your note and, once it ran, the response.

Approving a change runs the stored request through every normal check at that moment: scopes, the send policy, token limits and the audit log. Dry runs can be approved the same way once the mission is running, so a rehearsal becomes the real thing in one click.

## Limits

A mission's limits apply on top of the agent token's [sending limits](/docs/guides/mailbox-allocation/#agents):

- **Email limit**: every sequence the agent creates in the mission counts, and sending stops at the limit (`mission_send_limit` in the send log).
- **Spend limit**: paid connector calls, and Outflare's agent's turns, are checked against the spend recorded for the mission before they run.
- **Ends on**: the mission completes itself at that time.

Changing the mode or limits of an approved mission needs the `missions.approve` scope.

## Who can approve

| Scope | Allows |
| --- | --- |
| `missions.read` | Read missions, their calls, held changes and updates |
| `missions.run` | Create missions, act inside them, post updates, submit plans, pause, stop and complete |
| `missions.approve` | Approve missions and held changes, resume, and change limits |

Owners, admins and operators have all three; viewers can read. **An agent can never approve its own mission or its own changes**, even with `missions.approve`: approving must come from a person or from a separate approver token, such as a Slack bot you run.

## In the web app

The mission page shows what the agent is doing now: whether changes run, wait or are dry runs; progress toward the goal; and a **Needs you** box with its plan, questions, connect requests and held changes, each with what it will send.

![A running mission: a question from the agent, a connect request and a held change waiting for approval](/screens/mission-detail.png)

**Calls** lists every API call in the mission with its result (ran, dry run, held, refused), status and the reason the agent gave. What a change did is in the audit log under the same request id.

![Every call the agent made, and why](/screens/mission-calls.png)

## Over MCP

The [MCP server](/docs/agents/mcp/) has a tool for each step: `plan_mission` (from a goal), `create_mission`, `use_mission` (from then on every call carries the mission), `get_mission`, `request_connector`, `submit_mission_plan`, `post_mission_update`, `get_mission_action`, `pause_mission`, `stop_mission` and `complete_mission`, plus `approve_mission`, `resume_mission` and `decide_mission_action` for approver tokens. Set `OUTFLARE_MISSION` to start the server inside a mission.

When you create the agent's token, choose **Can make changes**: it includes `missions.read` and `missions.run`, never `missions.approve`.

## API

| Endpoint | What |
| --- | --- |
| `GET`, `POST /v1/workspaces/{ws}/missions` | List and create |
| `GET`, `PATCH .../missions/{id}` | Check in (with the brief and notes); change |
| `POST /v1/workspaces/{ws}/missions/plan` | Draft a mission from a goal with your AI model |
| `POST .../missions/{id}/submit`, `/approve` | Send the plan; approve and choose the mode and who runs it |
| `POST .../missions/{id}/pause`, `/resume`, `/stop`, `/complete` | Control it; finish with a report |
| `GET .../missions/{id}/calls` | Every call, newest first |
| `GET .../missions/{id}/actions`, `.../actions/{action}` | Held and dry-run changes |
| `POST .../actions/{action}/approve`, `/reject` | Decide on a change |
| `GET`, `POST .../missions/{id}/updates` | Notes, questions, instructions and connect requests |
| `POST .../updates/{update}/resolve` | Close a connect request you've decided not to connect (it closes by itself once connected) |
| `GET /v1/workspaces/{ws}/mission-actions` | Every change waiting for approval |

See the [endpoint reference](/docs/api/reference/) for the fields.
