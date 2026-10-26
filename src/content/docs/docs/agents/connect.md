---
title: Connect your AI
description: Connect Claude, ChatGPT, Cursor, VS Code or any MCP app to Outflare with one URL, then just ask it to run your marketing.
sidebar:
  order: 0
---

Outflare is built to be run from the AI app you already use. Connect it once and ask Claude or ChatGPT things like "Show me what's blocking my outreach" or "Import these leads and draft a three-step sequence for them". It works in your workspace with the same limits as a person.

In the app, open **Connect your AI** in the sidebar (it is also on Home until something is connected). It shows your address and the steps for each app. Everything below is on that page too.

## Your address <span class="pill shipped">Shipped</span>

Every app connects with one URL:

```text
https://app.outflare.ai/mcp
```

On a self-hosted server it is `https://<your server>/mcp`. There is nothing to install and no key to copy. The app sends you to Outflare to sign in and approve it.

## Let your AI set it up

Don't want to click through settings? Under **Or let your AI set it up**, click **Copy prompt** and paste it into Claude, Claude Code, Cursor or ChatGPT (or click **Ask Claude** or **Ask ChatGPT** to open it there). An app that can change its own settings, like Claude Code, adds Outflare itself; a chat app walks you through each click. Then you approve Outflare in your browser and it tells you what it found.

## Claude

Works in claude.ai, Claude Desktop and the Claude mobile apps.

1. In Claude, open **Settings → Connectors** and choose **Add custom connector**.
2. Name it **Outflare** and paste `https://app.outflare.ai/mcp`.
3. Click **Connect**. Claude sends you to Outflare: pick the workspace and approve.
4. In a chat, turn on **Outflare** in the tools menu and ask it something.

On a Team or Enterprise plan, an owner adds the connector once under **Organization settings → Connectors**, then everyone connects their own account.

## ChatGPT

Needs a plan with developer mode (Plus, Pro, Business, Enterprise or Edu).

1. In ChatGPT, open **Settings → Apps & Connectors → Advanced settings** and turn on **Developer mode**.
2. Back in **Apps & Connectors**, choose **Create**. Name it **Outflare**, paste `https://app.outflare.ai/mcp` as the MCP server URL and pick **OAuth**.
3. ChatGPT sends you to Outflare: pick the workspace and approve.
4. In a chat, choose **+ → Developer mode**, turn on Outflare and ask it something.

ChatGPT moves these menus around from time to time. If a name doesn't match, look for Connectors or Apps.

## Claude Code

```sh
claude mcp add --transport http outflare https://app.outflare.ai/mcp
```

Then run `/mcp` in Claude Code, pick **outflare** and choose **Authenticate**. Your browser opens Outflare to approve. Add `--scope user` to the command to have Outflare in every project.

## Cursor

Click **Add to Cursor** on the Connect your AI page, or add this to `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "outflare": { "url": "https://app.outflare.ai/mcp" }
  }
}
```

Then click **Connect** next to outflare in **Cursor Settings → Tools & MCP** and approve.

## VS Code

Click **Add to VS Code** on the Connect your AI page, or run:

```sh
code --add-mcp '{"name":"outflare","type":"http","url":"https://app.outflare.ai/mcp"}'
```

VS Code asks you to sign in when the server starts. Then switch Copilot Chat to **Agent** mode and ask.

## Other apps

Any app that connects to remote MCP servers can use the same URL: Windsurf, Codex, Gemini CLI, Goose, Zed and more. Apps that sign in with OAuth send you to Outflare to approve, and Outflare finds them on its own (it follows the MCP authorization spec, with dynamic client registration).

An app that can't sign in can send an [API token](/docs/api/authentication/) instead, as the header `Authorization: Bearer oft_...`. Create one under **Settings → API tokens** with the **Outreach agent** or **Mission agent** preset.

## What you approve

When an app connects, Outflare shows who is asking and lets you choose:

- **The workspace** it works in, if you are in more than one.
- **Run my marketing**: everything your role allows, such as importing leads, building lists, writing and starting sequences, answering replies, planning mailboxes and running [missions](/docs/agents/missions/).
- **Read only**: it sees everything and changes nothing. Viewers can only give read-only access.
- **Spending**: off unless you tick it. Left off, every purchase of domains or mailboxes waits for you to approve it in Outflare.

Whatever you choose, a connected app can never invite or remove people, change the workspace, create API tokens, manage webhooks, edit the suppression list or approve its own missions. Every email still goes through the [policy check](/docs/concepts/policy-check/), and every change is in the audit log under the app's name.

If Outflare doesn't recognise the app, the screen says so and shows where it will send you back. Only continue if you started connecting from there.

## See and disconnect apps

Connected apps are listed on the **Connect your AI** page with who connected them, what they may do and when they were last used. **Disconnect** cuts an app off at once. You can disconnect your own apps; owners and admins can disconnect anyone's. An app also loses access when the person who connected it leaves the workspace.

Under the hood each connection is a short-lived token that the app refreshes. Outflare stores only hashes of the tokens, and if a refresh token is ever used twice, it disconnects the app.

## Self-hosted servers

The release image runs the hosted MCP server itself, so `/mcp` works out of the box. Built from source, set `OUTFLARE_MCP_SERVER` to the bundled server (`pnpm --filter @outflare/mcp build && pnpm --filter @outflare/mcp bundle` writes `mcp/dist/outflare-mcp.mjs`) and, if `node` isn't on the path, `OUTFLARE_NODE`. Without them, the Connect your AI page shows how to [run the MCP server on your computer](/docs/agents/mcp/#run-it-on-your-computer) with an API token instead.

## Then just ask

The agent starts every conversation by reading what Outflare knows about your company and what is blocked ([memory and status](/docs/agents/memory/)), so you don't have to explain yourself each time. Some things to try:

- "What's stopping my outreach right now?"
- "Here's our website. Write up who we sell to and remember it."
- "Import the leads in this CSV, check them against the suppression list and draft a three-step sequence for them."
- "Which sequence books the most meetings per dollar?"
