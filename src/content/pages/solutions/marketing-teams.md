---
title: "Marketing software for teams, with approvals · Outflare"
description: "Give your marketing team custom roles, brand-limited access, approvals for agents and spending, and an audit log of every change, in one open-source workspace."
h1: "One workspace for your marketing team and its agents."
label: Marketing teams
lede: "Outflare gives each person and each agent exactly the access they need, keeps people to the brands they work on, holds risky changes for approval, and records every change in an audit log."
answer: "Outflare is a shared marketing workspace for teams and AI agents. Each member has a role (Owner, Admin, Member, Viewer or a custom role built area by area), can be kept to some brands, and API tokens never hold more than the person who made them. Agents work inside missions whose changes run, wait for approval or are dry runs as you choose, sending and spending have their own permissions, and every significant change is written to the audit log in the same transaction, with who made it."
points:
  - "Custom roles, area by area, with switches for sending and spending"
  - "People and tokens kept to the brands they work on"
  - "Agents can never approve their own missions or changes"
  - "An audit log of every significant change"
docs:
  - label: Workspaces and access
    href: /docs/guides/workspaces-and-access/
  - label: Brands
    href: /docs/guides/brands/
  - label: Missions
    href: /docs/agents/missions/
  - label: API tokens
    href: /docs/api/authentication/
faqs:
  - q: "What roles does Outflare have?"
    a: "Every workspace starts with Owner, Admin, Member and Viewer. You can change Admin, Member and Viewer or add your own, such as a Content writer with only SEO and Social, by setting each area to None, View or Edit, plus switches for sending email, posting to social, approving missions and spending, the audit log and more."
  - q: "Can I keep a contractor to one brand?"
    a: "Yes. An operator or viewer can be kept to some brands, and an API token or AI connection to one brand. They see those brands' records plus anything shared, change only their brands' records, and can't use workspace settings, webhooks, missions or connecting tools."
  - q: "How do approvals work for AI agents?"
    a: "Agents act inside missions. A mission's changes are dry runs, wait for a person to approve each one, or run autonomously within its limits. An agent can never approve its own mission or changes, even with the approve scope; approval comes from a person or a separate approver token."
  - q: "Does Outflare have an audit log?"
    a: "Yes. Every significant change writes an audit event in the same transaction as the change, with the actor (a person or a token, by name), the action, the target and the request id. Read it under Audit log or through the API with the audit.read scope."
  - q: "Can several businesses share one workspace?"
    a: "Yes, as brands. A workspace is one company, and each brand has its own website, context for agents, sequences, lead lists, domains, mailboxes and analytics, while connectors, people and the suppression list are shared."
related:
  - /product/brands/
  - /product/agents/
  - /product/customer-data/
  - /product/mcp/
  - /solutions/founders/
  - /compare/outflare-vs-hubspot/
updated: 2026-11-09
order: 20
---

## Built for people and agents working together

Most marketing tools were built for one person clicking in a browser. In Outflare, people, scripts and AI agents use the same API with the same permissions, so a team can let agents do real work without handing them the keys to everything.

## Roles

| Role | What it's for |
| --- | --- |
| Owner | Everything, including removing people and managing owners |
| Admin | Everything except removing people or reducing their access |
| Member | All the marketing work and connecting tools; no settings, people, API tokens or audit log |
| Viewer | Sees everything, changes nothing |

Change these or add your own under **Settings → Members → Roles**. A role is a list of areas set to None, View or Edit, plus switches for actions that need their own say: sending email, posting to social accounts, approving missions and spending, the unsubscribe list, webhooks, settings, API tokens, the audit log, inviting and removing people, and editing roles.

- **You can't give what you don't have.** Every permission in a role you create or give must be one you hold.
- **Taking access away is its own permission**, owners-only by default.
- **Changes apply at once**, and API tokens lose permissions their maker's role no longer has.

Invite people by email from **Settings → Members**, with a one-time link that expires after 7 days.

## Brands: one company, several businesses

A workspace is one company. If it markets more than one business, each is a [brand](/product/brands/) with its own website, context for agents, sequences, lead lists, domains, mailboxes and analytics. Connectors, people, API tokens, leads and the suppression list stay shared, so nobody connects a tool twice and an unsubscribe from any brand stops every brand.

Owners and admins see every brand. An operator or viewer can be kept to some brands, and an API token to one:

- they see those brands' records plus anything shared;
- they change only their brands' records;
- they can't use what needs every brand, such as workspace settings, webhooks, missions and connecting tools.

Reports compare brands side by side, and you can stop two brands cold emailing the same person within a number of days.

## Approvals for agents

Agents, whether Outflare's own or Claude, ChatGPT and Cursor connected over MCP, make changes inside [missions](/docs/agents/missions/):

| Mission mode | A change |
| --- | --- |
| Dry run | Recorded, never run |
| Approve each change | Held until a person approves it |
| Autonomous | Runs within the mission's email and spend limits |

- **An agent can never approve its own mission or changes.** Approval comes from a person or a separate approver token, such as a Slack bot you run.
- **Spending is off by default** for connected AI apps; every purchase of domains or mailboxes waits for approval.
- **Connected apps can never** invite or remove people, change the workspace, create API tokens, manage webhooks, edit the suppression list or approve their own missions.
- **Every email passes the [policy check](/docs/concepts/policy-check/)**, however an agent is prompted.

Some modules add their own gates: a press release or pitch needs a person's approval, ad changes that spend more wait for a person, and A/B tests start only when a person approves.

## The audit log

Every significant change writes an audit event in the same transaction as the change: role changes, invites, tokens created and revoked, mailbox imports and more. Each records the actor (a person or a token, by name), the action, the target and the request id, so a change an agent made is traceable to the exact API call. Read it under **Audit log**, filter it by brand, or use `GET /v1/workspaces/{ws}/audit-events`. Webhooks can deliver events to your own systems.

Every change to a person or company is also in that record's own history, whoever made it.

## API tokens

Scripts and integrations use workspace API tokens with explicit scopes. A token never holds more than the person who made it, can be kept to one brand, and for an outreach agent can carry its own daily send budget.

## What it costs

Self-hosting is free (AGPL-3.0), and Outflare Cloud is free during early access. Each workspace connects its own AI, data and sending accounts and pays those providers directly.

## What Outflare doesn't have

- No agency accounts or white label. A workspace is one company; to work across several, be a member of each.
- Single sign-on, SCIM, audit log export and approvals across teams are listed as coming to Outflare Cloud, not available today.
