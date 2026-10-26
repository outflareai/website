---
title: Test workspaces (sandbox)
description: Try sequences, replies and bounces, or build an integration, in a workspace where nothing emails anyone, verifies for real or buys anything.
---

A test workspace works exactly like a live one, with the same API, MCP tools, webhooks and app, but nothing in it reaches the outside world. Use it to learn Outflare, to try a sequence end to end in a minute, or to build and test an integration before you point it at real mailboxes.

## Create one

In the app, open **Settings → Workspace** and choose **Create a test workspace**. It comes with three mailboxes and ten sample leads. Over the API:

```sh
curl -X POST https://app.outflare.ai/v1/workspaces \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" \
  -d '{"name": "Sandbox", "test": true, "sample_data": true}'
```

Leave out `sample_data` for an empty one. A workspace is test or live for good: it cannot be switched later.

## What is different

- **Mailboxes are simulated.** They connect at once, with `provider: simulated`. A send is recorded as sent, with a real `Message-ID`, but delivered nowhere. A real mailbox you import into a test workspace becomes a simulated one, so no password is ever used.
- **Domains check out.** Sending domains get a healthy result (SPF, DKIM, DMARC) without DNS lookups, so mailboxes are ready to send.
- **Verification is made up and free.** An address containing `undeliverable`, `risky` or `unknown` gets that result. Any other address is deliverable. No credits are spent.
- **Nothing can be bought.** Approving an infrastructure plan answers `409 test_workspace`.
- **You can tell where you are.** Every answer carries `Outflare-Test-Workspace: true`, the workspace has `"test": true`, and so does the token's workspace in `GET /v1/whoami`. The app shows a banner.

## Run a sequence in a minute

Create a sequence, enroll leads and activate it as usual. Then send every due step at once, without waiting for step delays or the sending window:

```sh
curl -X POST https://app.outflare.ai/v1/workspaces/$WS/test/send-now \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" \
  -d '{"sequence_id": "'$SEQ'"}'
# {"queued": 8}
```

Call it again for the next step. Mailbox daily limits still apply, as they would live.

## Play the lead's side

Answer a sent email as the lead's mail server would. Give the lead (their latest email is answered) or the message, and a kind:

```sh
curl -X POST https://app.outflare.ai/v1/workspaces/$WS/test/inbound \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" \
  -d '{"lead_id": "'$LEAD'", "kind": "reply", "body": "Sounds good, how about Tuesday?"}'
```

| kind | What happens |
| --- | --- |
| `reply` | Lands in the inbox and stops the lead's sequence. `lead.replied` fires. |
| `auto_reply` | An out-of-office. Shows in the inbox; the sequence carries on. |
| `opt_out` | "Please remove me". Stops the sequence and suppresses the address. |
| `bounce` | A delivery failure report. Marks the enrollment bounced and suppresses the address. |

These go through the same code as real mail, so your webhook receiver, CRM sync or agent sees exactly what it would in production.

## From agents and the CLI

Over MCP the same calls are `send_now` and `simulate_inbound`. In the CLI they are `outflare send-now` and `outflare simulate-inbound --lead-id ... --kind bounce`. Both endpoints answer `409 live_workspace` in a live workspace, so an agent cannot use them by mistake on real outreach.
