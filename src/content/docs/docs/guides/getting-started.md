---
title: Get started
description: "A new workspace's first five minutes: your website, what to do first, your AI, the tools that goal needs and a first mission. Every step can be skipped."
sidebar:
  order: 0.5
---

<span class="pill shipped">Shipped</span> The Get started page in the web app, the REST API and the MCP server.

A new workspace opens on **Get started** for its owners and admins. It is a page of its own, without the rest of the app, and it ends with Outflare doing something for you: a first plan, written by your AI, waiting for your approval. It takes about five minutes. Every step can be skipped, and so can the whole thing (**Skip setup**, top right). Outflare works with all of them skipped.

![Get started: one question per screen](/screens/get-started-brand.png)

## The steps

1. **Your website.** Its address, the brand name (filled in from the domain) and, if you like, a line on what it does. Agents read it before writing anything for the brand, and the company's name and website are filled in too if they're empty. Market more than one business? Add the rest later under [Brands](/docs/guides/brands/).
2. **What to do first.** Find and email new customers, grow search traffic, see what's working, or nurture existing customers. It only decides what the next two steps suggest; you can do all of them later.
3. **Connect your AI.** Add your own Claude, OpenAI, Gemini, Mistral or OpenRouter key so Outflare's own agent can plan and run [missions](/docs/agents/missions/), or [connect Claude or ChatGPT](/docs/agents/mcp/) to run Outflare from the app you already use. Either one does the step. A key is tested before it's saved, stored encrypted and never shown again.
4. **Connect what it needs.** The few tools your goal uses, such as Search Console and Google Analytics for search, or your CRM and lead data for outreach. **See all connectors** opens the full list. A tool you sign in to brings you back here afterwards.
5. **Give it a goal.** A first goal, already written for what you picked, that you can edit. Your AI drafts the plan: steps, limits and the tools it needs. Nothing runs until you approve it.

![Connecting the tools a goal needs](/screens/get-started-analytics.png)

## Then Home

Home keeps one checklist of what's left, including **Invite your team**, which waits until you've seen Outflare work. **Open** takes you back to that step; × hides the checklist.

![The checklist on Home](/screens/get-started-home.png)

## Help Outflare grow

Get started has a **Star and follow Outflare** step before your first mission: **Star us on GitHub** and **Follow us on X**. Each is one click: it opens the page in a new tab and ticks the item. Nobody can check a star or a follow, so opening the link counts, and the step is done once you've opened both. Skip it like any step. Home shows the same two items to anyone who hasn't opened them; each person has their own, and **Hide** puts them away for good.

On a self-hosted server, `OUTFLARE_COMMUNITY_LINKS=off` turns them off for everyone, and **Follow us on X** shows only when `OUTFLARE_FOLLOW_URL` is set (see [Configuration](/docs/self-hosting/configuration/)).

## Skip anything, come back any time

- **Skip this step** moves on and marks it skipped. Skipping turns nothing off.
- A step **ticks itself off** however it was done: adding a brand on the Brands page, connecting a tool from Connectors, or an agent doing it for you all count.
- Open Get started again any time from the command palette (⌘K, then "Get started").

Get started is one per workspace, not per person: someone you invite doesn't go through it again.

## For agents

Agents see the same steps, so they can offer to help with whatever is left instead of asking you to click through.

- `get_context`, the first call of every conversation, includes `onboarding`.
- `get_onboarding` lists each step with `done`, `skipped`, `walkthrough` (false for inviting the team, which is on Home), the page that does it and the MCP `tool` an agent can use (empty when it needs a person). `goal` is what the workspace picked to do first.
- `update_onboarding` records the goal (`goal`: `outreach`, `search`, `reports` or `nurture`), skips steps (`skip`), brings them back (`unskip`) or closes the walk-through (`dismissed`).

Over the REST API:

```sh
curl -H "Authorization: Bearer $OUTFLARE_TOKEN" \
  https://app.outflare.ai/v1/workspaces/acme/onboarding

curl -X PATCH -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" \
  -d '{"goal": "search", "skip": ["ai"]}' \
  https://app.outflare.ai/v1/workspaces/acme/onboarding
```

Reading needs `workspace.read`; skipping and closing need `workspace.manage`. See the [endpoint reference](/docs/api/reference/) for every field.
