---
title: Ideal customers
description: Describe who you sell to once, in words and as filters, and every lead list scores against it.
sidebar:
  order: 1.45
---

<span class="pill shipped">Shipped</span> In the web app, the REST API and the MCP server.

An ideal customer profile says who you sell to, once. [Lead list](/docs/guides/lead-lists/) fit scores and the lead finder read the same profile, so the same customer is never typed twice in different words.

In the app, open **Company** in the sidebar, then **Ideal customers**. Profiles live inside Outflare and call no third-party service.

## What a profile holds

| Part | What it is |
| --- | --- |
| Name | A short name, such as "Series A fintech, AU". |
| Description | Who they are and why they buy, in words. AI steps read it. |
| Filters | The same filters a lead search runs: job titles, seniority, industries, company size, locations and keywords. |
| Brand | Optional, when it describes one brand's customers. A profile without a brand fits every brand. |

## Profiles and lead lists

A lead list's `profile_id` names the profile its leads are scored against. Pick it on the list, or send `profile_id` when you create or edit the list.

Archiving a profile hides it from the list. Lead lists that use it keep scoring against it. A change to a profile's description or filters bumps its `version`, so a lead list run can say which version it scored against.

Ideal customers used to live in projects. Projects were removed, and each list that was in a project now scores against that project's profile through its own `profile_id` ([Projects were removed](/docs/guides/projects/)).

## From the API and agents

```sh
curl -X POST "https://app.outflare.ai/v1/workspaces/$WS/ideal-customer-profiles" \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" \
  -d '{"name": "Series A fintech, AU", "description": "Fintechs that just raised and need pipeline.",
       "filters": {"industries": ["Financial Services"], "employee_ranges": ["51-200"], "locations": ["Australia"]}}'
```

Score a lead list against it:

```sh
curl -X PATCH "https://app.outflare.ai/v1/workspaces/$WS/lead-lists/$LIST" \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" -d '{"profile_id": "'$PROFILE'"}'
```

Reading profiles needs the `projects.read` scope; making and changing them needs `projects.manage`. The scopes kept their old names because existing tokens hold them.

MCP tools: `list_ideal_customer_profiles`, `get_ideal_customer_profile`, `create_ideal_customer_profile` and `update_ideal_customer_profile`.
