---
title: "Use Outflare from ChatGPT with an MCP connector · Outflare"
description: "Add Outflare to ChatGPT as a custom MCP server with OAuth, approve it, and ask ChatGPT to run your outreach, SEO and analytics within limits you set."
h1: "Run your marketing from ChatGPT."
label: ChatGPT
lede: "Add Outflare to ChatGPT as a custom MCP server, sign in to approve it, then type @Outflare in a chat to read your numbers, import leads or draft a sequence, with the same limits as a person."
answer: "To use Outflare from ChatGPT, add a custom MCP server named Outflare with the server URL https://app.outflare.ai/mcp and OAuth authentication, create it, and approve it in Outflare when ChatGPT sends you there. Then type @ in a new chat, pick Outflare and ask. OpenAI's help centre says custom MCP connections are for ChatGPT Business and Enterprise/Edu workspaces on the web, where an admin first allows creating plugins with MCPs (checked November 2026)."
points:
  - "One URL, https://app.outflare.ai/mcp, with OAuth sign-in"
  - "Set up on chatgpt.com; then type @Outflare in a chat"
  - "You choose what ChatGPT may change; spending is off by default"
  - "Changes happen inside missions you approve"
docs:
  - label: Connect your AI
    href: /docs/agents/connect/
  - label: Agents and MCP
    href: /docs/agents/mcp/
  - label: Missions
    href: /docs/agents/missions/
  - label: API tokens
    href: /docs/api/authentication/
faqs:
  - q: "How do I connect ChatGPT to Outflare?"
    a: "On chatgpt.com, open Plugins, click +, choose Add custom MCP server, name it Outflare, paste https://app.outflare.ai/mcp as the Server URL and choose OAuth. Create it, then install the Outflare plugin; ChatGPT sends you to Outflare to pick the workspace and approve."
  - q: "Which ChatGPT plans can add a custom MCP server?"
    a: "OpenAI's help centre says custom MCP server connections are available to ChatGPT Business and Enterprise/Edu workspaces on ChatGPT web, and an admin allows Create plugins with MCPs in workspace settings (checked November 2026). OpenAI changes these menus and plans from time to time."
  - q: "Can ChatGPT send emails or spend money in Outflare?"
    a: "Only within what you approve. Spending is off unless you switch it on, changes happen inside missions you approve by default, and every email passes Outflare's policy check, which blocks suppressed recipients and enforces send limits."
  - q: "Does it work with self-hosted Outflare?"
    a: "Yes. Use https://<your server>/mcp as the Server URL. The release image runs the hosted MCP server itself."
related:
  - /product/mcp/
  - /product/agents/
  - /solutions/claude/
  - /solutions/cursor/
  - /glossary/mcp/
  - /best/mcp-servers-for-marketing/
checked: 2026-11-09
updated: 2026-11-09
order: 40
---

## Your address

```text
https://app.outflare.ai/mcp
```

On a self-hosted server it's `https://<your server>/mcp`. There's nothing to install and no key to copy: ChatGPT sends you to Outflare to sign in and approve it. In Outflare, **Connect your AI** in the sidebar shows your address and these steps.

## Add it to ChatGPT

Outflare's docs give these steps, set up on chatgpt.com:

1. In ChatGPT, open **Plugins**, click **+** and choose **Add custom MCP server**.
2. Name it **Outflare**, paste `https://app.outflare.ai/mcp` as the **Server URL** and choose **OAuth** for authentication.
3. Click **I understand and want to continue**, then **Create**. Install the Outflare plugin: ChatGPT sends you to Outflare to pick the workspace and approve.
4. In a new chat, type **@**, pick **Outflare** and ask it something.

On a Business, Enterprise or Edu workspace, an admin first allows **Create plugins with MCPs** under **Workspace settings → Permissions & roles**. ChatGPT renames these menus from time to time; if one doesn't match, look for Plugins or Apps.

**Let your AI set it up.** On the Connect your AI page, **Ask ChatGPT** opens a prompt in ChatGPT that walks you through each click.

## Which plans

OpenAI's [help centre](https://help.openai.com/en/articles/12584461-developer-mode-and-custom-mcp-connectors-for-chatgpt) says custom MCP server connections are available for ChatGPT Business and Enterprise/Edu workspaces on ChatGPT web, created by admins or members they allow (checked November 2026). Check it for your own plan before you start.

## What you approve

When ChatGPT connects, Outflare shows who is asking, the workspace it will work in and a switch for each thing it may do. Everything starts on except **Spend money**, which stays off so every purchase of domains or mailboxes waits for you. **Read only** turns every change off at once.

Whatever you choose, a connected app can never invite or remove people, change the workspace, create API tokens, manage webhooks, edit the suppression list or approve its own missions. Every email goes through the [policy check](/docs/concepts/policy-check/), and every change is in the audit log under the app's name.

ChatGPT reads freely, but makes changes only inside a [mission](/docs/agents/missions/) you approved, unless you turn off **Only inside missions** for it on the Connect your AI page.

## Then just ask

- "What's stopping my outreach right now?"
- "Here's our website. Write up who we sell to and remember it."
- "Import the leads in this CSV, check them against the suppression list and draft a three-step sequence for them."
- "Which sequence books the most meetings per dollar?"

ChatGPT reads what Outflare knows about your company and what is blocked at the start of each conversation, then works through Outflare's [MCP server](/product/mcp/) across [cold email](/product/cold-email/), [SEO](/product/seo/), [analytics](/product/analytics/) and the rest.

## Change or disconnect

The **Connect your AI** page lists connected apps with what they may do and when they were last used. Change any switch and it applies on ChatGPT's next request; **Disconnect** cuts it off at once.

## If ChatGPT can't sign in

An app that can't sign in with OAuth can send an [API token](/docs/api/authentication/) as `Authorization: Bearer oft_...`. Create one under **Settings → API tokens** and choose what it may do.
