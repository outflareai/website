---
title: Smart lists
description: Groups of people on your customer records that keep themselves up to date from rules, sitting beside lead lists on the Lists page.
sidebar:
  order: 6.6
---

<span class="pill shipped">Shipped</span> Smart lists with field, event, page visit, list and lead list rules, groups, rules written from a description, a live count while you edit, and a refresh every 15 minutes, in the web app, the REST API and the MCP server.

A smart list is a group of people on your [customer records](/docs/guides/customer-records/) that keeps itself up to date. Outflare adds people when they start matching its rules and removes them when they stop, like the dynamic lists in older marketing tools. A [lead list](/docs/guides/lead-lists/) is the other kind: a fixed set of people you found or imported. Both sit side by side on the **Lists** page.

## Make one

Go to **Lists → New list → Smart list**, give it a name, add rules and watch the count change as you go. Nothing is saved until you press **Create smart list**, and the list fills a few seconds later.

Each rule starts with what kind of test it is, and offers your own events, properties, sites, pages, fields and lists in searchable pickers:

- **Visited a page** on one of your sites: a site, a page whose path is, starts with or contains something, or both; at least so many times; ever, recently or more than so many days ago. Only visits from a browser the person signed in on, or reached from a tracked link in an email Outflare sent, count. So visitors who never gave their email or signed in are not in any list, and nobody can add someone to a list by faking page views.
- **Did something**: an event your product sends, such as a payment. Did or didn't, at least so many times, ever, in the last 7, 30, 90 or 365 days, or more than 30, 90 or 365 days ago. **Add a filter** tests the event's own details, such as payments over $100. Events from the website tracker don't count, because anyone with the site key can send them.
- **Has a field** on their record, such as plan or country, compared in the way that fits the field: is, is not, is one of, starts with or contains for text; more or less than for numbers; in the last so many days, more than so many days ago, before or after for dates; and is set or is not set for any field.
- **Is in a list**: another of the brand's lists, or not in it. A list can't depend on itself, and a list that another list uses can't be deleted until that list changes.
- **Their company**: a field on the company they work at.
- **Lifecycle stage** for one of your products.
- **Can be emailed**: whether they may get marketing email, as the People list shows it.
- **A lead list** they are in, or aren't, so a fixed list can feed a smart list.

Above the count, the rules read back as one sentence, such as "People who did payment.succeeded, and none of (visited app.example.com)". If every rule only leaves people out, a warning says the list will hold nearly everyone.

### Describe it in words

Type who should be in the list, such as "people who paid in the last 90 days but never opened the app", and press **Write the rules**. Your workspace's own AI model writes the rules from your field, event, page and list names. It never sees people or their details. The rules appear in the builder with a sentence on who they pick, for you to check, change and save. Nothing is saved until you save it. This uses the AI model you connected with your own key; without one, the box links to Connectors to add it. Outflare never supplies an AI key.

Choose whether a person must match all the rules or any of them. Only people count: not companies, merged records or archived ones.

### Groups: "and", "or" and "not" together

To mix "and" with "or", or to leave people out, press **Add a group**. A group holds rules of its own and says how many of them must be true:

- **All of these are true**
- **Any of these is true**
- **None of these is true**: anyone who matches a rule in the group is left out.

For example, people who signed up and have neither paid nor been refunded: a rule "did signed_up", then a group set to **None of these is true** with "did payment.succeeded" and "did payment.refunded". A group can hold another group, and the count updates as you build it. Remove a group with **Remove group**.

## Brands

A smart list for one brand holds that brand's people and the people shared by every brand. A list for every brand holds everyone. A member or token limited to some brands sees only its brands' people, and can only change its brands' lists.

## Staying up to date

Every smart list refreshes on its own every 15 minutes, which also moves people in and out of time windows such as "in the last 90 days". **Refresh now** does it straight away. A list whose rules take too long to check shows that it couldn't update; narrow the rules, for example with a time window on an event. Deleting a list never deletes the people in it.

## Who is in it

Open a list to see its people. **Edit name and description** at the top renames the list and says what it is for. Each name opens that person's record. Beside it are their email, their lifetime value (everything they have paid, less refunds), the day they signed up and when they joined the list.

**Columns** chooses which of these show, and adds the day the person was first seen. **Save as my default** keeps your choice for every list in this browser; **Back to standard columns** drops it.

Lifetime value comes from your billing connection when you have one, and otherwise from the `payment.succeeded` and `payment.refunded` events your product sends, in the currency the person paid most in. The sign-up day is their first `signed_up` event, so it is blank for someone who has none.

## From the API and agents

```sh
# How many people would these rules pick? Nothing is saved.
curl -X POST "https://app.outflare.ai/v1/brands/$BRAND/smart-lists/preview" \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" \
  -d '{"rules": [{"attribute": "billing_plan", "op": "eq", "value": "pro"},
                 {"event": "payment_succeeded", "op": "exists", "within_days": 90}]}'

# Save it
curl -X POST "https://app.outflare.ai/v1/brands/$BRAND/smart-lists" \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" \
  -d '{"name": "Paying customers", "rules": [{"attribute": "billing_plan", "op": "eq", "value": "pro"}]}'

# Who is in it now, newest to join first
curl "https://app.outflare.ai/v1/brands/$BRAND/smart-lists/$LIST/members" \
  -H "Authorization: Bearer $OUTFLARE_TOKEN"
```

Reading smart lists needs the `customers.read` scope; making, changing, refreshing and deleting them needs `customers.manage`. `GET .../smart-lists/choices` lists the events, sites and pages rules can test, and `POST .../smart-list-drafts` writes rules from a description (read the result with `GET .../smart-list-drafts/{draft}`). The [MCP server](/docs/agents/mcp/) has `list_smart_lists`, `get_smart_list`, `list_smart_list_members`, `preview_smart_list`, `get_smart_list_choices`, `draft_smart_list`, `get_smart_list_draft`, `create_smart_list`, `update_smart_list`, `refresh_smart_list` and `delete_smart_list`.

## Coming next

Sending email broadcasts to a smart list, starting journeys when someone joins or leaves one, and switching a smart list on for each ad network you connect.
