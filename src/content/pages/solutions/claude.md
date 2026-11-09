---
title: "Use Outflare from Claude and Claude Code via MCP · Outflare"
description: "Connect Claude or Claude Code to Outflare with one MCP URL, approve it, and ask Claude to run your outreach, SEO and analytics within the limits you set."
h1: "Run your marketing from Claude."
label: Claude
lede: "Add Outflare to Claude as a custom connector, or to Claude Code with one command, sign in to approve it, and ask Claude to read your numbers, import leads, draft sequences and more, with the same limits as a person."
answer: "To use Outflare from Claude, add a custom connector named Outflare with the URL https://app.outflare.ai/mcp (or https://<your server>/mcp when self-hosted), click Connect, and approve it in Outflare. In Claude Code, run claude mcp add --transport http outflare https://app.outflare.ai/mcp, then /mcp and Authenticate. There's nothing to install and no key to copy; Claude then works in your workspace through Outflare's MCP server, makes changes only inside missions you approve unless you turn that off, and every email still passes Outflare's policy check."
points:
  - "One URL, https://app.outflare.ai/mcp, with sign-in and approval"
  - "Works in Claude and Claude Code"
  - "You choose what Claude may change; spending is off by default"
  - "Changes happen inside missions you approve"
docs:
  - label: Connect your AI
    href: /docs/agents/connect/
  - label: Agents and MCP
    href: /docs/agents/mcp/
  - label: Missions
    href: /docs/agents/missions/
  - label: Memory and status
    href: /docs/agents/memory/
faqs:
  - q: "How do I connect Claude to Outflare?"
    a: "Add a custom connector in Claude's connector settings, name it Outflare and paste https://app.outflare.ai/mcp. Click Connect, pick your workspace in Outflare and approve. Then turn on Outflare in a chat's tools menu and ask it something."
  - q: "How do I add Outflare to Claude Code?"
    a: "Run claude mcp add --transport http outflare https://app.outflare.ai/mcp, then run /mcp, pick outflare and choose Authenticate. Your browser opens Outflare to approve. Add --scope user to have Outflare in every project."
  - q: "Do I need an API key to connect Claude?"
    a: "No. Claude sends you to Outflare to sign in and approve it. Apps that can't sign in can send an Outflare API token as a Bearer header instead."
  - q: "What can Claude do in my Outflare workspace?"
    a: "What you approve on the consent screen. Everything starts on except spending money, and you can turn off any area or choose read only. A connected app can never invite or remove people, create API tokens, manage webhooks, edit the suppression list or approve its own missions."
  - q: "Does it work with a self-hosted Outflare?"
    a: "Yes. Use https://<your server>/mcp instead. The release image runs the hosted MCP server itself, so /mcp works out of the box."
related:
  - /product/mcp/
  - /product/agents/
  - /solutions/chatgpt/
  - /solutions/cursor/
  - /glossary/mcp/
  - /best/mcp-servers-for-marketing/
checked: 2026-11-09
updated: 2026-11-09
order: 30
---

## Your address

Every app connects with one URL:

```text
https://app.outflare.ai/mcp
```

On a self-hosted server it's `https://<your server>/mcp`. There's nothing to install and no key to copy: Claude sends you to Outflare to sign in and approve it. In Outflare, **Connect your AI** in the sidebar shows your address and these steps.

## Claude (web, desktop and mobile)

Outflare's docs give these steps:

1. In Claude's connector settings, choose **Add custom connector**. Outflare's docs place it under **Settings → Connectors**; Claude's own help centre currently calls the menu **Customize → Connectors**.
2. Name it **Outflare** and paste `https://app.outflare.ai/mcp`.
3. Click **Connect**. Claude sends you to Outflare: pick the workspace and approve.
4. In a chat, turn on **Outflare** in the tools menu and ask it something.

On a Team or Enterprise plan, an owner adds the connector once in the organisation's connector settings, then everyone connects their own account. Claude's help centre also notes that Free accounts are limited to one custom connector (checked November 2026).

## Claude Code

```sh
claude mcp add --transport http outflare https://app.outflare.ai/mcp
```

Then run `/mcp` in Claude Code, pick **outflare** and choose **Authenticate**. Your browser opens Outflare to approve. Add `--scope user` to the command to have Outflare in every project.

**Let your AI set it up.** On the Connect your AI page, **Copy prompt** gives a prompt to paste into Claude or Claude Code (or **Ask Claude** opens it there). Claude Code can add Outflare itself; in a chat, Claude walks you through each click.

## What you approve

When Claude connects, Outflare shows who is asking, the workspace it will work in and a switch for each thing it may do:

| Switch | Default |
| --- | --- |
| See your workspace | Always on |
| Company context and memories, Leads and lists, Sequences and customer profiles, Replies, Mailboxes, domains and connectors, SEO, Missions | On; turn off any, or choose **Read only** |
| Spend money | Off; purchases wait for your approval |

Whatever you choose, a connected app can never invite or remove people, change the workspace, create API tokens, manage webhooks, edit the suppression list or approve its own missions. Every email still goes through the [policy check](/docs/concepts/policy-check/), and every change is in the audit log under the app's name.

**Changes happen inside missions.** Claude reads freely, but makes changes only inside a [mission](/docs/agents/missions/) you approved: asked to change something outside one, it starts a mission that waits for you to approve its plan. To let it change things directly, turn off **Only inside missions** for the app.

## Then just ask

Claude starts each conversation by reading what Outflare knows about your company and what is blocked, so you don't explain yourself each time. Try:

- "What's stopping my outreach right now?"
- "Here's our website. Write up who we sell to and remember it."
- "Import the leads in this CSV, check them against the suppression list and draft a three-step sequence for them."
- "Which sequence books the most meetings per dollar?"

Outflare's [MCP server](/product/mcp/) gives Claude tools across every module: [cold email](/product/cold-email/), [SEO](/product/seo/), [analytics](/product/analytics/), [customer records](/product/customer-data/) and more.

## Change or disconnect

Connected apps are listed on the **Connect your AI** page with who connected them, what they may do and when they were last used. Change any switch and Claude gets it on its next request; start a new chat after turning on changes. **Disconnect** cuts it off at once.

## Prefer a local server?

If you'd rather run the MCP server on your own computer with an API token, or pin it to one brand or mission, see [Agents and MCP](/docs/agents/mcp/#run-it-on-your-computer).
