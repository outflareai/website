---
title: Email verification
description: Every lead is checked before its first email, with free built-in checks or the verification service you connect.
sidebar:
  order: 3
---

<span class="pill shipped">Shipped</span>

Every lead's address is checked before its first email, and undeliverable addresses are never emailed. With nothing connected, Outflare runs free built-in checks (syntax, mail servers, throwaway domains and role addresses). [Connect](/docs/integrations/connectors/) ZeroBounce, NeverBounce, MillionVerifier, Bouncer, Reoon, Emailable, DeBounce or Hunter for a full mailbox check.

## Results

Every service's answer is mapped to one of four statuses:

| Status | Meaning | Emailed? |
| --- | --- | --- |
| `deliverable` | The mailbox exists. | Yes |
| `undeliverable` | It doesn't exist, the domain takes no mail, or it is a throwaway address. | Never |
| `risky` | For example a catch-all domain or a role address such as info@. | Your choice |
| `unknown` | The service couldn't tell. | Your choice |

Each result also has `catch_all`, `disposable`, `role` and `free` flags and the service's own wording. The Leads page shows the result on every lead and filters by it (`?verification=` on the API).

## Settings

`GET` and `PUT /v1/workspaces/{ws}/verification-settings` choose the service, whether imports are verified straight away, whether a first email waits for a result, and which statuses are blocked. If the service rejects the key or runs out of credits, Outflare falls back to the built-in checks so sending isn't held up, and the connection shows the error.

## Verify on demand

```sh
curl -X POST https://outflare.example.com/v1/workspaces/$WS/verifications \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" -d '{"list_id": "'$LIST'"}'
```

Send `emails`, a `list_id`, or `{"unverified": true}` for every lead not checked yet. `GET /verifications/summary` gives counts by status. Agents use `verify_emails` and `verification_summary`.
