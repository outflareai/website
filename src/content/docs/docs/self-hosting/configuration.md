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
| `HTTP_ADDR` | no | `:8080` | Address the engine listens on inside the container. |
| `PUBLIC_URL` | no | `http://localhost:8080` | External base URL. Used in links the engine generates, such as invites and the unsubscribe link in every email, and to decide whether session cookies are marked `Secure`. Set it to your public `https://` address before sending: recipients must be able to reach unsubscribe links. |
| `WORKERS` | no | `32` | Number of job worker goroutines. |
| `WEB_DIR` | no | `/web` in the Docker image | Directory of the built web app to serve. Empty disables serving the web app. |
| `GOOGLE_OAUTH_CLIENT_ID`, `GOOGLE_OAUTH_CLIENT_SECRET` | no | none | Your Google OAuth app, for connecting one mailbox at a time through Google's consent screen. Also enables **Continue with Google** on the sign-in and invite pages. Register `$PUBLIC_URL/v1/oauth/callback` and `$PUBLIC_URL/v1/auth/google/callback` as its redirect URIs. See [Google Workspace and Microsoft 365](/docs/integrations/google-and-microsoft/). |
| `MICROSOFT_OAUTH_CLIENT_ID`, `MICROSOFT_OAUTH_CLIENT_SECRET` | no | none | The same for Microsoft's consent screen, with an Entra app registration. |
| `EMAIL_FROM` | with a key below | none | Sender for account emails (email confirmation and password reset), for example `Outflare <login@example.com>`. Use a domain you don't send cold email from. |
| `POSTMARK_SERVER_TOKEN` | no | none | Sends account emails through [Postmark](https://postmarkapp.com). |
| `RESEND_API_KEY` | no | none | Sends account emails through [Resend](https://resend.com). |
| `CLOUDFLARE_EMAIL_API_TOKEN` | no | none | Sends account emails through [Cloudflare Email Service](https://developers.cloudflare.com/email-service/), with `CLOUDFLARE_ACCOUNT_ID`. Needs the Workers Paid plan and the sender's domain onboarded to Email Sending. Set only one of the three email keys. With none, links are written to the server log and nothing is sent. |
| `CLOUDFLARE_ACCOUNT_ID` | with the Cloudflare key | none | The Cloudflare account that sends, shown in the dashboard's account home. |
| `PASSKEYS` | no | `auto` | `auto` turns passkey sign-in on once `PUBLIC_URL` is `https://`. `on` also allows `http://localhost` for trying them out; `off` turns them off. Passkeys are tied to `PUBLIC_URL`, so set its final address first. |
| `CLIENT_IP_HEADER` | no | none | Header your proxy puts the visitor's address in, such as `Fly-Client-IP` or `CF-Connecting-IP`. Rate limits use it. Only set it when every request comes through that proxy, or visitors could fake it. |
| `WEBHOOKS_ALLOW_PRIVATE` | no | `false` | `true` lets [webhooks](/docs/api/webhooks/) go to private, loopback and plain-`http` addresses, for receivers on the same network as the server. Leave it off on a server anyone else can add webhooks to. |
| `OUTFLARE_TELEMETRY` | no | on | `off` stops the anonymous daily usage report and update check. See [Usage stats and update checks](/docs/self-hosting/telemetry/). |
| `DO_NOT_TRACK` | no | none | `1` does the same as `OUTFLARE_TELEMETRY=off`. |
| `OUTFLARE_POSTHOG_KEY` | no | none | Your own PostHog project key (`phc_...`). Turns on product analytics in the web app, sent to your PostHog through `/ingest/` on your server, with page text, inputs and ids in URLs masked. See [Product analytics](#product-analytics). |
| `OUTFLARE_POSTHOG_HOST` | no | `https://us.i.posthog.com` | Where those events go: `https://eu.i.posthog.com` for EU Cloud, or your self-hosted PostHog. |
| `TELEMETRY_URL` | no | set by official releases | Where the daily report goes. Empty sends nothing. |

Compose-only settings:

| Variable | Default | Description |
| --- | --- | --- |
| `POSTGRES_PASSWORD` | `outflare` | Password for the bundled Postgres container. |
| `PORT` | `8080` | Host port that the engine is published on. |

## Rotating the secret key

There is no key rotation command yet. Changing `OUTFLARE_SECRET_KEY` makes existing stored mailbox credentials unreadable, so mailboxes would need to be imported again. Keep the key stable and backed up.

## Product analytics

Off by default. Set `OUTFLARE_POSTHOG_KEY` to a PostHog **project** key and the web app reports how people on your server use it to your own PostHog project: pages opened, clicks, and session replays. This is separate from the [anonymous usage report](/docs/self-hosting/telemetry/), which never includes people or content.

- The browser only talks to your server. `/ingest/` forwards to PostHog and strips your session cookie and API tokens on the way.
- Signed-in people are identified by their Outflare user id, email and name, and grouped by workspace.
- Customer data stays out. All page text, inputs and element attributes are masked in autocapture and replays. URLs keep only the page (`/:ws/sequences/:item`), never workspace names, ids, domains, invite tokens or query strings other than UTM tags.
- Signing out resets the identity on that browser.

`GET /v1/meta` includes `product_analytics` while it's on. PostHog keeps an anonymous id in a first-party cookie, so if your users need to consent to that, add your own banner or leave this off.
