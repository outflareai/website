---
title: GitHub and Vercel deploys
description: Watch the repository or project behind each website for production deploys, so fixes are re-checked and experiments start when a change goes live. Read only.
sidebar:
  order: 6
---

<span class="pill shipped">Shipped</span>

Outflare can watch the repository or project behind each of your websites
and record every production deploy. Features that wait for a change to go
live act on the deploy instead of guessing: a fix is re-checked once the
change ships, and an experiment starts on the real deploy.

It only reads. Outflare never pushes code, opens pull requests, deploys,
promotes or rolls back through these connections, and both run on your own
account.

## Connecting

| Connector | How it connects | What counts as a deploy |
| --- | --- | --- |
| GitHub | **Sign in with GitHub**, or a fine-grained personal access token with read-only Contents, Deployments and Metadata on the website's repositories | A deployment to a production environment (`production`, `Production`, `github-pages`, or one GitHub marks as production) whose latest status is success. A repository that records no deployments deploys on push: each commit to its default branch counts |
| Vercel | An access token from Account Settings → Tokens, plus the Team ID for a team's projects | A production deployment that reached Ready |

GitHub's sign-in has no read-only option for private repositories, so it
asks for repository access; Outflare still only reads. Use a fine-grained
token if you want the access itself to be read-only. On a self-hosted server,
signing in needs a GitHub OAuth app (`CONNECTOR_GITHUB_CLIENT_ID` and
`CONNECTOR_GITHUB_CLIENT_SECRET`); a token works on any server.

## Watching a website

On **Connectors**, click **Deploys** on the GitHub or Vercel connection (it
opens by itself right after you connect). Pick the repository or project
behind a website and the [site](/docs/guides/site-audits/) it serves:
Outflare suggests the site whose address matches the repository's homepage
or the project's production domains.

Each watched repository or project is checked every five minutes, or now with
**Check now**. The first check looks back seven days. Each deploy is kept with
its commit, branch, the first line of the commit message and a link to it on
GitHub or Vercel.

A deploy going live records `deploy.detected`, and one that fails
`deploy.failed`. Both are in the audit log and are
[webhooks](/docs/api/webhooks/), with the site it serves. If GitHub or Vercel
refuses a check, the repository or project shows why, and a refused token
marks the connection as needing attention.

## API and MCP

```sh
# What the connection can watch, with the domains each serves.
curl -s https://app.outflare.ai/v1/workspaces/$WS/integrations/$INTEGRATION/deploy-options \
  -H "Authorization: Bearer $OUTFLARE_TOKEN"

# Watch one. Without site_id, the matching site is picked.
curl -s -X POST https://app.outflare.ai/v1/workspaces/$WS/deploy-targets \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" \
  -d '{"integration_id": "'$INTEGRATION'", "target": "acme/website"}'

# When each website went live, newest first.
curl -s "https://app.outflare.ai/v1/workspaces/$WS/deploys?site_id=$SITE" \
  -H "Authorization: Bearer $OUTFLARE_TOKEN"
```

| Endpoint | Scope |
| --- | --- |
| `GET /v1/workspaces/{ws}/integrations/{id}/deploy-options` | `integrations.read` |
| `GET`, `POST /v1/workspaces/{ws}/deploy-targets` | `integrations.read`, `integrations.manage` |
| `GET`, `PATCH`, `DELETE /v1/workspaces/{ws}/deploy-targets/{id}` | `integrations.read`, `integrations.manage` |
| `POST /v1/workspaces/{ws}/deploy-targets/{id}/check` | `integrations.manage` |
| `GET /v1/workspaces/{ws}/deploys` | `integrations.read` |

Watched repositories and their deploys take the brand of the site they
serve, so someone limited to one brand sees only that brand's deploys.

Agents use the MCP tools `list_deploy_options`, `add_deploy_target`,
`list_deploy_targets`, `update_deploy_target`, `remove_deploy_target`,
`check_deploys` and `list_deploys`.
