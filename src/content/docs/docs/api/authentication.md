---
title: Authentication
description: Authenticate to the Outflare API with scoped API tokens or a session cookie.
---

The API accepts two kinds of credentials.

## API tokens

For scripts, integrations and agents. Create one in the web app under **API tokens**, or with the API (scope `tokens.manage`):

```sh
curl -X POST localhost:8080/v1/workspaces/$WS/api-tokens \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "lead-research-agent", "scopes": ["mailboxes.read"], "expires_in_days": 90}'
```

```json
{ "api_token": { "id": "…", "name": "lead-research-agent", "prefix": "oft_AbC", "scopes": ["mailboxes.read"] }, "token": "oft_…" }
```

The `token` secret is returned once. Store it in your secret manager. Send it on every request:

```http
Authorization: Bearer oft_...
```

Rules that keep tokens safe to hand to automation:

- A token is bound to one workspace. It cannot read any other workspace.
- A token can also be bound to one [project](/docs/guides/projects/#agents-and-project-tokens) with `"project_id"`. It then sees only that project's records, and endpoints that can't yet keep it inside the project refuse it with a 403.
- A token holds only the scopes it was given, and never more than the person who created it has.
- Actions taken with a token are recorded in the audit log under the token's name.
- Revoke a token with `DELETE /v1/workspaces/{ws}/api-tokens/{id}`. List active tokens, with when each was last used, with `GET /v1/workspaces/{ws}/api-tokens`.

See [Workspaces and access](/docs/guides/workspaces-and-access/#api-tokens) for the list of scopes.

## Session cookie

The web app signs people in with `POST /v1/auth/login` (email and password), which sets the `outflare_session` cookie. The SDK uses the cookie automatically in the browser when you do not give it a token. Ten failed attempts for one email lock it for 15 minutes. `POST /v1/auth/logout` ends the session.

## First-run setup

A new instance has no users. `GET /v1/setup` returns `{"needed": true}` until `POST /v1/setup` creates the first user and workspace:

```sh
curl -X POST localhost:8080/v1/setup -H "Content-Type: application/json" \
  -d '{"email": "you@example.com", "name": "You", "password": "at-least-10-chars", "workspace_name": "Acme"}'
```

This only works while the instance has no users, and it signs the new owner in.
