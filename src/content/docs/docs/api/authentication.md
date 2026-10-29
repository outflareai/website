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
- A token can also be kept to one [brand](/docs/guides/brands/#keep-people-and-tokens-to-some-brands) with `"brand"` (its handle or id) when you create it. It then sees that brand's records plus shared ones, changes only its brand's, and gets a 403 from endpoints that need every brand. Tokens can no longer be bound to a project: a new token sent with `"project_id"` is refused with a 400, and tokens that were bound to a project became workspace tokens with the same scopes ([Projects were removed](/docs/guides/projects/)).
- A token holds only the scopes it was given, and never more than the person who created it has. Any scope in an area includes reading it, so `leads.manage` can list leads too; it cannot read mailboxes.
- `GET /v1/whoami` tells a token its workspace (ID, slug and name), brand, scopes and expiry, so a script holding only a token can find everything else.
- Actions taken with a token are recorded in the audit log under the token's name.
- Rename a token or change its scopes with `PATCH /v1/workspaces/{ws}/api-tokens/{id}` (`name`, `scopes`). Adding a scope needs the caller to have it; taking one away is always allowed; a token can't change itself.
- A `403` for a missing scope says how to get it, with a link to the token (or, for a connected AI app, to its switches).
- Revoke a token with `DELETE /v1/workspaces/{ws}/api-tokens/{id}`. List active tokens, with when each was last used, with `GET /v1/workspaces/{ws}/api-tokens`.

See [Workspaces and access](/docs/guides/workspaces-and-access/#api-tokens) for the list of scopes.

## Session cookie

The web app signs people in with `POST /v1/auth/login` (email and password), which sets the `outflare_session` cookie. The SDK uses the cookie automatically in the browser when you do not give it a token. Ten failed attempts for one email, or 100 from one network, in 15 minutes are refused until the window passes (`429` with `Retry-After`). `POST /v1/auth/logout` ends the session.

## First-run setup

A new instance has no users. `GET /v1/setup` returns `{"needed": true}` until `POST /v1/setup` creates the first user and workspace:

```sh
curl -X POST localhost:8080/v1/setup -H "Content-Type: application/json" \
  -d '{"email": "you@example.com", "name": "You", "password": "at-least-10-chars", "workspace_name": "Acme"}'
```

This only works while the instance has no users, and it signs the new owner in.
