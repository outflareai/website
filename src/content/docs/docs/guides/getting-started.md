---
title: Get started
description: "A new workspace's first minutes: one brand set up from start to finish, with your AI key, its website script and DNS in one step, the tools your goal needs and a first mission. Every step can be skipped."
sidebar:
  order: 0.5
---

<span class="pill shipped">Shipped</span> The Get started page in the web app, the REST API and the MCP server.

A new workspace opens on **Get started** for its owners and admins. It is a page of its own, without the rest of the app, and it sets up **one brand** from start to finish before anything else. It ends with Outflare doing something for you: a first plan, written by your AI, waiting for your approval. Every step can be skipped, and so can the whole thing (**Skip setup**, top right). Outflare works with all of them skipped.

![Get started: one question per screen](/screens/get-started-brand.png)

## The steps

1. **Start with one brand.** Its website, the brand name (filled in from the domain) and, if you like, a line on what it does. Agents read it before writing anything for the brand, and the company's name and website are filled in too if they're empty. Market more than one business? Add the rest later under [Brands](/docs/guides/brands/), once this one works.
2. **Add your AI key.** Outflare has no AI of its own and never pays for yours: your own Claude, OpenAI, Gemini, Mistral, xAI or router (OpenRouter, Vercel AI Gateway, Requesty) key is what lets its agent plan [missions](/docs/agents/missions/), write emails and research companies. You pay your provider directly, at their prices, with nothing added. The key is tested before it's saved, stored encrypted and never shown again. Without one, reports, tracking and connections still work; anything that needs AI waits until you add it. [Connecting Claude or ChatGPT](/docs/agents/mcp/) to run Outflare from the app you already use does the step too.
3. **What to do first.** Find and email new customers, grow search traffic, see what's working, or nurture existing customers. It only decides what later steps suggest; you can do all of them later.
4. **Connect your website.** Two parts, both for the brand you just added:
   - **The script.** One line on every page that records visits, sign-ups and where they came from, added in one click through your own Google Tag Manager, or sent to a developer or your AI coding tool.
   - **Your DNS records, all at once.** Every record the brand needs on its domain in one list: the one that proves the site is yours, and, once you set them up, your sending domains' and tracking domain's records. **Add them all** adds every missing one through your own Cloudflare in one go, or approves them at your DNS provider one after another. Added them by hand? Press **I've added them, check now** and each record is marked found or not found yet. See [Brand setup](/docs/guides/brand-setup/#your-dns-records-in-one-go).
5. **Connect what it needs.** The few tools your goal uses, such as Search Console and Google Analytics for search, or your CRM and lead data for outreach. **See all connectors** opens the full list. A tool you sign in to brings you back here afterwards.
6. **Star and follow Outflare.** Outflare is free and open source: a star on GitHub helps other teams find it, and following on X is where new features show up first. Each is one click and optional. The same step asks, also optionally, how you heard about Outflare: one tap from a short list.
7. **Start your first mission.** A first goal, already written for what you picked, that you can edit. Your AI drafts the plan: steps, limits and the tools it needs. Nothing runs until you approve it.

When you're through, **Continue with Acme** takes you on to the rest of that brand's [setup](/docs/guides/brand-setup/): analytics, Search Console, email, payments, ads, social and your CRM.

![Connecting the tools a goal needs](/screens/get-started-analytics.png)

## Then Home

Home shows one set-up checklist at a time: what's left of Get started first, then the brand's setup. Get started's list includes **Invite your team**, which waits until you've seen Outflare work. **Open** takes you back to that step; × hides the checklist.

![The checklist on Home](/screens/get-started-home.png)

## Help Outflare grow

Get started has a **Star and follow Outflare** step before your first mission: **Star us on GitHub** and **Follow us on X**. Each is one click: it opens the page in a new tab and ticks the item. Nobody can check a star or a follow, so opening the link counts, and the step is done once you've opened both. Skip it like any step. Home shows the same two items to anyone who hasn't opened them; each person has their own, and **Hide** puts them away for good.

On a self-hosted server, `OUTFLARE_COMMUNITY_LINKS=off` turns them off for everyone, and `OUTFLARE_FOLLOW_URL=off` hides only **Follow us on X** (see [Configuration](/docs/self-hosting/configuration/)).

## Skip anything, come back any time

- **Skip this step** moves on and marks it skipped. Skipping turns nothing off.
- A step **ticks itself off** however it was done: adding a brand on the Brands page, connecting a tool from Connectors, or an agent doing it for you all count.
- Open Get started again any time from the command palette (⌘K, then "Get started").

Get started is one per workspace, not per person: someone you invite doesn't go through it again.

## For agents

Agents see the same steps, so they can offer to help with whatever is left instead of asking you to click through.

- `get_context`, the first call of every conversation, includes `onboarding`.
- `get_onboarding` lists each step (`brand`, `ai`, `goal`, `website`, `connect`, `community`, `mission`, `team`) with `done`, `skipped`, `walkthrough` (false for inviting the team, which is on Home), the page that does it and the MCP `tool` an agent can use (empty when it needs a person). `goal` is what the workspace picked to do first, and `brand` the brand it sets up. The `website` step is done once the script is on the site and its DNS records are added (`get_brand_dns`).
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
