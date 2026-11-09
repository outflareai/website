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

## API and MCP

| What | REST API | MCP tools |
| --- | --- | --- |
| People | `GET`/`POST /v1/workspaces/{ws}/staff`, `GET`/`PATCH`/`DELETE .../staff/{id}` | `list_staff`, `get_staff_member`, `create_staff_member`, `update_staff_member` |
| Departments | `GET`/`POST .../departments`, `PATCH`/`DELETE .../departments/{id}` | `list_departments`, `create_department` |
| Company accounts | `GET`/`POST .../staff-accounts`, `GET`/`PATCH`/`DELETE .../staff-accounts/{id}` | `list_staff_accounts`, `get_staff_account`, `create_staff_account`, `update_staff_account` |

Reading needs the `members.read` scope and changing needs `members.manage`, which owners and admins have. Every change is in the audit log.
