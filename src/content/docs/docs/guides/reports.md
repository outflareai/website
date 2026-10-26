---
title: Reports
description: What was sent and what happened to it, by day, week, sequence, step, mailbox or sending domain.
sidebar:
  order: 10
---

<span class="pill shipped">Shipped</span>

The Sending reports page, `GET /v1/workspaces/{ws}/reports` and the MCP tool `get_report` all answer the same question: what was sent, and what happened to it.

- **Period:** any range up to 400 days. The last 30 days by default.
- **Group by:** `day`, `week`, `sequence`, `step`, `mailbox` or `domain`.
- **Filter:** to one sequence, mailbox or domain with `sequence_id`, `mailbox_id` or `domain`.

Every row and the totals have sends, new leads contacted, follow-ups, failures, blocked sends, bounces, replies, auto-replies, opt-outs, unsubscribes, and link clicks (when [click tracking](/docs/guides/tracking-domains/) is on). Reply, bounce, opt-out and click rates are worked out per lead contacted.

```sh
curl -H "Authorization: Bearer $OUTFLARE_TOKEN" \
  "https://outflare.example.com/v1/workspaces/$WS/reports?from=2026-10-01&to=2026-10-31&group_by=mailbox"
```

Days and weeks follow the `timezone` you pass (an IANA name such as `Australia/Sydney`), or UTC.
