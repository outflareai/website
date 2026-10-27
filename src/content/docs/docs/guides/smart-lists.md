---
title: Smart lists
description: Groups of people on your customer records that keep themselves up to date from rules, sitting beside lead lists on the Lists page.
sidebar:
  order: 6.6
---

<span class="pill shipped">Shipped</span> Smart lists with field, event and lead list rules, a live count while you edit, and a refresh every 15 minutes, in the web app, the REST API and the MCP server.

A smart list is a group of people on your [customer records](/docs/guides/customer-records/) that keeps itself up to date. Outflare adds people when they start matching its rules and removes them when they stop, like the dynamic lists in older marketing tools. A [lead list](/docs/guides/lead-lists/) is the other kind: a fixed set of people you found or imported. Both sit side by side on the **Lists** page.

## Make one

Go to **Lists → New list → Smart list**, give it a name, add rules and watch the count change as you go. Nothing is saved until you press **Create smart list**, and the list fills a few seconds later.

Each rule tests one thing about a person:

- **A field** on their record, such as plan or country: is, is not, is more than, is less than, contains, is set or is not set. Numbers compare as numbers and text ignores case.
- **An event** they did, such as a payment: did or didn't, ever or in the last 7, 30, 90 or 365 days. Events from the website tracker don't count, because anyone with the site key can send them.
- **A lead list** they are in, or aren't, so a fixed list can feed a smart list.

Choose whether a person must match all the rules or any of them. Only people count: not companies, merged records or archived ones.

## Brands

A smart list for one brand holds that brand's people and the people shared by every brand. A list for every brand holds everyone. A member or token limited to some brands sees only its brands' people, and can only change its brands' lists.

## Staying up to date

Every smart list refreshes on its own every 15 minutes, which also moves people in and out of time windows such as "in the last 90 days". **Refresh now** does it straight away. A list whose rules take too long to check shows that it couldn't update; narrow the rules, for example with a time window on an event. Deleting a list never deletes the people in it.

## From the API and agents

```sh
# How many people would these rules pick? Nothing is saved.
curl -X POST "https://app.outflare.ai/v1/workspaces/$WS/smart-lists/preview" \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" \
  -d '{"rules": [{"attribute": "billing_plan", "op": "eq", "value": "pro"},
                 {"event": "payment_succeeded", "op": "exists", "within_days": 90}]}'

# Save it
curl -X POST "https://app.outflare.ai/v1/workspaces/$WS/smart-lists" \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" \
  -d '{"name": "Paying customers", "rules": [{"attribute": "billing_plan", "op": "eq", "value": "pro"}]}'

# Who is in it now, newest to join first
curl "https://app.outflare.ai/v1/workspaces/$WS/smart-lists/$LIST/members" \
  -H "Authorization: Bearer $OUTFLARE_TOKEN"
```

Reading smart lists needs the `customers.read` scope; making, changing, refreshing and deleting them needs `customers.manage`. The [MCP server](/docs/agents/mcp/) has `list_smart_lists`, `get_smart_list`, `list_smart_list_members`, `preview_smart_list`, `create_smart_list`, `update_smart_list`, `refresh_smart_list` and `delete_smart_list`.

## Coming next

Sending email broadcasts to a smart list, starting journeys when someone joins or leaves one, and switching a smart list on for each ad network you connect.
