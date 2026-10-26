---
title: Cheap Inboxes
description: Import every mailbox in your Cheap Inboxes account by API key, and keep them in step, without exporting a CSV.
sidebar:
  order: 1
---

<span class="pill shipped">Shipped</span> Connect a [Cheap Inboxes](https://cheapinboxes.com) account with its API key. Outflare lists every mailbox in it, imports the ones you choose, and keeps them in step as Cheap Inboxes sets up new mailboxes or cancels old ones. Everything here works the same from the web app, the API and the [MCP server](/docs/agents/mcp/), so an agent can do it without the dashboard.

![A Cheap Inboxes account in Outflare: how many mailboxes it holds, how many are imported, ready or in progress, sync settings, and each mailbox with its status at Cheap Inboxes and in Outflare](/screens/cheap-inboxes.png)

## Connect

1. In Cheap Inboxes, open **Integrations → API** and create a key. It starts with `ci_live_`.
2. In Outflare, open **Connectors**, choose **Cheap Inboxes** and paste the key. Outflare tests it before saving and encrypts it with your instance's `OUTFLARE_SECRET_KEY`, like mailbox passwords.
3. Open the connection to see its mailboxes. The first read takes a few seconds for a few hundred mailboxes.

Or with the API (scope `integrations.manage`):

```sh
curl -X POST localhost:8080/v1/workspaces/$WS/integrations \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" \
  -d '{"connector":"cheapinboxes","credentials":{"api_key":"ci_live_..."}}'
```

## Import

Turn on **Bring in mailboxes automatically** and every mailbox comes in, with new ones following as soon as they are ready. Or leave it off, tick mailboxes and choose **Bring in selected**. For each one, Outflare reads its password from Cheap Inboxes and runs the same SMTP, IMAP and DNS checks as a [CSV import](/docs/guides/import-mailboxes/). Mailboxes that Cheap Inboxes is still setting up wait, and are imported as soon as they are active.

```sh
# Everything that is active, plus anything still being set up once it is ready
curl -X POST localhost:8080/v1/workspaces/$WS/integrations/$INTEGRATION/mailboxes/import \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" -d '{"all":true}'
```

To import only some, send `{"emails": ["ana@acme-mail.com", "ben@acme-mail.com"]}` or `{"external_ids": [...]}` instead. The answer says how many were queued, how many wait for Cheap Inboxes, and which addresses it didn't find.

Follow progress in the list (scope `mailboxes.read`). Each mailbox has an `import_state`:

| `import_state` | Meaning |
| --- | --- |
| `available` | In Cheap Inboxes, not imported |
| `queued` | Being imported now |
| `waiting` | Still being set up at Cheap Inboxes; imported once active |
| `app_password` | Waiting for a Google app password (see below) |
| `imported` | In Outflare; `mailbox_id` and `mailbox_status` say how it is doing |
| `failed` | Could not be imported; `import_error` says why |

```sh
curl "localhost:8080/v1/workspaces/$WS/integrations/$INTEGRATION/mailboxes?import_state=failed" \
  -H "Authorization: Bearer $OUTFLARE_TOKEN"
```

### Google mailboxes need app passwords

Google refuses a mailbox's normal password over SMTP and IMAP. So for each Google mailbox, Outflare first asks Cheap Inboxes to create an app password, then imports the mailbox with it. Cheap Inboxes creates **20 an hour**, three at a time, so a few hundred Google mailboxes take most of a day. Outflare paces the requests for you and the page shows how long is left. Microsoft 365 mailboxes import straight away.

If you would rather connect Google mailboxes [without passwords, through an admin connection](/docs/integrations/google-and-microsoft/), turn off **Get Google app passwords**.

### Mailboxes also used by another tool

Cheap Inboxes knows when a mailbox is also connected to EmailBison, Instantly, Smartlead, PlusVibe or Apollo, and the page shows it under **Also in**. Importing a mailbox doesn't disconnect it there. Decide which tool sends from each mailbox, or both will count against its daily limit.

## Keep in step

Outflare re-reads the account every 15 minutes. If your instance's `PUBLIC_URL` is an https address, it also subscribes to Cheap Inboxes webhooks, so new and changed mailboxes show up within seconds. Webhooks are signed, and checked against the secret Cheap Inboxes gave when they were created.

- New mailboxes appear as `available`, or are imported straight away with **Bring in mailboxes automatically** on. **More settings** holds Google app passwords, the daily sending limit for new mailboxes and push.
- Mailboxes cancelled at Cheap Inboxes are paused in Outflare, so nothing sends from them, with the reason "Cancelled at the supplier".
- Disconnecting the account removes the webhook. Imported mailboxes stay.

Settings live on the connection (scope `mailboxes.manage`):

```sh
curl -X PATCH localhost:8080/v1/workspaces/$WS/integrations/$INTEGRATION/mailbox-sync \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" \
  -d '{"auto_import":true,"app_passwords":true,"daily_limit":30}'
```

`daily_limit` applies to mailboxes imported from then on; `null` keeps Cheap Inboxes' own limit. To read the account again now, `POST …/integrations/$INTEGRATION/mailboxes/sync`.

## Let Cheap Inboxes push mailboxes in

<span class="pill building">Built, not yet tested live</span> Cheap Inboxes pushes mailboxes straight into the sequencers it supports, and it supports a self-hosted EmailBison. Outflare answers the part of the EmailBison API used for that, and sets the connection up for you:

Most accounts don't need this: Outflare already brings mailboxes in itself. Push is the other way round, and sits under **More settings**.

1. On the Cheap Inboxes connection page in Outflare, open **More settings** and choose **Turn on push**. Outflare adds itself in Cheap Inboxes as an EmailBison connection, with an API token that can only read and add mailboxes. It takes a few seconds.
2. Select mailboxes in the table and choose **Push selected**, or choose **Push** to have Cheap Inboxes send every active mailbox that isn't in Outflare yet. Try one mailbox first. If a mailbox is also connected to another sequencer, Cheap Inboxes may move it to Outflare there.

Or with the API (turning push on also needs `integrations.manage`):

```sh
curl -X PATCH localhost:8080/v1/workspaces/$WS/integrations/$INTEGRATION/mailbox-sync \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" -d '{"push":true}'
# when push.state is "on":
curl -X POST localhost:8080/v1/workspaces/$WS/integrations/$INTEGRATION/mailboxes/push \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" -d '{"all":true}'
```

You can also add it in Cheap Inboxes yourself: add a sequencer connection, choose **EmailBison**, set the base URL to `https://<your Outflare host>/emailbison/<workspace id>` and the API key to an Outflare token with `mailboxes.read` and `mailboxes.manage`.

Pushed mailboxes go through the same SMTP, IMAP and DNS checks as any import. If Cheap Inboxes removes one, it is paused in Outflare, never deleted. **Turn off** revokes the token and removes the connection in Cheap Inboxes; mailboxes already pushed stay. Cheap Inboxes also asks for a sequencer login. Outflare has no sequencer screen to sign in to, so it sends your email and a random password it never keeps. Your instance has to be reachable from the internet (`PUBLIC_URL` set to its https address).

This was built from EmailBison's and Cheap Inboxes' public APIs and hasn't been tested against a live Cheap Inboxes push yet. Every call is logged with its field names (never the values), so if Cheap Inboxes asks for something Outflare doesn't answer yet, you can see exactly what:

```sh
curl localhost:8080/v1/workspaces/$WS/emailbison-compat/calls -H "Authorization: Bearer $OUTFLARE_TOKEN"
```

| EmailBison call | What Outflare does |
| --- | --- |
| `GET /api/users` | Answers with the workspace |
| `GET /api/sender-emails`, `GET /api/sender-emails/{id or email}` | Lists mailboxes as senders, paginated like EmailBison |
| `POST /api/sender-emails/imap-smtp`, `POST /api/sender-emails/bulk` | Imports mailboxes |
| `PATCH /api/sender-emails/{id}` | Changes the daily limit and name; a new password re-imports the mailbox |
| `DELETE /api/sender-emails/{id}` | Pauses the mailbox |
| `PATCH /api/warmup/sender-emails/enable` and `disable` | Turns [warm-up](/docs/guides/warmup/) on or off |

## Buy through infrastructure plans

With Cheap Inboxes connected, an [infrastructure plan](/docs/guides/infrastructure/) can buy its domains and mailboxes on your Cheap Inboxes account. The plan's quote comes from Cheap Inboxes: which domains are free and what they cost, then the price today and per month. Approving the plan places the order **once**. The plan id is sent as Cheap Inboxes' idempotency key, so a retry can never buy twice. Domains you already own are sent as existing, so you pay only for their mailboxes. As mailboxes go live at Cheap Inboxes, the plan follows them and they are imported as above. Retiring a mailbox in a plan cancels it at Cheap Inboxes at the end of its billing period.

## For agents

The MCP server has `list_supplier_mailboxes`, `import_supplier_mailboxes`, `push_supplier_mailboxes`, `sync_supplier_mailboxes` and `update_supplier_sync`. A typical run: list the account's connectors, list its mailboxes, import all, then check back on the ones in `app_password` or `failed`.

## Other suppliers

Cheap Inboxes is the first mailbox supplier. Others plug into the same interface, so the page, the API and the MCP tools above work for them unchanged. See [Mailbox suppliers](https://github.com/outflareai/outflare/blob/main/docs/connectors.md#mailbox-suppliers) in the connectors guide.
