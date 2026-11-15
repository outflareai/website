---
title: Email and meetings in the CRM
description: Bring your team's work email and meetings with contacts into the CRM through one Google Workspace connection, private to each person unless they share, with a check before anyone reaches out.
sidebar:
  order: 1.6
---

<span class="pill shipped">Shipped</span> Email and meetings on contacts, the Before you reach out check and the Google Workspace connection that feeds them, in the web app (**CRM**) and the REST API. Sending as yourself is in the API.

Your team's conversations with customers, partners and suppliers usually sit in one person's inbox. Outflare can save each person's email and meetings with a CRM contact onto that contact, so the history is in one place, while everything stays private to the person it came from until they choose to share it.

In one line: for the people an admin picks, Outflare saves their email and meetings with CRM contacts onto those contacts, keeps them private to each person unless they share, and lets them send from their own address.

## What it gives you

| Where | What you see |
| --- | --- |
| A contact or company → **Email** | The conversations with them, from your own mailbox and from what colleagues shared with you |
| **Email → Meetings** | Meetings with them from people's calendars, past and upcoming |
| A record's overview → **Before you reach out** | Whether they're already a customer, have an open deal or sit in another pipeline (such as a partnership), who on the team has emailed them (for a warm intro), and whether the conversation has gone quiet for 60 days |
| The API → **send as yourself** | Send from your own Gmail address through Outflare, kept on the contact |

The same connection is meant to serve every part of Outflare that works with your team's own email and calendars, so nobody signs in to Google more than once.

## Connect Google Workspace

One connection serves the whole company, so nobody signs in one by one. It runs on your own Google Cloud project and service account. Outflare provides no Google access of its own, and the features on this page stay off until you connect it, or until a person connects their own Gmail.

1. In Google Cloud, in a project of your own, enable the Gmail API and the Google Calendar API, create a service account, and create a JSON key for it.
2. In the Google Admin console, open Security → Access and data control → API controls → [Domain-wide delegation](https://support.google.com/a/answer/162106). Add the service account's client ID with these scopes, separated by commas:
   - `https://www.googleapis.com/auth/gmail.readonly` to read email
   - `https://www.googleapis.com/auth/calendar.readonly` to read meetings
   - `https://www.googleapis.com/auth/gmail.send`, only if people should send from their own address through Outflare
3. In Outflare, open **Connections**, find **Google Workspace email and calendar** under CRM, upload the key file and enter one address in your Workspace to test with. Outflare reads only that user's address to check the connection, and shows which of the scopes Google allows.
4. In **CRM → Settings → Sales eligibility**, choose the connection and the people whose mail is read ([below](#choose-whose-mail-is-read)).

The key is encrypted with your server's secret key, and the API never returns it. Outflare never deletes, moves or labels anything in Gmail or Calendar, and sends only when a person asks it to.

This is a different connection from the [Google Workspace admin connection for outreach mailboxes](/docs/integrations/google-and-microsoft/), which signs in to sending mailboxes over SMTP and IMAP.

### Or each person connects their own Gmail

Without a Workspace connection, an eligible person can connect their own Google account from their email settings, with read-only access to Gmail. The rules below apply the same way. Someone who connected their own account keeps it when an admin adds the Workspace connection. A person's connection says `via: personal` or `via: workspace`.

## Choose whose mail is read

The Workspace connection could read any mailbox in your domain. Outflare reads only the ones an admin picks, per brand, in **CRM → Settings → Sales eligibility**:

- **Turn it on** and choose the **Google Workspace connection**.
- **Eligible members.** Only these people's mail and calendars are read.
- **Always excluded members** and **Always excluded email addresses.** Never read, even when they're also eligible. An address works before that person has an Outflare account: whoever joins with it is never read, and a mailbox already read with it is disconnected at once.
- **History.** How far back to start, in days. 0, the default, reads the whole mailbox.

Taking someone off the list, excluding them, or turning it off disconnects their mailbox at once. People can delete what was captured from their own mailbox at any time, but only an admin stops the reading.

## What gets saved

An email is saved on a contact only when **everyone outside your company on it belongs to one contact or company in the CRM**: the contact whose address it is, or else the company whose domain it is. Free mail services such as Gmail never count as a company. So mail with friends, family, newsletters or anyone not in the CRM never gets in, and neither does a thread with only colleagues, a thread that mixes colleagues with outsiders who aren't in the CRM, or mail that fits two contacts or two companies.

Even then, it is left out when it is:

- under a private Gmail label: Personal, HR, Legal, Finance and Medical by default, plus any the brand or the person adds;
- from or to a blocked address or domain, the brand's or the person's own (add your accountant and law firm);
- spam, a draft, or in Gmail's Promotions, Social or Forums tabs.

The filters run again every time mail is read, so a new exclusion hides older mail straight away. Mail is stored encrypted.

Set your company's own domains in **CRM → Settings → Email privacy** (**Internal company domains**), so Outflare knows who counts as a colleague. Members' own addresses always count as internal.

### Which contacts

By default each person picks the contacts and companies whose mail is saved, from the contact's **Email** tab. An owner or admin can switch on **Capture email with every CRM contact** in **CRM → Settings → Email privacy**, so each eligible person's mail with any contact or company in the brand's CRM is saved, under the same filters. Switching it on or off syncs every connected mailbox again, and every member sees it in their own email settings.

### Meetings

Calendars are read through the same connection: from 90 days back and everything ahead, then every 15 minutes for changes. A meeting is saved under the same rules as email, using the guests in place of the recipients, so internal-only meetings and meetings with blocked or private senders are left out. An event Google marks private or confidential is never saved, and a meeting deleted in Google is marked canceled. The rest of a calendar is never copied.

## Who can see what

| Situation | Who sees it |
| --- | --- |
| By default | Only the person whose mailbox or calendar it came from. No role, owner or admin included, can read someone else's mail or meetings. |
| They share a contact | The people they pick, or everyone on the brand, as "who and when" only or in full (subject and body, or a meeting's title and guests). They can make it private again at any time. |
| Team email sharing is on | Everyone on the brand, for mail and meetings your own AI model checked and found to be about work ([below](#team-email-sharing)). |
| **Before you reach out** | Names and counts only ("3 emails, 2 weeks ago"), never what was written, and only from mail that viewer may see. |

Each time someone reads a colleague's email, Outflare records who read whose and on which contact, never what.

### Team email sharing

An owner or admin can switch on **Team email sharing** in **CRM → Settings → Email privacy**, so the history with a customer, partner or supplier isn't stuck in one inbox.

- Every member of the brand is told at once, and sharing starts 48 hours later. Switching it off is immediate, and tells everyone again.
- A contact whose owner made no choice is shared in full with the brand. A contact its owner set private stays private.
- Mail from payroll, HR, benefits, banking and expense services is never saved while it's on.
- Before a colleague sees an email or meeting, your workspace's own AI model reads its subject (or a meeting's title) and first lines. Anything about pay, a job offer, HR, a legal dispute, health or family stays with its owner, and so does anything the model is unsure about or hasn't read yet. Mail a person shares on purpose isn't checked.
- The check runs on your workspace's own AI connection, within its AI limits ([AI usage](/docs/guides/ai-usage/)). Without one, colleagues see no shared email.

Every member sees whether it's on, and from when, in their own email settings.

## Send as yourself

With `gmail.send` delegated, a person can send from their own address through Outflare, as a new email or a reply in a captured thread. Today this is an API call made from your own signed-in session ([Sending](#sending)); the web app doesn't have a send button for it yet.

- Every recipient goes through the same checks as any reply first: the suppression list and withdrawn consent.
- The email is sent in the background and kept on the contact, like captured mail.
- A retry looks in your Sent mail first, so an email is never sent twice.
- Only eligible people whose mailbox is read through the Workspace connection can send. A person's own Google sign-in reads only.

## Questions people ask

**Can my manager read my email?** No. Only what you share, or work email under team sharing once it's on and after the AI check. No role grants access.

**What if I email a friend who works at a company in our CRM?** It counts as an email with that company and can be saved, but it stays private to you unless you share that contact. Put it under a Personal label in Gmail, or block their address, to keep it out entirely.

**Can I opt out?** Ask an admin to add you, or your address, to the excluded list. You can also delete anything that was captured from your mailbox.

**What does it cost?** The Google connection uses your own Google Workspace. The AI privacy check, used only when team sharing is on, runs on your workspace's own AI connection with the cheapest model of its provider.

**Does Outflare change anything in Google?** No. It reads, and sends only when a person asks it to.

## API

Every endpoint is under `/v1/brands/{brand}/crm/mail/`, except the relationship check. They work only with **your own signed-in session**: an API token or a support session gets `403 forbidden`, because personal mail never follows an automation's access. The [API reference](/docs/api/reference/) lists them under **CRM**, with every field.

### Admin: eligibility and privacy

| Call | Operation | Scope |
| --- | --- | --- |
| `GET`, `PUT /crm/mail/rollout` | `getCRMMailRollout`, `updateCRMMailRollout` | `members.manage` |
| `GET`, `PUT /crm/mail/policy` | `getCRMMailPolicy`, `updateCRMMailPolicy` | `members.manage` |

The rollout is Sales eligibility: `enabled`, `allowed_user_ids`, `excluded_user_ids`, `excluded_emails` (up to 500), `workspace_integration_id` (the Google Workspace connection) and `history_days`. The policy is Email privacy: `internal_domains`, `blocked_addresses`, `blocked_domains`, `private_labels`, `capture_all_contacts`, `team_sharing` and, set by the server, `team_sharing_from`. Both carry a `version`: send back the one you read, and a stale one is refused with `409 conflict`. Managing either never grants access to anyone's mail.

```sh
curl -X PUT "$OUTFLARE_URL/v1/brands/$BRAND/crm/mail/rollout" \
  -H "Cookie: outflare_session=$SESSION" -H "Content-Type: application/json" \
  -d '{"enabled":true,"allowed_user_ids":["7f0c2c1e-0000-4000-8000-000000000001"],
       "excluded_user_ids":[],"excluded_emails":["ceo@acme.example"],
       "workspace_integration_id":"7f0c2c1e-0000-4000-8000-0000000000aa",
       "history_days":365,"version":3}'
```

### Your own mail

| Call | Operation | Scope |
| --- | --- | --- |
| `GET /crm/mail/connection` | `getMyCRMGoogleConnection`: whether you're eligible and connected, `via`, last sync | `customers.read` |
| `POST /crm/mail/google/authorize` | `authorizeMyCRMGoogle`: a link to connect your own Google account | `customers.manage` |
| `DELETE /crm/mail/connection` | `disconnectMyCRMGoogle`: disconnect, and delete what it captured | `customers.read` |
| `POST /crm/mail/sync` | `syncMyCRMGoogle`: read your mailbox now | `customers.manage` |
| `GET`, `PUT /crm/mail/preferences` | `getMyCRMMailPreferences`, `updateMyCRMMailPreferences`: your own blocked addresses, domains and private labels | `customers.read`, `customers.manage` |
| `GET`, `PUT /crm/mail/records/{record}/capture` | `getMyCRMMailCapture`, `updateMyCRMMailCapture`: whether your mail with a contact is saved | `customers.read`, `customers.manage` |
| `GET`, `PUT /crm/mail/records/{record}/sharing` | `getMyCRMRecordMailSharing`, `updateMyCRMRecordMailSharing`: who sees your mail with a contact (`visibility` `private`, `metadata` or `full`; `audience` `selected` with `viewer_ids`, or `brand`) | `customers.read`, `customers.manage` |
| `POST /crm/mail/records/{record}/messages` | `importMyCRMRecordMail`: save one email by hand, as raw RFC 5322 | `customers.manage` |
| `DELETE /crm/mail/messages/{id}` | `deleteMyCRMMail`: delete one of yours | `customers.manage` |
| `DELETE /crm/mail/messages` | `clearMyCRMMail`: delete all of yours in the brand | `customers.manage` |

### Reading a contact

| Call | Operation | Scope |
| --- | --- | --- |
| `GET /crm/mail/records/{record}/messages` | `listCRMRecordMail`: the email on a contact you may see, newest first, with `next_cursor` | `customers.read` |
| `GET /crm/mail/records/{record}/meetings` | `listCRMRecordMeetings`: the meetings on a contact you may see | `customers.read` |
| `GET /records/{record}/relationship` | `getRecordRelationship`: Before you reach out, with `flags` such as `already_customer`, `open_deal`, `in_other_pipeline`, `warm_intro` and `stale_thread` | `customers.read` |

An email or meeting shared as "who and when" comes back with `visibility: metadata` and no subject, body, title or guests. Mail you may not see isn't returned at all, not even as a count. The relationship check also works with API tokens and the MCP tool `get_record_relationship`, without the warm intro list.

### Sending

| Call | Operation | Scope |
| --- | --- | --- |
| `POST /crm/mail/sends` | `sendMyCRMMail`: send from your own address | `customers.manage` |
| `GET /crm/mail/sends/{send}` | `getMyCRMMailSend`: how it went | `customers.read` |

The body takes `record_id` (the contact or company the email is about), `to` (1 to 20 addresses), optional `cc`, `subject` (up to 500 characters), a plain-text `body` and, to reply in a thread, `in_reply_to` (the id of a captured email you can see). It returns `202` with the send, whose `status` moves from `queued` to `sending` to `sent` or `failed`. A failed send has an `error_code`:

| `error_code` | Meaning |
| --- | --- |
| `not_eligible` | You aren't eligible for capture in this brand |
| `mailbox_not_connected` | Your mailbox isn't read through the Google Workspace connection |
| `send_not_allowed` | Google doesn't allow sending: delegate `gmail.send` to the connection |
| `send_refused` | Google refused the email |

```sh
curl -X POST "$OUTFLARE_URL/v1/brands/$BRAND/crm/mail/sends" \
  -H "Cookie: outflare_session=$SESSION" -H "Content-Type: application/json" \
  -d '{"record_id":"7f0c2c1e-0000-4000-8000-0000000000c1","to":["ana@acme.example"],
       "subject":"Following up","body":"Hi Ana,\n\nThanks for your time today."}'
```

Changes to eligibility and privacy settings, sends, and each read of a colleague's mail (`crm_mail.viewed`) are written to the audit log.
