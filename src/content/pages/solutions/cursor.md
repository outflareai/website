---
title: "Use Outflare in Cursor and VS Code via MCP · Outflare"
description: "Add Outflare's MCP server to Cursor or VS Code with one URL, approve it, and work on your marketing, tracking and A/B tests from your editor's agent."
h1: "Run your marketing from Cursor or VS Code."
label: Cursor and VS Code
lede: "Add Outflare to Cursor's mcp.json or VS Code with one URL, approve it in your browser, and ask your editor's agent to check tracking, build A/B tests, read search data or draft outreach next to your code."
answer: "To use Outflare in Cursor, click Add to Cursor on Outflare's Connect your AI page or add \"outflare\" with the url https://app.outflare.ai/mcp to ~/.cursor/mcp.json, then click Connect next to it in Cursor's Tools & MCP settings and approve it in Outflare. In VS Code, click Add to VS Code or run code --add-mcp with the same URL, sign in when the server starts, and switch Copilot Chat to Agent mode. Your editor's agent then works in your Outflare workspace through its MCP server, within the limits you approve."
points:
  - "One URL, https://app.outflare.ai/mcp, no key to copy"
  - "Cursor through mcp.json; VS Code through code --add-mcp"
  - "Useful for tracking, feature flags and A/B tests next to your code"
  - "Changes happen inside missions you approve"
docs:
  - label: Connect your AI
    href: /docs/agents/connect/
  - label: Agents and MCP
    href: /docs/agents/mcp/
  - label: Website tracking
    href: /docs/guides/website-tracking/
  - label: Feature flags
    href: /docs/guides/feature-flags/
faqs:
  - q: "How do I add Outflare to Cursor?"
    a: "Click Add to Cursor on Outflare's Connect your AI page, or add {\"mcpServers\":{\"outflare\":{\"url\":\"https://app.outflare.ai/mcp\"}}} to ~/.cursor/mcp.json. Then click Connect next to outflare in Cursor Settings → Tools & MCP and approve it in your browser."
  - q: "How do I add Outflare to VS Code?"
    a: "Click Add to VS Code on the Connect your AI page, or run code --add-mcp '{\"name\":\"outflare\",\"type\":\"http\",\"url\":\"https://app.outflare.ai/mcp\"}'. VS Code asks you to sign in when the server starts; then switch Copilot Chat to Agent mode."
  - q: "What would I use Outflare for in a code editor?"
    a: "Anything in Outflare's API, next to your code: checking that the website tracking script and identify calls are working, creating feature flags and evaluating them for a visitor, building A/B tests, reading Search Console data for the pages you're editing, or drafting outreach."
  - q: "Can I run the Outflare MCP server locally instead?"
    a: "Yes. Build it from the repository and configure it with your server's URL and an API token in mcp.json, with OUTFLARE_MCP_READ_ONLY=1 for read-only tools or OUTFLARE_MISSION to act inside one mission."
  - q: "Do other editors and agents work?"
    a: "Any app that connects to remote MCP servers can use the same URL, such as Windsurf, Codex, Gemini CLI, Goose and Zed, according to Outflare's docs. Apps that sign in with OAuth are sent to Outflare to approve."
related:
  - /product/mcp/
  - /product/experiments/
  - /solutions/claude/
  - /solutions/chatgpt/
  - /glossary/mcp/
  - /best/mcp-servers-for-marketing/
checked: 2026-11-09
updated: 2026-11-09
order: 50
---

## Your address

```text
https://app.outflare.ai/mcp
```

On a self-hosted server it's `https://<your server>/mcp`. There's nothing to install and no key to copy: your editor sends you to Outflare to sign in and approve it.

## Cursor

Click **Add to Cursor** on Outflare's **Connect your AI** page, or add this to `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "outflare": { "url": "https://app.outflare.ai/mcp" }
  }
}
```

Then click **Connect** next to outflare in **Cursor Settings → Tools & MCP** and approve it in your browser. Cursor's own docs show remote servers configured the same way, by `url` in `mcp.json` (checked November 2026).

## VS Code

Click **Add to VS Code** on the Connect your AI page, or run:

```sh
code --add-mcp '{"name":"outflare","type":"http","url":"https://app.outflare.ai/mcp"}'
```

VS Code asks you to sign in when the server starts. Then switch Copilot Chat to **Agent** mode and ask.

## Other editors and agents

Any app that connects to remote MCP servers can use the same URL: Outflare's docs name Windsurf, Codex, Gemini CLI, Goose and Zed. Apps that sign in with OAuth send you to Outflare to approve; Outflare follows the MCP authorization spec, with dynamic client registration. An app that can't sign in can send an [API token](/docs/api/authentication/) as `Authorization: Bearer oft_...`.

## Why use it from your editor

Your editor's agent can see your code and your marketing data at the same time. Some things to ask:

- "Is the Outflare tracking script on every page, and does our sign-up send identify with the anonymous id?" ([website tracking](/docs/guides/website-tracking/))
- "Create a feature flag for the new pricing headline and read it in this component." ([feature flags](/docs/guides/feature-flags/))
- "Which pages in /blog get many impressions but few clicks, and what would you change on them?" ([SEO](/product/seo/))
- "Set up an A/B test of this page's call to action." ([experiments](/product/experiments/))

Anything visitors would see, such as starting an A/B test or turning a flag on, waits for a person to approve it.

## What you approve

When the editor connects, Outflare shows the workspace and a switch for each area it may change. Everything starts on except **Spend money**. A connected app can never invite or remove people, create API tokens, manage webhooks, edit the suppression list or approve its own missions, and it makes changes only inside a [mission](/docs/agents/missions/) you approved unless you turn off **Only inside missions**. Every change is in the audit log under the app's name.

## Run it on your own computer

To pin the server to one brand or mission, or if your setup only starts local servers, build `@outflare/mcp` from the repository and add it with an API token:

```json
{
  "mcpServers": {
    "outflare": {
      "command": "node",
      "args": ["/path/to/outflare/mcp/dist/index.js"],
      "env": {
        "OUTFLARE_URL": "https://outflare.example.com",
        "OUTFLARE_TOKEN": "oft_test_not_a_real_token"
      }
    }
  }
}
```

Set `OUTFLARE_MCP_READ_ONLY=1` to register only tools that change nothing. See [Agents and MCP](/docs/agents/mcp/#run-it-on-your-computer) for the scopes each kind of agent needs.
