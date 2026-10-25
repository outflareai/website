---
title: Usage stats and update checks
description: What the anonymous daily report from a self-hosted server contains, why we ask, and how to turn it off.
sidebar:
  order: 3
---

A self-hosted Outflare server sends one small, anonymous report a day. In return it finds out whether a newer version or a security fix exists, and shows that under **Settings → This server**. WordPress, GitLab, Grafana and Discourse work the same way: the update check and the usage count are one call.

We ask because it is the only way to know how many servers run Outflare, which versions are still in use when a security fix ships, and which connectors people rely on. The report is anonymous, its counts are ranges, and it takes one setting to turn off.

## Turn it off

Any one of these stops it completely. Nothing is sent, and update checks stop too.

- On the first-run setup form, switch off **Send anonymous usage stats**.
- Later, under **Settings → This server**, or with `PATCH /v1/instance/telemetry` and `{"enabled": false}`. Only the person who set up the server can change it.
- On the server, set `OUTFLARE_TELEMETRY=off` or `DO_NOT_TRACK=1` in `deploy/.env`. The environment overrides the setting.
- Send it to your own collector with `TELEMETRY_URL=https://...`, or set `TELEMETRY_URL=` (empty) to send nothing.

A build from source sends nothing unless it is given a stats server. Official releases are built with one.

## What is sent

`GET /v1/instance/telemetry/preview`, or **See exactly what is sent** under Settings → This server, returns the exact report. A typical one:

```json
{
  "schema": 1,
  "instance_id": "6f1c0c9e-3b0e-4c55-9c0e-6b2f0d1f8a43",
  "version": "v0.3.0",
  "os": "linux",
  "arch": "amd64",
  "go_version": "go1.25.0",
  "container": true,
  "postgres_major": 16,
  "install_age_days": "26-50",
  "counts": {
    "users": "2-5",
    "workspaces": "1",
    "mailboxes": "51-100",
    "active_mailboxes": "26-50",
    "leads": "1001-5000",
    "active_sequences": "2-5",
    "sent_24h": "251-500",
    "replies_24h": "6-10",
    "projects": "1",
    "missions": "0",
    "api_tokens": "2-5",
    "active_users_7d": "1"
  },
  "connectors": ["emailbison", "hubspot", "zerobounce"]
}
```

| Field | What it is | Why we ask |
| --- | --- | --- |
| `instance_id` | A random id created with the database. It identifies this install and nothing else. | To count servers rather than reports |
| `version` | The Outflare version | To know who still runs a version with a known problem |
| `os`, `arch`, `go_version`, `container`, `postgres_major` | The platform | To know which platforms to build and test for |
| `install_age_days` | Days since setup, as a range | To see whether people keep using it after trying it |
| `counts.*` | Sizes as ranges (`0`, `1`, `2-5`, `6-10` … `100000+`), never exact numbers | To see whether servers are really used, and how big they get |
| `connectors` | The ids of connectors in use, such as `hubspot` | To decide which integrations to invest in |

## What is never sent

Names, email addresses, domains, the server's URL or hostname, lead or company data, email subjects or bodies, sequence or project names, credentials, API tokens, connector account details, and anything you type. The collector doesn't store the IP address a report came from.

## What comes back

The answer contains the newest version and any notices for the version you run, such as a security fix. The server treats the answer as plain data: it keeps at most ten notices, keeps links only if they use `https`, and never runs anything from it.

## When it runs

The first report goes a few minutes after the server starts, then once a day at a random minute. If a report fails, it's retried an hour later, and nothing else is blocked. Settings → This server shows where reports go, when the last one was sent, and the last error.

## Where the numbers go

The totals are public on the [usage stats page](/stats/), like WordPress's: servers running, versions, platforms, countries and connectors in use. Any group of fewer than five servers is shown as "other" there, so no single server can be picked out. Mail volumes and mailbox counts are only seen by the Outflare team.
