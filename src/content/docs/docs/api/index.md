---
title: API overview
description: The Outflare REST API. Base URL, authentication, errors, discovery and the OpenAPI contract.
---

Everything in Outflare is available through one REST API. The web app uses it, the SDK wraps it, and your scripts and agents call it directly. There is no private API.

## Base URL

Your instance serves the API under `/v1`, for example `http://localhost:8080/v1` or `https://outflare.example.com/v1`. Workspace resources live under `/v1/workspaces/{ws}/...`, where `{ws}` is the workspace ID or its slug (the name in its app URL, so `/v1/workspaces/geonode/mailboxes` works). A slug can be changed under Settings → General (`PATCH /v1/workspaces/{ws}`), so store the ID in scripts and integrations; it never changes. An old slug keeps working until another workspace takes it. The app's item URLs (`/geonode/sequences/q3-founders`) use readable slugs too; `GET /v1/workspaces/{ws}/links/{kind}/{ref}` turns one into the item's ID, but the rest of the API takes IDs.

## The contract

The API is described by an OpenAPI 3.1 document, [`api/openapi.yaml`](https://github.com/outflareai/outflare/blob/main/api/openapi.yaml). Your instance serves the exact version it runs:

```sh
curl localhost:8080/v1/openapi.yaml
```

Use it to generate a client in any language, import it into Postman or Insomnia, or give it to an agent. The [endpoint reference](/docs/api/reference/) on this site is generated from the same file.

## Discovery

Two unauthenticated endpoints let tools and agents find out what an instance offers:

```sh
curl localhost:8080/v1/meta
curl localhost:8080/.well-known/outflare.json
```

```json
{ "name": "Outflare", "version": "0.1.0", "api": { "rest": "/v1", "openapi": "/v1/openapi.yaml" }, "capabilities": [] }
```

## Authentication

Send an API token as a bearer token:

```sh
curl localhost:8080/v1/workspaces/$WS/mailboxes -H "Authorization: Bearer oft_..."
```

Tokens are scoped to one workspace and a list of scopes. See [Authentication](/docs/api/authentication/).

Every operation in the contract says who may call it in `x-outflare-access`, so a client or agent can check before calling:

| `x-outflare-access` | Who may call it |
| --- | --- |
| `{ scope: leads.manage }` | A member or workspace API token with that scope |
| `{ scope: leads.read, brand_limited: true }` | The same, including people and tokens kept to some brands (who see only their brands' records and shared ones) |
| `{ signed_in: true }` | Only a signed-in person, never an API token |
| (none) | Anyone: the endpoint is public |

The engine's tests check every value against the running server, so the contract cannot drift from what the server enforces.

## Responses

Responses are JSON. Lists are wrapped in a `data` array:

```json
{ "data": [ { "id": "…", "email": "ana@getacme.example", "status": "active" } ] }
```

API answers are never cached (`Cache-Control: no-store`), and every answer carries the usual security headers: `X-Content-Type-Options: nosniff`, a `Referrer-Policy`, `frame-ancestors 'none'`, and `Strict-Transport-Security` when the server is on https.

### Pagination

Every list that can grow large pages the same way. It answers `next_cursor`; pass it back as `cursor` for the next page, and stop when it is `null`. `limit` sets the page size.

```sh
curl "https://outflare.example.com/v1/workspaces/$WS/leads?limit=200" -H "Authorization: Bearer $OUTFLARE_TOKEN"
# → { "data": [...], "next_cursor": "YWZ0ZXI6Ni4uLg" }
curl "https://outflare.example.com/v1/workspaces/$WS/leads?limit=200&cursor=YWZ0ZXI6Ni4uLg" -H "Authorization: Bearer $OUTFLARE_TOKEN"
```

Cursors are opaque: don't build or decode them. A cursor the API did not give out answers `400 invalid_cursor`. The CLI's `--all` and the MCP tools page this way for you. (Lists also answer the older `next_before`, `next_after` or `next_offset` beside `next_cursor`, and those parameters keep working.)

### Choose the fields

Add `fields` to any `GET` to get back only what you read. A list trims each item in `data` and keeps its paging fields; a single object trims itself. `id` always comes back.

```sh
curl "https://outflare.example.com/v1/workspaces/$WS/leads?fields=email,company" -H "Authorization: Bearer $OUTFLARE_TOKEN"
# → { "data": [{ "id": "…", "email": "ana@acme.example", "company": "Acme" }], "next_cursor": null, … }
```

A name the items don't have answers `400 invalid_request` with `param: "fields"` and a message listing the fields they do have. The CLI takes `--fields email,company`, the Python SDK `fields=["email", "company"]`, and the MCP list tools a `fields` list, which keeps long answers small in an agent's context.

Work that runs in the background answers `202`, always with a JSON body (`{"queued": true}` when there is nothing more to say). Inside a [mission](/docs/agents/missions/), a workspace write can also answer `202` with a `MissionHeld` body instead of running: a dry run, or held until a person approves it. Its `mission_action` tells you what to follow.

## Safe retries

Every workspace write accepts an `Idempotency-Key` header. Send any unique string (a UUID is ideal) and you can retry the call as often as you need: a repeat from the same caller within 24 hours gets the first answer back, marked `Idempotent-Replayed: true`, instead of creating a second lead or recording spend twice.

```sh
curl -X POST https://outflare.example.com/v1/workspaces/$WS/leads \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" \
  -H "Idempotency-Key: 6f1c2f9e-2b1d-4c43-9a51-5c1f0d6e7a20" \
  -H "Content-Type: application/json" \
  -d '{"email": "ana@getacme.example"}'
```

- The key covers the method, path, query and body. Reusing it for a different request is refused with `422 idempotency_key_reused`.
- While the first request is still running, a repeat gets `409 idempotency_in_progress`. Wait a moment and retry.
- Client errors (`4xx`) are stored and replayed too, so a retry tells you the same thing. Server errors are not: the key is released and a retry runs again.
- Use a new key for each distinct write. Keys belong to the caller and the workspace, and expire after 24 hours.

## Background work

Work that takes a while (a sync, an import, a DNS check) runs in the background, and the call answers `202`. When it queued one job, the answer says which, and the `Location` header points at it:

```json
{ "queued": true, "job": { "id": "job_1042", "url": "/v1/workspaces/acme/jobs/job_1042" } }
```

Poll `GET` on that URL until `status` is `succeeded` or `failed`. A failed job carries the last attempt's `error`, and a job that failed an attempt but will retry stays `queued`, with `attempts` counting up. `GET /v1/workspaces/{ws}/jobs?status=failed` lists what went wrong anywhere in the workspace. Both need `workspace.read`. Finished jobs are kept for 14 days.

## Rate limits

Each API token may make 600 requests a minute (self-hosted servers set `API_RATE_LIMIT`). Every answer to a token says where it stands, in the IETF `RateLimit` headers:

```http
RateLimit-Policy: "token";q=600;w=60
RateLimit: "token";r=587;t=42
```

`r` is what is left in this window and `t` the seconds until it resets. Over the limit, the answer is `429 rate_limited` with `Retry-After` in seconds. People signed in to the web app are not limited this way.

## Errors

Every error uses the same shape, with a stable `code`, a readable `message` and the `request_id` to quote in bug reports. When a `400` is about one field, `param` names it, so a form or an agent can point at it without parsing the message. In the contract it is each operation's `default` response:

```json
{ "error": { "code": "invalid_request", "message": "url must be https", "param": "url", "request_id": "…" } }
```

| Status | Codes | Meaning |
| --- | --- | --- |
| `400` | `invalid_request` | The request is invalid. The message says why, and `param` names the field when there is one. |
| `400` | `invalid_cursor` | The `cursor` was not one this API gave out. |
| `401` | `unauthenticated`, `invalid_credentials` | Missing or invalid credentials. |
| `403` | `forbidden` | The token or member lacks the scope this endpoint needs. |
| `404` | `not_found`, `invalid_invite` | Not found, including workspaces you cannot see. |
| `409` | `conflict`, `already_set_up`, `last_owner` | Conflicts, such as running setup twice or removing the last owner. |
| `409` | `idempotency_in_progress` | A request with this `Idempotency-Key` is still running. |
| `413` | `invalid_request` | The upload is too large. |
| `415` | `invalid_request` | Wrong content type, for example a mailbox import that is not `text/csv`. |
| `422` | `idempotency_key_reused` | The `Idempotency-Key` was already used for a different request. |
| `429` | `rate_limited` | Over the token's rate limit, or too many failed sign-ins. Wait for `Retry-After`. |
| `500`, `503` | `internal`, `unavailable` | A server problem. Quote the `request_id`. |

These are the common ones. `GET /v1/error-codes` lists every code the API can answer, with its statuses, what it means and whether retrying can help, and needs no token. A test in the engine fails if a code is added without it, so the list is always complete.

## Webhooks

To hear about replies, bounces and paused mailboxes without polling, register a [webhook](/docs/api/webhooks/) under Settings → Webhooks or over the API. Deliveries are signed (Standard Webhooks) and retried.

Can't receive webhooks, say an agent or a script behind a firewall? Read the same events from the [events feed](/docs/api/webhooks/#no-public-url-read-the-events-feed) instead.

## Health

`GET /healthz` reports that the process is up and `GET /readyz` that it can reach Postgres. Neither needs authentication.
