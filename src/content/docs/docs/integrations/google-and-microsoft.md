---
title: Google Workspace and Microsoft 365
description: Connect Google Workspace and Microsoft 365 mailboxes with app passwords, or without passwords through OAuth and admin-level authorisation.
sidebar:
  order: 2
---

There are three ways to connect Google Workspace and Microsoft 365 mailboxes. All of them end the same way: Outflare signs in over SMTP and IMAP, checks the domain's DNS, and marks the mailbox `active` or `error`.

| Way | Best for | Passwords |
| --- | --- | --- |
| CSV with app passwords | Reseller inboxes that come with a CSV | yes |
| Admin connection | Every mailbox on a domain you administer | no |
| Consent screen | One mailbox at a time | no |

## App passwords <span class="pill shipped">Shipped</span>

Outflare detects the provider from the domain's MX records and fills in the servers, so a CSV of addresses and app passwords is all you need. See [Import mailboxes](/docs/guides/import-mailboxes/).

Make sure SMTP and IMAP access are allowed for the accounts in your Google Workspace or Microsoft 365 admin console. Resellers usually set this up for you.

## Admin connections <span class="pill shipped">Shipped</span>

An admin connection gives Outflare access to every mailbox in an organisation, so you can add hundreds of mailboxes by address with no passwords. Each mailbox signs in with a short-lived OAuth token (SASL XOAUTH2). Tokens are cached until shortly before they expire.

### Google: a service account with domain-wide delegation

1. In Google Cloud, create a service account and a JSON key for it.
2. In the Google Admin console, open Security → Access and data control → API controls → [Domain-wide delegation](https://support.google.com/a/answer/162106). Add the service account's client ID with the scope `https://mail.google.com/`.
3. In Outflare, open Mailboxes → Google and Microsoft sign-in → Add admin connection, choose Google, and upload the key file.

### Microsoft: an Entra app with application access

1. In Microsoft Entra, register an app and create a client secret.
2. Under API permissions, add the Office 365 Exchange Online application permissions `IMAP.AccessAsApp` and `SMTP.SendAsApp`, and grant admin consent.
3. In Exchange Online PowerShell, register the app's service principal and give it access to the mailboxes, as Microsoft describes in [Authenticate an IMAP, POP or SMTP connection using OAuth](https://learn.microsoft.com/exchange/client-developer/legacy-protocols/how-to-authenticate-an-imap-pop-smtp-application-by-using-oauth#use-client-credentials-grant-flow-to-authenticate-smtp-imap-and-pop-connections).
4. Make sure SMTP AUTH is enabled for the mailboxes.
5. In Outflare, add an admin connection, choose Microsoft, and enter the tenant ID, client ID and secret. Outflare gets a token straight away, so a wrong secret is reported before it is saved.

### Add mailboxes through a connection

In the web app, click Add mailboxes on the connection and paste one address per line, optionally followed by a comma and a display name. Or use the API, up to 5000 at a time:

```sh
curl -X POST "$OUTFLARE_URL/v1/workspaces/$WS/oauth-connections/$CONN/mailboxes" \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" \
  -d '{"mailboxes":[{"email":"ana@acme.com","display_name":"Ana Smith"},{"email":"bo@acme.com"}],"pool":"Warm"}'
```

A mailbox that already exists is switched to the connection. If a token cannot be had, for example because delegation does not cover that domain, the mailbox shows `error` with the provider's reason, such as `unauthorized_client`.

A connection cannot be removed while mailboxes use it.

## Consent screen <span class="pill shipped">Shipped</span>

Mailboxes → Connect a Google mailbox (or Microsoft) sends you to the provider's consent screen. After you approve, Outflare stores the mailbox's refresh token and checks its sign-in.

This needs an OAuth app of your own, so the buttons appear only once it is configured:

- **Google:** create an OAuth client of type "Web application" in Google Cloud, with the Gmail scope `https://mail.google.com/`. Set `GOOGLE_OAUTH_CLIENT_ID` and `GOOGLE_OAUTH_CLIENT_SECRET`.
- **Microsoft:** register an Entra app for "Accounts in any organizational directory and personal Microsoft accounts", with the delegated permissions `IMAP.AccessAsUser.All`, `SMTP.Send` and `offline_access`. Set `MICROSOFT_OAUTH_CLIENT_ID` and `MICROSOFT_OAUTH_CLIENT_SECRET`.

In both, register `$PUBLIC_URL/v1/oauth/callback` as the redirect URI. See [Configuration](/docs/self-hosting/configuration/).

The flow is for people signed in to the web app. API tokens cannot start it. The link is valid for 15 minutes and only for the person who started it.

## Security

Service account keys, client secrets and refresh tokens are encrypted with `OUTFLARE_SECRET_KEY`, the same as passwords. The API never returns them: a connection shows only its service account email, or its tenant and client IDs. Adding and removing connections needs the `mailboxes.manage` scope and is written to the audit log.
