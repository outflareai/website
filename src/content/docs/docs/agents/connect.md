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

Set up on chatgpt.com.

1. In ChatGPT, open **Plugins**, click **+** and choose **Add custom MCP server**.
2. Name it **Outflare**, paste `https://app.outflare.ai/mcp` as the **Server URL** and choose **OAuth** for authentication.
3. Click **I understand and want to continue**, then **Create**. Install the Outflare plugin: ChatGPT sends you to Outflare to pick the workspace and approve.
4. In a new chat, type **@**, pick **Outflare** and ask it something.

On a Business, Enterprise or Edu workspace, an admin first allows **Create plugins with MCPs** under **Workspace settings → Permissions & roles**. ChatGPT renames these menus from time to time; if one doesn't match, look for Plugins or Apps.

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

An app that can't sign in can send an [API token](/docs/api/authentication/) instead, as the header `Authorization: Bearer oft_...`. Create one under **Settings → API tokens** and choose **Can make changes** (or pick area by area).

## What you approve

When an app connects, Outflare shows who is asking, the workspace it will work in (pick one if you are in more than one) and a switch for each thing it may do. Everything starts on except spending:

- **See your workspace**: always on. It reads leads, sequences, replies, mailboxes and results.
- **Company context and memories**, **Leads and lists**, **Sequences and customer profiles**, **Replies**, **Mailboxes, domains and connectors**, **SEO** and **Missions**: turn off anything you don't want it to change. **Read only** turns them all off at once.
- **Spend money**: off unless you switch it on. Left off, every purchase of domains or mailboxes waits for you to approve it in Outflare.

You only see the switches your role allows; viewers can only give read access.

Whatever you choose, a connected app can never invite or remove people, change the workspace, create API tokens, manage webhooks, edit the suppression list or approve its own missions. Every email still goes through the [policy check](/docs/concepts/policy-check/), and every change is in the audit log under the app's name.

If Outflare doesn't recognise the app, the screen says so and shows where it will send you back. Only continue if you started connecting from there. Outflare recognises Claude, ChatGPT, Cursor, VS Code and apps on your own computer. Any other app may only read until the person who runs your Outflare server checks it (`outflare verify-app <client_id>`, with the id shown on the app's page).

### Changes happen inside missions

A connected app reads freely, but it makes changes only inside a [mission](/docs/agents/missions/) you approved. Asked to change something outside one, it is told to start a mission, which waits for you to approve its plan; then its changes follow the mission's mode (dry run, approve each change, or autonomous). To let an app change things directly, open it on the **Connect your AI** page and turn off **Only inside missions**.

## Change or disconnect apps

Connected apps are listed on the **Connect your AI** page with who connected them, what they may do and when they were last used. Click one to see the same switches you approved and change them: each switch saves at once, and the app gets the change on its next request, with no need to connect again. If you turn on changes for an app that was read only, start a new chat in the app so it picks up the tools that make changes. **Disconnect** cuts an app off at once. You can change or disconnect your own apps; owners and admins can change or disconnect anyone's. Connecting the same app again takes you through the approval screen once more and replaces the old connection.

When an app tries something it isn't allowed to do, Outflare tells it which switch is off and links to the app on this page, so it can send you straight there. An app also loses access when the person who connected it leaves the workspace.

Under the hood each connection is a short-lived token that the app refreshes. Outflare stores only hashes of the tokens, and if a refresh token is ever used twice, it disconnects the app.

## Self-hosted servers

The release image runs the hosted MCP server itself, so `/mcp` works out of the box. Built from source, set `OUTFLARE_MCP_SERVER` to the bundled server (`pnpm --filter @outflare/mcp build && pnpm --filter @outflare/mcp bundle` writes `mcp/dist/outflare-mcp.mjs`) and, if `node` isn't on the path, `OUTFLARE_NODE`. Without them, the Connect your AI page shows how to [run the MCP server on your computer](/docs/agents/mcp/#run-it-on-your-computer) with an API token instead.

## Then just ask

The agent starts every conversation by reading what Outflare knows about your company and what is blocked ([memory and status](/docs/agents/memory/)), so you don't have to explain yourself each time. Some things to try:

- "What's stopping my outreach right now?"
- "Here's our website. Write up who we sell to and remember it."
- "Import the leads in this CSV, check them against the suppression list and draft a three-step sequence for them."
- "Which sequence books the most meetings per dollar?"
