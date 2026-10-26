---
title: Get started
description: "The first steps in a new workspace, each one skippable: add your brand, invite your team, add an AI model, and connect your analytics and other tools."
sidebar:
  order: 0.5
---

<span class="pill shipped">Shipped</span> The Get started page in the web app, the REST API and the MCP server.

A new workspace opens on **Get started** for its owners and admins. It walks you through what makes Outflare useful on day one: who you are, who you work with, and the tools you already use. It takes a few minutes, every step can be skipped, and Outflare works with all of them skipped.

![Get started: the steps on the left, the step you're on on the right](/screens/get-started-brand.png)

## The steps

1. **Add your brand.** Its name, website and a sentence or two on what it does. Agents read it before writing anything for the brand, and the company's name and website are filled in too if they're empty. Market more than one business? Add the rest later under [Brands](/docs/guides/brands/).
2. **Invite your team.** An email and a role for each person: admins connect tools and invite people, operators run outreach, viewers can only look. Invites are emailed and the link works for 7 days.
3. **Add an AI model.** Connect your own Claude key (OpenAI, Gemini and Mistral are on the way). [Missions](/docs/agents/missions/) use it to plan from a goal and Outflare's own agent uses it to run them. The key is tested before it's saved, stored encrypted and never shown again.
4. **Connect your analytics.** Google Analytics, Search Console, PostHog or any of the [analytics tools](/docs/integrations/analytics/) Outflare reads, so reports show what is working.
5. **Connect your other tools.** Your CRM, lead data, email verification, calendar or the sequencer you use now. The page suggests one of each kind; **See all connectors** opens the full list.

Connecting happens on the page itself. A tool you sign in to (Google, HubSpot, PostHog) brings you back to Get started afterwards.

![Connecting analytics without leaving Get started](/screens/get-started-analytics.png)

## Skip anything, come back any time

- **Skip for now** moves on and marks the step as skipped. Skipping turns nothing off.
- A step **ticks itself off** however it was done: adding a brand on the Brands page, inviting someone from Members, or an agent connecting a tool for you all count.
- **Finish later** takes you Home, where a reminder shows how far you got and what's next. Hide it with ×.
- Open Get started again any time from the command palette (⌘K, then "Get started").

![The reminder on Home](/screens/get-started-home.png)

Get started is one per workspace, not per person: someone you invite doesn't go through it again.

## For agents

Agents see the same steps, so they can offer to help with whatever is left instead of asking you to click through.

- `get_context`, the first call of every conversation, includes `onboarding`.
- `get_onboarding` lists each step with `done`, `skipped`, the page that does it and the MCP `tool` an agent can use (empty when it needs a person, such as inviting someone).
- `update_onboarding` skips steps (`skip`), brings them back (`unskip`) or closes the walk-through (`dismissed`).

Over the REST API:

```sh
curl -H "Authorization: Bearer $OUTFLARE_TOKEN" \
  https://app.outflare.ai/v1/workspaces/acme/onboarding

curl -X PATCH -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" \
  -d '{"skip": ["team"]}' \
  https://app.outflare.ai/v1/workspaces/acme/onboarding
```

Reading needs `workspace.read`; skipping and closing need `workspace.manage`. See the [endpoint reference](/docs/api/reference/) for every field.
