---
title: API overview
description: The Outflare REST API. Base URL, authentication, errors, discovery and the OpenAPI contract.
---

Everything in Outflare is available through one REST API. The web app uses it, the SDK wraps it, and your scripts and agents call it directly. There is no private API.

## Base URL

Your instance serves the API under `/v1`, for example `http://localhost:8080/v1` or `https://outflare.example.com/v1`. Workspace resources live under `/v1/workspaces/{ws}/...`, where `{ws}` is the workspace ID.

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
| `{ scope: leads.read, project_tokens: true }` | The same, and project tokens (which only see their project) |
| `{ agency_role: admin, agency_tokens: true }` | Agency members with that role or above, and the agency's tokens |
| `{ signed_in: true }` | Only a signed-in person, never an API token |
| (none) | Anyone: the endpoint is public |

The engine's tests check every value against the running server, so the contract cannot drift from what the server enforces.

## Responses

Responses are JSON. Lists are wrapped in a `data` array:

```json
{ "data": [ { "id": "…", "email": "ana@getacme.co", "status": "active" } ] }
```

The audit log pages backwards in time: pass `before=` the `next_before` value from the previous page.

Work that runs in the background answers `202`, always with a JSON body (`{"queued": true}` when there is nothing more to say). Inside a [mission](/docs/agents/missions/), a workspace write can also answer `202` with a `MissionHeld` body instead of running: a dry run, or held until a person approves it. Its `mission_action` tells you what to follow.

## Safe retries

Every workspace write accepts an `Idempotency-Key` header. Send any unique string (a UUID is ideal) and you can retry the call as often as you need: a repeat from the same caller within 24 hours gets the first answer back, marked `Idempotent-Replayed: true`, instead of creating a second lead or recording spend twice.

```sh
curl -X POST https://outflare.example.com/v1/workspaces/$WS/leads \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" \
  -H "Idempotency-Key: 6f1c2f9e-2b1d-4c43-9a51-5c1f0d6e7a20" \
  -H "Content-Type: application/json" \
  -d '{"email": "ana@getacme.co"}'
```

- The key covers the method, path, query and body. Reusing it for a different request is refused with `422 idempotency_key_reused`.
- While the first request is still running, a repeat gets `409 idempotency_in_progress`. Wait a moment and retry.
- Client errors (`4xx`) are stored and replayed too, so a retry tells you the same thing. Server errors are not: the key is released and a retry runs again.
- Use a new key for each distinct write. Keys belong to the caller and the workspace, and expire after 24 hours.

## Errors

Every error uses the same shape, with a stable `code`, a readable `message` and the `request_id` to quote in bug reports. In the contract it is each operation's `default` response:

```json
{ "error": { "code": "not_found", "message": "workspace not found", "request_id": "…" } }
```

| Status | Codes | Meaning |
| --- | --- | --- |
| `400` | `invalid_request` | The request is invalid. The message says why. |
| `401` | `unauthenticated`, `invalid_credentials` | Missing or invalid credentials. |
| `403` | `forbidden` | The token or member lacks the scope this endpoint needs. |
| `404` | `not_found`, `invalid_invite` | Not found, including workspaces you cannot see. |
| `409` | `conflict`, `already_set_up`, `last_owner` | Conflicts, such as running setup twice or removing the last owner. |
| `409` | `idempotency_in_progress` | A request with this `Idempotency-Key` is still running. |
| `413` | `invalid_request` | The upload is too large. |
| `415` | `invalid_request` | Wrong content type, for example a mailbox import that is not `text/csv`. |
| `422` | `idempotency_key_reused` | The `Idempotency-Key` was already used for a different request. |
| `429` | `rate_limited` | Too many attempts, for example repeated failed sign-ins. |
| `500`, `503` | `internal`, `unavailable` | A server problem. Quote the `request_id`. |

## Health

`GET /healthz` reports that the process is up and `GET /readyz` that it can reach Postgres. Neither needs authentication.
