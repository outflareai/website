---
title: Configuration reference
description: Every environment variable the Outflare engine reads.
sidebar:
  order: 2
---

The engine is configured only through environment variables. When you use the bundled Compose file, set them in `deploy/.env` (Compose passes the ones it knows about) or add them to the `engine` service's `environment` block.

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `DATABASE_URL` | yes | none | Postgres connection string, for example `postgres://outflare:secret@postgres:5432/outflare?sslmode=disable`. Compose builds it from `POSTGRES_PASSWORD`. |
| `OUTFLARE_SECRET_KEY` | yes | none | Base64-encoded 32-byte key that encrypts mailbox passwords and provider keys at rest. Generate with `openssl rand -base64 32`. Back it up with the database. |
| `OUTFLARE_SECRET_KEY_PREVIOUS` | no | none | Earlier secret keys, comma-separated, while you [rotate the key](#rotating-the-secret-key). Secrets are re-encrypted with the current key at start-up. |
| `HTTP_ADDR` | no | `:8080` | Address the engine listens on inside the container. |
| `PUBLIC_URL` | no | `http://localhost:8080` | External base URL. Used in links the engine generates, such as invites and the unsubscribe link in every email, and to decide whether session cookies are marked `Secure`. Set it to your public `https://` address before sending: recipients must be able to reach unsubscribe links. |
| `WORKERS` | no | `32` | Number of job worker goroutines. |
| `OUTFLARE_QUERY_CONNECTIONS` | no | `3` | How many [queries](/docs/guides/query-and-search/) run at once on this server, each on its own database connection. `0` turns Query off. |
| `WEB_DIR` | no | `/web` in the Docker image | Directory of the built web app to serve. Empty disables serving the web app. |
| `GOOGLE_OAUTH_CLIENT_ID`, `GOOGLE_OAUTH_CLIENT_SECRET` | no | none | Your Google OAuth app, for connecting one mailbox at a time through Google's consent screen. Also enables **Continue with Google** on the sign-in and invite pages. Register `$PUBLIC_URL/v1/oauth/callback` and `$PUBLIC_URL/v1/auth/google/callback` as its redirect URIs. See [Google Workspace and Microsoft 365](/docs/integrations/google-and-microsoft/). |
| `MICROSOFT_OAUTH_CLIENT_ID`, `MICROSOFT_OAUTH_CLIENT_SECRET` | no | none | The same for Microsoft's consent screen, with an Entra app registration. |
| `EMAIL_FROM` | with a key below | none | Sender for account emails (email confirmation and password reset), for example `Outflare <login@example.com>`. Use a domain you don't send cold email from. |
| `POSTMARK_SERVER_TOKEN` | no | none | Sends account emails through [Postmark](https://postmarkapp.com). |
| `RESEND_API_KEY` | no | none | Sends account emails through [Resend](https://resend.com). |
| `CLOUDFLARE_EMAIL_API_TOKEN` | no | none | Sends account emails through [Cloudflare Email Service](https://developers.cloudflare.com/email-service/), with `CLOUDFLARE_ACCOUNT_ID`. Needs the Workers Paid plan and the sender's domain onboarded to Email Sending. Set only one of the three email keys. With none, links are written to the server log and nothing is sent. |
| `CLOUDFLARE_ACCOUNT_ID` | with the Cloudflare key | none | The Cloudflare account that sends, shown in the dashboard's account home. |
| `PASSKEYS` | no | `auto` | `auto` turns passkey sign-in on once `PUBLIC_URL` is `https://`. `on` also allows `http://localhost` for trying them out; `off` turns them off. Passkeys are tied to `PUBLIC_URL`, so set its final address first. |
| `OUTFLARE_SIGNED_IN_COOKIE_DOMAIN` | no | none | A parent domain of `PUBLIC_URL`'s host, such as `example.com` for `app.example.com`. While someone is signed in, the server keeps an `outflare_signed_in=1` cookie there, so your website can show a **Dashboard** link instead of **Sign in**. The cookie says nothing else and scripts on your site can read it; the session cookie itself stays HttpOnly on the app's own host. The server refuses to start if the domain isn't its own host or a parent of it. |
| `CLIENT_IP_HEADER` | no | none | Header your proxy puts the visitor's address in, such as `Fly-Client-IP` or `CF-Connecting-IP`. Rate limits use it. Only set it when every request comes through that proxy, or visitors could fake it. |
| `WEBHOOKS_ALLOW_PRIVATE` | no | `false` | `true` lets [webhooks](/docs/api/webhooks/) go to private, loopback and plain-`http` addresses, for receivers on the same network as the server. Leave it off on a server anyone else can add webhooks to. |
| `OUTFLARE_LOG_RETENTION_DAYS` | no | `30` | Days to keep [request logs](/docs/api/logs/) (the Logs page), from 1 to 3650. Older calls are deleted every hour. |
| `OUTFLARE_CRAWL_ALLOW_PRIVATE` | no | `false` | `true` lets [site audits](/docs/guides/site-audits/) crawl private addresses and other ports, to audit an intranet or a site in development. Leave it off on a server other people use. |
| `OUTFLARE_CONNECTORS_ALLOW_PRIVATE` | no | `false` | `true` lets connectors with an address you type (a self-hosted Matomo, Umami, Plausible, PostHog, EmailBison or Cal.com) and mailboxes' SMTP and IMAP servers be on private, loopback and link-local addresses. Off, they only reach the public internet. Leave it off on a server other people use. |
| `OUTFLARE_COMMUNITY_LINKS` | no | `on` | `off` hides the optional **Star us on GitHub** and **Follow us on X** items on Home and Get started ([Getting started](/docs/guides/getting-started/#help-outflare-grow)). |
| `OUTFLARE_FOLLOW_URL` | no | `https://x.com/outflareai` | The `https://` X profile **Follow us on X** opens. `off` leaves that item out. |
| `OUTFLARE_TELEMETRY` | no | on | `off` stops the anonymous daily usage report and update check. See [Usage stats and update checks](/docs/self-hosting/telemetry/). |
| `DO_NOT_TRACK` | no | none | `1` does the same as `OUTFLARE_TELEMETRY=off`. |
| `OUTFLARE_POSTHOG_KEY` | no | none | Your own PostHog project key (`phc_...`). Turns on product analytics: the web app's usage through `/ingest/` on your server, and the server's own events (every action, API and MCP call, and error), with ids and error codes but never customer data. See [Product analytics](#product-analytics). |
| `OUTFLARE_POSTHOG_HOST` | no | `https://us.i.posthog.com` | Where those events go: `https://eu.i.posthog.com` for EU Cloud, or your self-hosted PostHog. |
| `TELEMETRY_URL` | no | set by official releases | Where the daily report goes. Empty sends nothing. |

Compose-only settings:

| Variable | Default | Description |
| --- | --- | --- |
| `POSTGRES_PASSWORD` | `outflare` | Password for the bundled Postgres container. |
| `PORT` | `8080` | Host port that the engine is published on. |

## Scaling, metrics and analytics storage

`OUTFLARE_ROLE` splits one server into app, website-event and worker services; `OUTFLARE_METRICS_ADDR`, `OUTFLARE_METRICS_TOKEN` and `OUTFLARE_METRICS_PPROF` turn on Prometheus metrics; and `OUTFLARE_CLICKHOUSE_URL`, `OUTFLARE_S3_*` and `OUTFLARE_EVENT_RETENTION_DAYS` move analytics events out of Postgres. All of them are optional and explained in [Scaling and monitoring](/docs/self-hosting/scaling/).

## Third-party keys

Every workspace brings its own keys for every third-party API, AI models and connectors alike, with no exceptions: each one connects its own Claude, OpenAI, Gemini, Mistral, Geonode, Apollo or DataForSEO account on the [Connectors](/docs/integrations/connectors/) page. Outflare never lends a key of its own, and neither does your server. At start-up the engine removes vendor keys such as `ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, `GEMINI_API_KEY` or `GOOGLE_APPLICATION_CREDENTIALS` from its environment and logs which it ignored, so setting one does nothing. The only third-party settings above are for running Outflare itself: account email, OAuth app ids (people still sign in to their own accounts) and your own product analytics.

## Rotating the secret key

To rotate the key:

1. Generate a new key with `openssl rand -base64 32`.
2. Set `OUTFLARE_SECRET_KEY_PREVIOUS` to the current key and `OUTFLARE_SECRET_KEY` to the new one.
3. Restart. At start-up the engine re-encrypts every stored secret (mailbox passwords, connector and OAuth keys, webhook signing secrets) with the new key, and the log says how many.

Keep the old key in `OUTFLARE_SECRET_KEY_PREVIOUS` as long as unsubscribe links in mail you already sent should keep working; once you remove it, those links stop verifying. You can list several old keys, comma-separated. Changing `OUTFLARE_SECRET_KEY` without listing the old one makes stored credentials unreadable, so keep both backed up.

## Product analytics

Off by default. Set `OUTFLARE_POSTHOG_KEY` to a PostHog **project** key and Outflare reports how people and their agents use your server to your own PostHog project: pages opened, clicks and session replays from the web app, and from the server every action (`mailbox.connected`, `member.removed`, ...), every API and MCP call (`api.called`, with the operation, the MCP tool and the agent's app), sign-ups and sign-ins, and every error with its error code. This is separate from the [anonymous usage report](/docs/self-hosting/telemetry/), which never includes people or content. Without a key nothing is sent.

- Every event has `outcome` (`success`, `failure` or `error`), `error_code` when it failed, the workspace (as the PostHog `workspace` group), the person's user id, and `surface` (`web`, `api`, `mcp`, `cli`, `sdk`, `job`). Properties are ids, codes, counts and durations, never names, email addresses, domains, message content or error text; the server log keeps the full error next to the same `request_id`.
- The server sends in the background in batches, so a slow PostHog never slows a request. The full list of events is in the main repo's [`docs/product-analytics.md`](https://github.com/outflareai/outflare/blob/main/docs/product-analytics.md).

- The browser only talks to your server. `/ingest/` forwards to PostHog and strips your session cookie and API tokens on the way.
- Signed-in people are identified by their Outflare user id, email and name (on the PostHog person, never on events), and grouped by workspace.
- Customer data stays out. All page text, inputs and element attributes are masked in autocapture and replays. URLs keep only the page (`/:ws/sequences/:item`), never workspace names, ids, domains, invite tokens or query strings other than UTM tags.
- Signing out resets the identity on that browser.

`GET /v1/meta` includes `product_analytics` while it's on. PostHog keeps an anonymous id in a first-party cookie, so if your users need to consent to that, add your own banner or leave this off.
