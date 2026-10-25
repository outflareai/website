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
| `OUTFLARE_TELEMETRY` | no | on | `off` stops the anonymous daily usage report and update check. See [Usage stats and update checks](/docs/self-hosting/telemetry/). |
| `DO_NOT_TRACK` | no | none | `1` does the same as `OUTFLARE_TELEMETRY=off`. |
| `TELEMETRY_URL` | no | set by official releases | Where the daily report goes. Empty sends nothing. |

Compose-only settings:

| Variable | Default | Description |
| --- | --- | --- |
| `POSTGRES_PASSWORD` | `outflare` | Password for the bundled Postgres container. |
| `PORT` | `8080` | Host port that the engine is published on. |

## Rotating the secret key

There is no key rotation command yet. Changing `OUTFLARE_SECRET_KEY` makes existing stored mailbox credentials unreadable, so mailboxes would need to be imported again. Keep the key stable and backed up.
