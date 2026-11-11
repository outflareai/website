---
title: Missions (retired)
description: Missions are retired. Agent actions and playbook runs replace them, and what your missions did stays readable.
sidebar:
  order: 9
---

<span class="pill">Retired</span> Missions are replaced by [agent actions](/docs/agents/actions/).

A mission was a goal an agent worked toward inside a plan you approved. Outflare now does the same job with less to set up:

| You used to | Now |
| --- | --- |
| Approve a mission's plan before an agent could change anything | Each agent's changes go through [agent actions](/docs/agents/actions/): what you allowed runs, the rest waits for you on the **Agents** page |
| Start a playbook as a mission | [Start it as a run](/docs/agents/playbooks/#run-one) of Outflare's agent, in copilot, autonomous or dry run mode |
| Set a mission's send and spend limits | Set daily limits and spend caps on [each agent's rules](/docs/agents/actions/#rules-for-an-agent) |
| Approve a mission's held changes | Approve them under **Agents → Waiting for you**, one at a time, in a batch or as a pattern |

## What still works

- **Your old missions stay readable.** Their goal, progress, every call and every held change are on the Missions page in the app, and over the API with `GET /v1/workspaces/{ws}/missions` and `GET /v1/workspaces/{ws}/missions/{id}` (and its `calls`, `actions` and `updates`). MCP has `list_missions`, `get_mission`, `list_mission_calls` and `list_mission_actions`.
- **Nothing changes a mission any more.** Creating, planning, approving, pausing or completing one, and any call sent with the `Outflare-Mission` header, answers `410 mission_retired`.
- **Tokens and roles keep working.** A token or role that could run missions can start runs of Outflare's agent.

## If your agent used missions

1. Turn on **Every change waits for you** for the app, or the action layer for its token ([how](/docs/agents/actions/#turn-it-on-for-an-agent)).
2. Stop sending the `Outflare-Mission` header.
3. Treat a `202` with an `action` as "waiting for a person", and read the action to follow it.
4. Send an `Outflare-Reason` header with each change so the person approving sees why.
