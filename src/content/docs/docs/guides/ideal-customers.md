---
title: Ideal customers
description: Describe who you sell to once, in words and as filters, and every project and lead list uses it.
sidebar:
  order: 1.45
---

<span class="pill shipped">Shipped</span> In the web app, the REST API and the MCP server.

An ideal customer profile says who you sell to, once. [Projects](/docs/guides/projects/) and [lead list](/docs/guides/lead-lists/) fit scores read the same profile, so the same customer is never typed twice in different words.

In the app, open **Company** in the sidebar, then **Ideal customers**. Profiles live inside Outflare and call no third-party service.

## What a profile holds

| Part | What it is |
| --- | --- |
| Name | A short name, such as "Series A fintech, AU". |
| Description | Who they are and why they buy, in words. AI steps read it. |
| Filters | The same filters a lead search runs: job titles, seniority, industries, company size, locations and keywords. |
| Brand | Optional. A brand's profile fits only that brand's projects; a profile without a brand fits every project. |

## Profiles and projects

A project's ideal customer filters are always its profile's filters.

- Give a project an ideal customer and it gets a profile of its own, named after it.
- Pick another profile for a project, and that profile's filters become the project's.
- Change the filters in either place and both change. Every project that uses the profile gets a new brief version, so agents know their brief moved.
- Unlink a project and it keeps its filters.

Archiving a profile hides it from the list. Projects that use it keep their filters.

## From the API and agents

```sh
curl -X POST "https://app.outflare.ai/v1/workspaces/$WS/ideal-customer-profiles" \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" \
  -d '{"name": "Series A fintech, AU", "description": "Fintechs that just raised and need pipeline.",
       "filters": {"industries": ["Financial Services"], "employee_ranges": ["51-200"], "locations": ["Australia"]}}'
```

Link it to a project with `PATCH /v1/workspaces/{ws}/projects/{id}` and `{"profile_id": "..."}`. Reading needs the `projects.read` scope; making and changing profiles needs `projects.manage`.

MCP tools: `list_ideal_customer_profiles`, `get_ideal_customer_profile`, `create_ideal_customer_profile` and `update_ideal_customer_profile`.
