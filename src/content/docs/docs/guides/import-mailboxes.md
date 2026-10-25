---
title: Import mailboxes
description: Bulk-connect reseller inboxes on Google Workspace, Microsoft 365 or any SMTP and IMAP provider from a CSV file.
sidebar:
  order: 2
---

<span class="pill shipped">Shipped</span> CSV import with connection and DNS checks, and [password-free sign-in for Google Workspace and Microsoft 365](/docs/integrations/google-and-microsoft/). Bought from Cheap Inboxes? [Import them from your account](/docs/integrations/cheap-inboxes/) instead, no CSV needed.

Outbound teams rarely connect mailboxes one by one. They buy dozens or hundreds of inboxes from a reseller, hosted on Google Workspace or Microsoft 365, and get a spreadsheet of addresses and app passwords. Outflare imports that file as it is.

## Import a CSV

In the web app, go to **Mailboxes → Import CSV** and choose the file. Or send it to the API (scope `mailboxes.manage`):

```sh
curl -X POST "localhost:8080/v1/workspaces/$WS/mailboxes/import?pool=Warm" \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" \
  -H "Content-Type: text/csv" \
  --data-binary @mailboxes.csv
```

The response says how many mailboxes were created and updated, and lists any rows that failed by line number:

```json
{ "created": 98, "updated": 2, "errors": [{ "line": 41, "email": "bad@", "error": "invalid email \"bad@\"" }] }
```

Rows are matched by email, so importing the same file again updates mailboxes instead of duplicating them. Bad rows are reported and the rest still import. One file can hold up to 5000 rows and 5 MB.

## Columns

Only `email` and `password` are required. Header names are matched case-insensitively, and spaces, hyphens and underscores are treated the same, so most reseller and sequencer exports import unchanged.

| Field | Accepted headers |
| --- | --- |
| Email (required) | `email`, `email address`, `from email`, `sender email`, `mailbox`, `username` |
| Password (required) | `password`, `app password`, `app specific password`, or `smtp_password` |
| Display name | `name`, `display name`, `from name`, `sender name`, or `first name` and `last name` |
| Provider | `provider`, `esp`, `type`, `email provider` (`google`, `microsoft` or `other`) |
| SMTP | `smtp host`, `smtp port`, `smtp username`, `smtp password` |
| IMAP | `imap host`, `imap port`, `imap username`, `imap password` |
| Pool | `pool`, `mailbox pool`, `tag`, `tags`, `group` |
| Daily limit | `daily limit`, `daily sending limit`, `sending limit`, `max per day`, `daily cap`, `limit` |

A minimal file:

```csv title="mailboxes.csv"
email,password,daily_limit
ana@getacme.co,abcd efgh ijkl mnop,30
ben@getacme.co,qrst uvwx yzab cdef,30
```

## Google Workspace and Microsoft 365

You do not need host columns for Google Workspace or Microsoft 365. Outflare looks up each domain's MX records, detects the provider and fills in the servers:

| Provider | SMTP | IMAP |
| --- | --- | --- |
| Google Workspace | `smtp.gmail.com:465` | `imap.gmail.com:993` |
| Microsoft 365 | `smtp.office365.com:587` | `outlook.office365.com:993` |

For any other provider, add `smtp_host`, `smtp_port`, `imap_host` and `imap_port`. The password column is used for both SMTP and IMAP unless you give separate `smtp_password` and `imap_password` columns.

## Connection checks

After import, each mailbox is signed in to over SMTP and IMAP in a background job. Its status moves from `verifying` to `active`, or to `error` with the reason, such as a rejected password or IMAP being disabled. Re-run the check at any time with **Verify** or `POST /v1/workspaces/{ws}/mailboxes/{id}/verify`.

| Status | Meaning |
| --- | --- |
| `verifying` | A connection check is running. |
| `active` | SMTP and IMAP sign-in succeeded. |
| `paused` | You paused it. It will not send. |
| `error` | The last check failed. `status_reason` says why. |

Passwords are encrypted at rest with your instance's `OUTFLARE_SECRET_KEY` and are never returned by the API.

## Domain health

Every sending domain is checked for the records mailbox providers expect from bulk senders:

- **SPF**: `pass`, `missing` or `invalid`.
- **DKIM**: `pass` or `missing`. The usual selectors are tried: `google` for Google Workspace, `selector1` and `selector2` for Microsoft 365, and common ones such as `default`, `dkim`, `k1` and `s1` otherwise.
- **DMARC**: `pass`, `none_policy` (a `p=none` record) or `missing`.

Domains are re-checked every day, and blocklists are checked too. See each domain's health, the exact records to fix, its sending numbers and its settings (pause, daily cap) in the **Domains** tab, or with `GET /v1/workspaces/{ws}/sending-domains`. See [Sending domains](/docs/guides/sending-domains/).

Mailboxes from a cold-email SMTP vendor or your own mail server (anything outside Google and Microsoft) are also grouped by their SMTP host, so the IPs they share get blocklist checks and a shared daily limit. See [Sending servers](/docs/guides/sending-servers/).

## Pools and daily limits

A pool is a named group of mailboxes, such as `Warm` or `Client A`. Sequences send from a pool and rotate across its mailboxes. Set a pool per row with the `pool` column, or for the whole file with `?pool=` on the import. Pools are created if they do not exist; deleting a pool keeps its mailboxes.

Each mailbox has a daily limit between 1 and 500. New mailboxes default to **30 per day**, a safe start for reseller inboxes, which are usually run at 20 to 50 a day each. Change a mailbox's limit, pool or name, or pause and resume it, with `PATCH /v1/workspaces/{ws}/mailboxes/{id}`.

Each mailbox also has a minimum gap between two sends, `min_gap_seconds`, default 120 (0 to 3600), so a mailbox never sends in bursts. A small random extra is added to each gap.

## Test send

Before you start a sequence, send yourself one email from a mailbox with **Test send** on the Mailboxes page, or:

```sh
curl -X POST https://outflare.example.com/v1/workspaces/$WS/mailboxes/$MAILBOX/test-send \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" \
  -d '{"to": "you@yourdomain.com"}'
```

A test send goes through the recipient check and the mailbox's limits, and counts towards its daily limit. It returns `409` if the policy blocks it and `502` with the SMTP error if the server refuses it.
