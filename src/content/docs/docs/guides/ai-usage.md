---
title: AI usage and limits
description: See where your AI spend goes inside Outflare, tool by tool, set a monthly limit for each tool, and get warned before a limit is reached. Every call runs on your own AI key.
sidebar:
  order: 16
---

<span class="pill shipped">Shipped</span> AI usage in the app, through the API, as webhooks and for agents.

Everything Outflare does with AI runs on the [AI model](/docs/agents/ai-models/) you connect, with your own API key. Your provider bills your account for every call. Outflare doesn't pay for any AI and takes no responsibility for what it costs, so **set a hard spend limit in your provider's account** (Anthropic, OpenAI, Google, Mistral or OpenRouter). The limits in Outflare are a second line, not a guarantee.

When you connect an AI model, Outflare asks you to confirm this before it saves the key.

## Where your AI spend goes

**Settings → AI usage** shows one month at a time:

- **What you spent**, against the workspace's monthly AI limit, with the number of calls and tokens.
- **Each day**, so a spike stands out.
- **By tool**: which part of Outflare made the calls, what they cost and their share of the month.
- **By model**, across your providers.
- **The latest calls**, with the tool, model, tokens and cost of each.

The tools are:

| Tool | What it is |
| --- | --- |
| **Planning** | Drafting a mission from your goal |
| **Agent turns** | Outflare's agent starting a mission, answering you and acting on your decisions |
| **Routine check-ins** | The agent looking in on a running mission when nothing new came from you |
| **Reply labelling** | Labelling replies to your outreach that the built-in rules can't place |
| **Domain research** | Reading an unknown email domain's homepage to classify it |
| **AI visibility** | Checking AI answers about your brands against your brand's facts |
| **AI visibility sampling** | Asking the models you picked under [AI visibility](/docs/guides/ai-visibility/) about your brands |
| **Social replies** | Drafting replies to posts your [social watches](/docs/guides/social/) found |
| **Email verification** | Checking addresses the free checks could not settle |
| **Meaning-based search** | Turning your records, replies, meetings and deals into vectors so search can find them by what they mean. On by default, usually cents a month, and you can [turn it off](/docs/guides/query-and-search/#on-by-default-and-how-to-turn-it-off). [Why it costs anything](/docs/guides/query-and-search/#what-it-costs-and-why-it-shows-in-ai-usage) |

Costs are each model's price times the tokens, rounded up to the cent per call, or the provider's own figure where it reports one (OpenRouter). Your provider's bill is the final word. Outflare keeps only the counts, never what was asked or answered, and keeps them for 13 months.

## Limit what each tool can spend

The workspace's **monthly AI limit** (US$50 by default, under [AI model](/docs/agents/ai-models/#limit-what-ai-can-spend)) covers every AI call. On the AI usage page an owner or admin can also give any tool a **monthly limit of its own**, such as US$10 for reply labelling. A call stops at whichever limit comes first: planning answers `409` with `ai_budget_reached`, missions pause and say why, and background work such as reply labelling waits for next month or a higher limit. A limit of 0 turns the tool's AI off.

Limits count calendar months in UTC.

### Warn only

Every limit stops calls by default. To keep AI running past a limit, untick **Stop** next to that tool, or **Stop all AI calls at the workspace's monthly limit** for the workspace's limit, then save. A limit set to warn only still sends both emails below, but the calls carry on and your provider keeps billing you. Your provider's own hard limit still applies either way.

## Warnings before a limit is reached

When this month's AI spend reaches **80%** of a limit, and again when it **reaches** it, each owner and admin with a confirmed email address gets an email, once a month for each limit. The same moments are the `ai_budget.warned` and `ai_budget.reached` [webhooks](/docs/api/webhooks/#ai-spend), so you can post them to Slack or your own tools.

## Over the API and MCP

| Endpoint | MCP tool | What it does |
| --- | --- | --- |
| `GET /v1/workspaces/{ws}/ai-usage?month=2026-10` | `get_ai_usage` | A month of AI calls by tool, model and day, each tool's limit, and the 50 latest calls |
| `PUT /v1/workspaces/{ws}/ai-usage/limits` | `update_ai_tool_limits` | Replace the per-tool limits, in US cents, and choose which limits stop calls (`hard_stop` for the workspace's limit, `hard_stops` per tool; `false` only warns) |

```sh
curl -X PUT https://outflare.example.com/v1/workspaces/$WS/ai-usage/limits \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" \
  -d '{"limits": {"reply_labelling": 1000, "social_replies": 500}, "hard_stops": {"social_replies": false}}'
```

Reading needs the `integrations.read` scope and changing limits `integrations.manage`.
