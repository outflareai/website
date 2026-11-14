---
title: Email and meetings in the CRM
description: Bring your team's work email and meetings with contacts into the CRM through one Google Workspace connection, private to each person unless they share, and reply as yourself.
sidebar:
  order: 1.6
---

<span class="pill shipped">Shipped</span> Email and meetings on contacts, the Before you reach out check and the Google Workspace connection that feeds them, in the web app (**CRM**), the REST API and the MCP server. Sending as yourself is in the API.

Your team's conversations with customers, partners and suppliers usually sit in one person's inbox. Outflare can save each person's email and meetings with a CRM contact onto that contact, so the history is in one place, while everything stays private to the person it came from until they choose to share it.

## What it gives you

| Where | What you see |
| --- | --- |
| A contact or company → **Email** | The conversations with them, from your own mailbox and from what colleagues shared with you |
| **Email → Meetings** | Meetings with them from people's calendars, past and upcoming |
| A record's overview: **Before you reach out** | Whether they're already a customer, have an open deal or sit in another pipeline, who on the team has emailed them (for a warm intro) and whether the conversation has gone quiet for 60 days |
| The API: **send as yourself** | Send from your own Gmail address through Outflare, kept on the contact |

## Connect Google Workspace

One connection serves the whole company, so nobody signs in one by one. It runs on your own Google Cloud project and service account; Outflare provides no Google access of its own, and the features above stay off until you connect it (or a person connects their own Gmail).

1. In Google Cloud, create a service account in a project of your own and a JSON key for it.
2. In the Google Admin console, open Security → Access and data control → API controls → [Domain-wide delegation](https://support.google.com/a/answer/162106). Add the service account's client ID with these scopes:
   - `https://www.googleapis.com/auth/gmail.readonly` to read email
   - `https://www.googleapis.com/auth/calendar.readonly` to read meetings
   - `https://www.googleapis.com/auth/gmail.send`, only if people should send from their own address through Outflare
3. In Outflare, open **Connections**, find **Google Workspace email and calendar** under CRM, upload the key file and enter one address in your Workspace to test with. Outflare reads only that user's address to check the connection, and shows which of the scopes Google allows.

The key is encrypted, and the API never returns it. Outflare never deletes, moves or labels anything in Gmail or Calendar, and sends only when a person presses Send.

Prefer that each person connects their own Gmail instead? They can, from their own email settings. Everything below applies the same way.

## Choose whose mail is read

The connection could read any mailbox in the domain. Outflare reads only the ones an admin picks, per brand, in **CRM → Settings → Sales eligibility**:

- **Eligible members.** Only these people's mail and calendars are read. Choose the Google Workspace connection there, and how far back to start.
- **Excluded members**, and **Always excluded email addresses**. Never read, even when they're also eligible. An address works before that person has an Outflare account: whoever joins with it is never read, and a mailbox already read with it is removed at once.

People can delete what was captured from their mailbox. Only an admin stops the reading, by taking them off the list.

## What gets saved

An email is saved on a contact only when **everyone outside the company on it belongs to one contact or company in the CRM**. So mail with friends, family, newsletters or anyone not in the CRM never gets in, and neither do threads with only colleagues or mail that fits two contacts.

Even then, it is left out when it is:

- under a private Gmail label: Personal, HR, Legal, Finance and Medical, plus any you add;
- from a blocked address or domain (add your accountant and law firm), or from payroll, HR, benefits, banking and expense services;
- spam, a draft, or in Gmail's Promotions, Social or Forums tabs.

The filters run again every time mail is read, so a new exclusion hides older mail straight away.

Meetings follow the same rules, using the guests in place of the recipients, and an event Google marks private or confidential is never saved. The rest of a calendar is never copied. Calendars are read from 90 days back and ahead, then every 15 minutes for changes.

By default each person picks the contacts whose mail is saved. An owner or admin can switch on **Capture email with every CRM contact** in **CRM → Settings → Email privacy**, so mail with any contact or company in the brand's CRM is saved, under the same filters.

## Who can see what

| Situation | Who sees it |
| --- | --- |
| By default | Only the person whose mailbox or calendar it came from. No role, owner or admin included, can read someone else's mail. |
| They share a contact | The people they pick, or everyone on the brand, as "who and when" only or in full. They can make it private again at any time. |
| Team email sharing is on | Everyone on the brand, for mail and meetings your own AI model checked and found to be about work (see below). |
| **Before you reach out** | Names and counts only ("3 emails, 2 weeks ago"), never what was written, and only from mail that viewer may see. |

Each time someone reads a colleague's email, Outflare records who read whose and on which contact, never what.

### Team email sharing

An owner or admin can switch on **Team email sharing** in **CRM → Settings → Email privacy**, so the history with a customer, partner or supplier isn't stuck in one inbox.

- Every member of the brand is told at once, and sharing starts 48 hours later. Switching it off is immediate.
- A contact its owner set private stays private.
- Before a colleague sees an email or meeting, your workspace's own AI model reads its subject and first lines. Anything about pay, a job offer, HR, a legal dispute, health or family stays with its owner, and so does anything the model is unsure about or hasn't read yet.
- The check runs on your workspace's own AI connection ([AI usage](/docs/guides/ai-usage/)). Without one, colleagues see no shared email.

## Send as yourself

With `gmail.send` delegated, people can send from their own address through Outflare's API, as a new email or a reply in a captured thread. Every recipient goes through the same checks as any reply (opt-outs and withdrawn consent) first, the email is sent in the background and kept on the contact, and a retry looks in Sent mail first, so an email is never sent twice.

## Use it from the API

| Call | What it does |
| --- | --- |
| `GET /v1/brands/{brand}/records/{record}/relationship` | The Before you reach out check (MCP `get_record_relationship`) |
| `GET /v1/brands/{brand}/crm/mail/records/{record}/meetings` | Meetings with a contact that you may see |
| `POST /v1/brands/{brand}/crm/mail/sends` | Send as yourself, from your own signed-in session |
| `GET /v1/brands/{brand}/crm/mail/sends/{send}` | How a send went: `queued`, `sending`, `sent` or `failed` |

See the [API reference](/docs/api/) for the rest of `/crm/mail/`.
