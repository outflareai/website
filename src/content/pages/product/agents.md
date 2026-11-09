---
title: AI marketing agent with approvals and limits · Outflare
description: An open-source AI marketing agent that works toward a goal on your own accounts, with your AI key, inside limits you set and approvals you choose.
h1: An AI marketing agent that works inside your limits.
label: Agents and missions
lede: Type a goal in plain words. Your own AI model drafts the plan, reads what Outflare knows about your company, and carries it out in your workspace, with every call logged and every risky change held for you.
answer: Outflare is an open-source AI marketing agent. You give it a goal, such as "book 10 meetings with fintech CFOs in Australia by 30 November", and the AI model you connect with your own key drafts a mission plan. Once you approve it, the agent works through the same API as a person, inside the mission's email and spend limits, and you choose whether its changes are dry runs, wait for your approval or run on their own.
points:
  - Runs on your own Claude, OpenAI, Gemini, Mistral, xAI or DeepSeek key, or a router
  - Three modes, dry run, approve each change, or autonomous
  - Remembers your company and brands for every agent and chat
  - Ready-made playbooks, open source under Apache-2.0
docs:
  - label: Missions
    href: /docs/agents/missions/
  - label: AI models
    href: /docs/agents/ai-models/
  - label: Memory and status
    href: /docs/agents/memory/
  - label: Playbooks
    href: /docs/agents/playbooks/
faqs:
  - q: What is an AI marketing agent?
    a: It is software that takes a marketing goal, plans the steps and carries them out with real tools, such as building a lead list, writing a sequence or checking what blocks your outreach. In Outflare the agent works through the same API and limits as a person, and every call it makes is logged with the reason it gave.
  - q: Do I need my own AI key?
    a: For Outflare's built-in agent, yes. Each workspace connects its own Claude, OpenAI, Gemini, Mistral, xAI or DeepSeek key, or a router such as OpenRouter, and the provider bills that account. Outflare never supplies or pays for an AI key. If you run Outflare from Claude, ChatGPT or Cursor over MCP instead, no key is needed in Outflare.
  - q: Can the agent send email or spend money without me?
    a: Only within the mode and limits you approve. Every email still passes the policy check, a mission has its own email and spend limits, and changes that could send data out or change where mail goes, such as email replies, mailboxes, webhooks or connectors, wait for a person even in autonomous mode.
  - q: Can an agent approve its own work?
    a: No. An agent can never approve its own mission or its own changes. Approval comes from a person, or from a separate approver token such as a Slack bot you run.
  - q: Is the agent open source?
    a: Yes. Missions, the approval gate, send and spend limits and the built-in agent are in the open-source engine (AGPL-3.0) and in Outflare Cloud. Autopilots that keep working toward a target on their own, such as the PR autopilot, are Outflare Cloud features.
related:
  - /product/mcp/
  - /glossary/agentic-marketing/
  - /best/ai-marketing-agents/
  - /solutions/founders/
  - /solutions/marketing-teams/
  - /product/cold-email/
updated: 2026-11-09
order: 10
---

## How a mission works

A **mission** is a goal an agent works toward. You can start one from the goal box on the Missions page, from a [playbook](/docs/agents/playbooks/), or from your own agent over the [API](/docs/api/) or [MCP](/product/mcp/).

1. **State the goal.** Your AI model drafts the mission from a summary of your workspace: mailbox counts and capacity, lead and suppression counts, sequence names, your company context and which connectors are connected. Lead lists, email addresses and credentials are never sent to the model.
2. **Read the draft.** It holds a name, a goal to track, the steps, instructions, email and spend limits, an end date, the connectors it needs and its questions. Nothing runs yet: every write in a draft is a dry run.
3. **Approve and choose how it runs.** Pick who carries it out (Outflare's built-in agent, or your own agent such as Claude Code) and how its changes run.
4. **Watch it work.** The mission page shows progress toward the goal and a **Needs you** box with questions, connect requests and held changes. **Calls** lists every API call with its result and the reason the agent gave.
5. **It finishes with a report**, and its sequences are paused.

Goals can be meetings, replies, emails sent, leads contacted, or revenue in US dollars, either credited to the mission's campaigns under your [attribution model](/docs/guides/attribution/) or from won deals.

## Three modes, one gate

| Mode | What a write does |
| --- | --- |
| Dry run | Recorded, never run. Approve it later to make the rehearsal real. |
| Approve each change | Held until a person approves it, then runs as the agent. |
| Autonomous | Runs within the mission's limits and the token's own limits. |

Approving a held change runs it through every normal check at that moment: scopes, the [send policy](/docs/concepts/policy-check/), token limits and the audit log. Even in autonomous mode, the built-in agent's changes that could send data out or change where mail goes wait for a person, because the agent reads text from outside your workspace, such as email replies and web pages, and treats it as data, never as instructions.

## Limits that hold

- **Email limit.** Every sequence the agent creates in the mission counts, and sending stops at the limit.
- **Spend limit.** Paid connector calls and the agent's own turns are checked against what the mission has spent before they run.
- **Monthly AI limit** for the workspace (US$50 a month by default), plus a limit per tool under [AI usage](/docs/guides/ai-usage/).
- **End date.** The mission completes itself on that day.

We also recommend a key made just for Outflare with a hard spend limit at your AI provider, since that limit holds whatever happens.

## Memory: explain your company once

Agents forget everything when a chat ends. Outflare keeps the business, not the conversation: your company context (what you do, goals, voice and rules), short memories such as "Never mention pricing in a first email", each [brand's](/product/brands/) own context, and your ideal customers. Claude, ChatGPT, Cursor and the built-in agent all read the same context first, with `get_context`.

`get_status` lists everything stopping the workspace, worst first, such as mailboxes that can't sign in, domains with DNS problems or changes waiting for approval, and says whether the agent or a person has to act. See [Memory and status](/docs/agents/memory/).

## Playbooks

A [playbook](/docs/agents/playbooks/) is a ready-made recipe, such as answering interested replies within the hour or getting named in AI answers. Each says what it needs, the steps and API operations it uses, what it will never do and how you'll know it worked. Your workspace shows whether you are **Ready**, need to **Connect first** or **Need data**. **Start as a mission** turns it into a draft you approve. Playbooks are open source (Apache-2.0), and anyone can add one on GitHub.

## Which model runs it

Connect Claude, OpenAI, Gemini, Mistral, xAI or DeepSeek, or a router (OpenRouter, Vercel AI Gateway or Requesty), and pick the model under **Settings → AI model**. You can choose a cheaper model for routine tasks such as reply labelling and check-ins. See [AI models](/docs/agents/ai-models/).

## What Outflare doesn't do

- It doesn't lend an AI key or include AI credits. Your provider bills your account.
- It doesn't let the agent approve itself, invite people, create API tokens or skip the suppression list.
- The open-source agent works on missions you approve. Autopilots that keep working toward a target day after day are [Outflare Cloud](/docs/project/open-source-and-cloud/) features.
