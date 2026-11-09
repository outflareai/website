---
title: Team directory
description: Keep everyone who works at the company in one list, with their department, team and manager, and the work accounts the company owns and hands to them.
sidebar:
  order: 1.45
---

<span class="pill shipped">Shipped</span> The team directory, in the web app, the REST API and the MCP server.

**Settings → Team** lists everyone who works at the company, whether or not they sign in to Outflare, and the work accounts the company owns and hands to them: Telegram accounts, work emails and phone numbers. It belongs to the workspace, like members and teams, because one person can work across brands.

## People and departments

Each person has a name, a work email, a title, a department, a team and a manager. Add them with **Add person**; nobody needs an Outflare sign-in to be listed.

- **Departments** have a name and a head. A team (**Settings → Teams**) can sit in a department and have a lead.
- **Leaving.** Choose **Start their handover** when someone hands in their notice. The page shows a banner for anyone leaving who still holds company accounts, so nothing is forgotten. Choose **Mark as left** when they've gone. People who left stay in the list for history.
- **Removing** is for someone added by mistake. Someone who has held a company account can't be removed: mark them left instead, so the account's history stays whole.
- Deleting a department keeps its people and teams; they just have no department.

## Company accounts

Accounts belong to the company, not the person. When someone leaves, their accounts pass to the next person, and each account keeps who held it and when.

- **Add company account** takes the kind (Telegram, email or phone), its address and a label people know it by, such as *Sales 3*. Telegram usernames can be typed with or without the `@`; phone numbers are stored in international format (`+447700900123`).
- **Renews on** (for a phone number) is when its plan must next be renewed or topped up, so the number never lapses.
- **Hand to** *name* gives it to someone; **Take it back** leaves it unheld. Someone who has left can't be given an account.
- **Retire** an account you no longer use. Retiring ends its holder's time with it. An account that has had a holder can't be removed, only retired.

## Sign a Telegram account in to Outflare

A company Telegram account signs in to Outflare once, as a linked device, the way Telegram Desktop does. Outflare only reads its chats, so they can reach customer records; it never sends from it.

1. **Connect your Telegram app** under **Connectors → Telegram**, with the App api_id and api_hash your company registers at [my.telegram.org](https://my.telegram.org/apps). Every account signs in through your own app. You can also add a proxy from your own provider (`socks5://user:password@host:port`), ideally in the accounts' country, so Telegram always sees them from the same place.
2. In **Settings → Team**, open the account's menu and choose **Sign in to Telegram**. A QR code appears.
3. On the account's phone, open Telegram, then **Settings → Devices → Link Desktop Device**, and scan it. A new code appears every 30 seconds.
4. If the account has a two-step password (it should), type it once. It's used to finish signing in, then deleted.

Outflare shows in the account's **Devices** list as *Outflare*, where it can be ended at any time. Each signed-in account is checked every six hours: who it's signed in as, whether a two-step password and login email are set, and how many other devices are signed in. If the session ends, the account shows as signed out until someone scans a new code. Retiring an account signs it out.

**Lock it down.** Each Telegram account has a checklist so the company never loses it: the number on the company's own account, a two-step password, a company login email, a passkey, the password in your password manager, unknown devices signed out, and account deletion set to its longest. The two-step password and login email are read from Telegram; tick the rest yourself.

## Sync chats into the CRM

Once an account is signed in, its chats can go into one brand's CRM. In the account's **Sign in to Telegram** panel, under **Chats in the CRM**, pick the brand and how far back to copy (the last year by default), then **Start syncing**. Outflare copies the history first, then reads new messages every two minutes. It only reads: nothing is sent, and messages stay unread on the phone.

- **Left out:** Saved Messages, bots and channels people only read. A chat with another company account in your team directory is marked internal and its messages aren't copied.
- **Kept safe:** names, usernames, phone numbers and message text are encrypted at rest. Files aren't copied, only what was attached (a photo, a voice note, a file's name).
- **Who sees it:** anyone who can read the brand's customers. Mark a chat **private** and only the account's holder and people who manage the team see it. Mark it **personal** and what was copied is removed, and nothing more is.
- **One brand per account:** an account's chats stay in the brand they were first synced into.
- **Pause** stops new messages and keeps what was copied. Start again to carry on, or pick a longer history to copy further back.

## Match chats to customers

Each synced chat is matched to a customer: a person, or a company for a group chat. Once it is, the customer's Telegram conversations sit on their record with everything else.

1. **Outflare looks first.** A customer who already has the chat's Telegram account is linked straight away. Otherwise Outflare looks for a customer with the same phone number or username, an email address the other side wrote in the chat, or, in a group, a company's domain, and suggests them.
2. **Then your AI.** For the rest, Outflare asks your workspace's own AI (**Settings → AI**, Telegram matching) to pick from customers with a similar name, using the chat's last few messages. It may also say a chat looks personal; that's only a hint. Without an AI connected, these chats wait as **No customer found**.
3. **You confirm.** **CRM → Telegram → To confirm** lists the chats on your accounts that need you. **Confirm** the suggestion, **Change** to pick another customer or create one, or mark the chat personal or a colleague from its menu.

Confirming gives the customer that Telegram account, so the next chat with them, on any company account, links by itself. Click a chat to read its messages.

## Summaries and alerts

- **Customers waiting.** When a customer writes last in a private chat, the chat shows how long they've waited (**CRM → Telegram → Waiting for an answer**). After four hours the account's holder gets an alert, once per wait, by email or Slack as you choose in **Settings → Alerts**. Old waits from the history import don't alert.
- **Summaries.** Open a chat and press **Summarise**: your workspace's own AI (**Settings → AI**, Telegram summaries) writes what they want, what was agreed, what's still open and who owes the next message. It says when new messages came in since.
- **Handovers.** When you give a synced account to someone else in **Settings → Team**, its customer chats from the last 30 days are summarised for them, and they get an alert pointing to the chats.

## API and MCP

| What | REST API | MCP tools |
| --- | --- | --- |
| People | `GET`/`POST /v1/workspaces/{ws}/staff`, `GET`/`PATCH`/`DELETE .../staff/{id}` | `list_staff`, `get_staff_member`, `create_staff_member`, `update_staff_member` |
| Departments | `GET`/`POST .../departments`, `PATCH`/`DELETE .../departments/{id}` | `list_departments`, `create_department` |
| Company accounts | `GET`/`POST .../staff-accounts`, `GET`/`PATCH`/`DELETE .../staff-accounts/{id}` | `list_staff_accounts`, `get_staff_account`, `create_staff_account`, `update_staff_account` |
| Telegram sign-in | `GET`/`PATCH .../staff-accounts/{id}/telegram`, `POST .../telegram/connect`, `.../password`, `.../check`, `.../disconnect` | `get_telegram_session` |
| Telegram sync | `POST .../staff-accounts/{id}/telegram/sync`, `POST .../telegram/sync/pause` | |
| Synced chats | `GET /v1/brands/{brand}/telegram-chats` (`match_status` and `mine` for the queue, `waiting` for customers waiting), `GET`/`PATCH .../telegram-chats/{id}`, `GET .../telegram-chats/{id}/messages`, `POST .../telegram-chats/{id}/match`, `POST .../telegram-chats/{id}/summary` | `list_telegram_chats`, `list_telegram_messages`, `update_telegram_chat`, `match_telegram_chat`, `summarize_telegram_chat` |

Reading needs the `members.read` scope and changing needs `members.manage`, which owners and admins have. Synced chats need `customers.read`, and `customers.manage` to sort and match them. Every change is in the audit log.
