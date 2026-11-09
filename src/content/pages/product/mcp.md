---
title: Marketing MCP server for Claude, ChatGPT, Cursor · Outflare
description: Outflare's MCP server gives Claude, ChatGPT, Cursor and other MCP apps 536 marketing tools over one URL, with scoped access, limits and an audit log.
h1: The marketing MCP server for your AI app.
label: MCP server
lede: Connect Claude, ChatGPT, Cursor, VS Code or any MCP app to Outflare with one URL, then ask it to run your marketing. It works in your workspace with the same limits as a person.
answer: Outflare's MCP server connects AI apps such as Claude, ChatGPT and Cursor to your marketing workspace. Add https://app.outflare.ai/mcp (or /mcp on your own server) as a custom connector, sign in and choose what the app may do. It then has 536 tools over the Outflare API, for leads, sequences, replies, mailboxes, SEO, analytics, missions and more, and every email still passes the policy check.
points:
  - One URL, OAuth sign-in, nothing to install
  - 536 tools, one per API call
  - A switch per area, spending off by default
  - Changes happen inside missions you approve
docs:
  - label: Connect your AI
    href: /docs/agents/connect/
  - label: Agents and MCP
    href: /docs/agents/mcp/
  - label: Memory and status
    href: /docs/agents/memory/
  - label: Missions
    href: /docs/agents/missions/
faqs:
  - q: What is a marketing MCP server?
    a: An MCP server gives an AI app tools it can call, using the Model Context Protocol. A marketing MCP server gives it marketing tools, such as reading analytics, importing leads, drafting a sequence or answering replies. Outflare's server exposes its whole API this way.
  - q: How do I connect Outflare to Claude?
    a: In Claude, open Settings, Connectors, Add custom connector, name it Outflare and paste https://app.outflare.ai/mcp. Click Connect, pick your workspace and approve. It works in claude.ai, Claude Desktop and the Claude mobile apps.
  - q: Does it work with ChatGPT and Cursor?
    a: Yes. ChatGPT adds it as a custom MCP server with OAuth, and Cursor and VS Code add it with one button or a line of config. Any app that connects to remote MCP servers can use the same URL, including Windsurf, Codex, Gemini CLI, Goose and Zed.
  - q: Can the AI app send email or spend money on its own?
    a: Spending is off unless you switch it on, so purchases of domains or mailboxes wait for you. By default a connected app makes changes only inside a mission you approved, every email goes through the policy check, and a connected app can never create API tokens, edit the suppression list or approve its own missions.
  - q: Do I need an AI key in Outflare to use the MCP server?
    a: No. The AI runs in the app you already use, such as a Claude or ChatGPT plan, so Outflare needs no model key for it.
  - q: Can I run the MCP server myself?
    a: Yes. The server is open source in the Outflare repository. Self-hosted servers serve it at /mcp, or you can build it and run it on your own computer with an API token, for example to pin it to one brand or mission.
related:
  - /product/agents/
  - /solutions/claude/
  - /solutions/chatgpt/
  - /solutions/cursor/
  - /best/mcp-servers-for-marketing/
  - /glossary/mcp/
updated: 2026-11-09
order: 20
---

## Connect in a minute

Every app connects with one address:

```text
https://app.outflare.ai/mcp
```

On a self-hosted server it is `https://<your server>/mcp`. There is no key to copy: the app sends you to Outflare to sign in and approve it. [Connect your AI](/docs/agents/connect/) has the steps for each app.

| App | How to add it |
| --- | --- |
| Claude (web, desktop, mobile) | Settings → Connectors → Add custom connector |
| ChatGPT | Plugins → Add custom MCP server, with OAuth |
| Claude Code | `claude mcp add --transport http outflare https://app.outflare.ai/mcp` |
| Cursor | **Add to Cursor**, or `~/.cursor/mcp.json` |
| VS Code | **Add to VS Code**, then Copilot Chat in Agent mode |
| Windsurf, Codex, Gemini CLI, Goose, Zed | The same URL |

Don't want to click through settings? **Copy prompt** on the Connect your AI page and paste it into your AI app, and it walks you through the rest.

## What the tools cover

The server has 536 tools, one per API call, so an agent can do anything a person can in the app. A few examples:

| Area | Tools |
| --- | --- |
| Start here | `get_context`, `get_status`, `remember` |
| Missions | `plan_mission`, `use_mission`, `get_mission`, `submit_mission_plan` |
| Leads | `list_leads`, `find_emails`, `verify_addresses`, `check_recipients` |
| Sequences | `list_sequences`, `preview_sequence`, `list_enrollments` |
| Replies | `list_inbox`, `get_inbox_message`, `triage_inbox_message` |
| Deliverability | `list_domains`, `list_mailboxes`, `get_infrastructure` |
| Analytics and SEO | `get_analytics_changes`, `get_seo_overview`, `get_ai_visibility` |
| Results | `get_outcomes_report`, `list_meetings`, `list_deals` |

Every conversation starts with `get_context`, which returns what Outflare knows about your company, its memories and brands, and what is blocked. So you explain your business once, and Claude, ChatGPT and Cursor all read the same thing. See [Memory and status](/docs/agents/memory/).

## You decide what it may do

When an app connects, Outflare shows who is asking, which workspace it will work in, and a switch for each area: company context and memories, leads and lists, sequences, replies, mailboxes and domains, SEO and missions. **Read only** turns them all off at once. **Spend money** is off unless you switch it on.

Whatever you choose, a connected app can never invite or remove people, change the workspace, create API tokens, manage webhooks, edit the suppression list or approve its own missions. Every email still goes through the [policy check](/docs/concepts/policy-check/), and every change is in the audit log under the app's name.

By default an app reads freely but changes things only inside a [mission](/product/agents/) you approved, where its changes are dry runs, wait for you, or run within limits. You can turn off **Only inside missions** for an app you trust.

## Change or disconnect

Connected apps are listed on the **Connect your AI** page with who connected them, what they may do and when they were last used. Each switch saves at once, and **Disconnect** cuts an app off straight away. Each connection is a short-lived token the app refreshes; Outflare stores only hashes of tokens.

## Run it on your own computer

The server is [`@outflare/mcp`](https://github.com/outflareai/outflare/tree/main/mcp) in the open-source repository. Build it from source and run it with an [API token](/docs/api/authentication/) when your app only starts local servers, or to keep it to one brand (`OUTFLARE_BRAND`) or one mission (`OUTFLARE_MISSION`). `OUTFLARE_MCP_READ_ONLY=1` registers only the tools that change nothing. See [Agents and MCP](/docs/agents/mcp/).

## Things to ask

- "What's stopping my outreach right now?"
- "Here's our website. Write up who we sell to and remember it."
- "Import the leads in this CSV, check them against the suppression list and draft a three-step sequence for them."
- "Which sequence books the most meetings per dollar?"
