---
title: Logs
description: Every API call in your workspace, from the web app, the API, MCP agents, the CLI and missions. Search, filter, follow live and export.
---

Every API call made in a workspace is in its request log: calls from the web app, scripts using the API, AI agents over MCP, the CLI and missions. Each one shows its status, how long it took, the error code if it failed, the operation, the MCP tool and agent app, and who made it. Use it to see what an agent did, find out why a call failed, or check how often an integration calls Outflare.

## In the app

Open **Logs** in the sidebar (owners and admins).

- **Search** the path, operation, error code, request ID or MCP tool. Paste the `request_id` from an error message to find that call. Press `/` to jump to the search box.
- **Filter** by time range (15 minutes to 30 days), source (web app, API, MCP, missions, CLI, SDK), status (`2xx`, `4xx`, `5xx`, or a code such as `429`) and level: **Info** worked, **Warning** was refused (a `4xx`, such as bad input or a missing scope), **Error** broke (a `5xx`). The brand picker narrows logs to calls about one brand.
- **The chart** shows calls over the time range by level, with the share that failed. Click a bar to zoom in to that stretch of time.
- **Live** shows new calls at the top every two seconds.
- **Open a call** to see why it failed and what to do: its error code and what it means, the field a bad request named or the scope a refused call was missing, and whether retrying can work. It also shows the request ID, route, source, MCP tool, who made it and what it changed (the [audit log](/docs/guides/workspaces-and-access/) entries it wrote). Click a value, such as the operation, the error or the token, to show only calls like it. Press ↑ and ↓ to step through calls, and copy a call's details for a bug report.
- **Share** copies a link to the view with its filters, for anyone in the workspace who can see logs.
- **Export** downloads the filtered calls as CSV, or as JSON with one call per line.
- **Background jobs** lists syncs, imports, DNS checks and other work running in the background. Open a failed job to read its whole error.

## What is kept, and for how long

Logs keep only what describes a call: the method, path, operation, status, duration, error code (with the field or scope it named), source, client, MCP tool, agent app, mission, who made it, the brand and project it was about, the request ID and the **names** of query parameters. They never keep request or response bodies, query values (so searches and email addresses stay out), headers, API keys or IP addresses.

Logs are kept for **30 days**. On a self-hosted server, set `OUTFLARE_LOG_RETENTION_DAYS` to change that (see [Configuration](/docs/self-hosting/configuration/)).

Reading logs needs the `audit.read` scope, which owners and admins have. An API token bound to a brand sees only calls about that brand.

## Over the API

```sh
# Calls that failed in the last hour, from agents
curl "https://app.outflare.ai/v1/workspaces/$WS/logs?level=warning,error&surface=mcp&since=1h" \
  -H "Authorization: Bearer $OUTFLARE_TOKEN"

# One call, and what it changed, by the request_id from an error
curl "https://app.outflare.ai/v1/workspaces/$WS/logs/$REQUEST_ID" -H "Authorization: Bearer $OUTFLARE_TOKEN"
```

`GET /v1/workspaces/{ws}/logs` takes these filters, each optional and most comma-separated:

| Parameter | Example | Meaning |
| --- | --- | --- |
| `level` | `warning,error` | `info`, `warning` (4xx) or `error` (5xx) |
| `status` | `4xx,500` | Status codes or classes |
| `surface` | `mcp,mission` | `web`, `api`, `mcp`, `cli`, `sdk` or `mission` |
| `method` | `POST` | HTTP methods |
| `operation` | `createLead` | Operation ids from the [endpoint reference](/docs/api/reference/) |
| `error_code` | `rate_limited` | Error codes (`GET /v1/error-codes`) |
| `mcp_tool` | `create_lead` | Calls one MCP tool made |
| `request_id`, `actor_id`, `token_id`, `mission_id`, `project_id`, `brand` | | One call, person, token, mission, project or brand |
| `q` | `leads` | Text in the path, operation, error code, request ID, tool or client |
| `since`, `until` | `24h`, `2026-10-26T09:00:00Z` | A time, or how long ago (`15m`, `24h`, `7d`) |

Answers are newest first; page back with `cursor=next_cursor`. To follow new calls, call once with `after=latest`, then again with `after=next_after` every few seconds: those pages are oldest first and `next_after` is always set, so you never miss or repeat a call.

`GET .../logs/{id}` returns one call by log ID (`log_...`) or request ID, with the audit log entries it wrote. `GET .../logs/export?format=csv` (or `ndjson`) downloads up to 50,000 calls matching the same filters, and `GET .../logs/histogram` counts them by level over time.

## From the CLI and agents

```sh
outflare logs                          # the latest 50 calls, oldest first
outflare logs --follow --level error   # then every new failure as it happens
outflare logs --surface mcp --since 1h --lines 200
```

In a terminal each call is one line; piped, each is a JSON object, so `outflare logs --follow | jq` works. Every endpoint above is also a command (`outflare list-logs`, `outflare get-log`, `outflare export-logs`).

Agents use the `list_logs` and `get_log` [MCP tools](/docs/agents/mcp/), for example to check why their own calls failed: "Which of my calls failed in the last hour, and why?"
