---
title: Team inbox
description: One Inbox for support conversations and replies to outreach, with views, teams, private notes, looping teammates in, saved replies, Online and Away for chats, alerts for new chats and a hand-off to sales.
sidebar:
  order: 8
---

<span class="pill shipped">Shipped</span> One Inbox for support and sales, everyday actions on every row, working together, saved replies, Online and Away, sound and notifications and handing a conversation to sales.

The **Inbox** is one page for everything your customers and leads write to you: support conversations (email and the chat on your website) and [replies to outreach](/docs/guides/inbox/). Support and sales each see what is theirs, and the customer never needs to know which team answers.

## Views

The column on the left lists the views. Pick one and the list beside it changes; open a conversation and it shows beside the list, with the customer's details on the right.

| Group | Views |
| --- | --- |
| Support | Your inbox, Watching, Unassigned, Overdue, Open, Waiting on customer, Closed, All conversations |
| Sales | New replies, Watching, Snoozed, Done, All replies, From support, then your saved views of replies |

The Inbox remembers the last view you picked. If support isn't set up yet, it starts on Sales and the Support views show how to set it up.

## Everyday actions

Everything you do many times a day is one click away, and nothing is only behind a right-click:

- **Right-click a row**, or use its **More** button: open in a new tab, mark as unread, assign to me, **Assign to** a teammate, **Move to team**, **Loop in**, snooze, close or mark done, copy link.
- **Tick several rows** and the same actions apply to all of them from the bar that appears.
- **Undo** from the message that confirms what you did.
- **Keyboard shortcuts**: `j` and `k` to move, `r` to reply, `n` for a note, `e` to close or mark done, `u` for unread, `a` to assign to yourself, `/` to search. The **Keyboard shortcuts** button under the views lists them.

## Working together

- **One owner.** A conversation has one assignee and can sit with a team. Assigning and moving never change what the customer sees.
- **Private notes.** Switch the reply box to **Private note** to write something only your team sees. A note is never sent.
- **Loop in.** Loop a teammate in to keep them in the picture without handing the conversation over. It shows under their **Watching** view, which is how an account manager follows a customer's conversations without owning them.
- **The person looped in is told.** Their Watching view shows how many are new, and a message with an **Open** button appears in their Inbox. If they haven't opened it after five minutes, they get one email with a link. The email says who looped them in and nothing about the customer.
- **You see who else is there.** A line above the reply box says when a teammate has the same conversation open, or is writing in it right now, so two people don't answer the same customer. It is a warning, not a lock.

## Saved replies and AI drafts

**Saved replies** are answers your team wrote once, shared by the brand and used in both support and sales. Pick one from the menu in the reply box and it drops in with `{first_name}` and `{my_name}` filled in. The most used come first; **Manage saved replies** adds, edits and deletes them.

**Draft with AI** writes a draft from the knowledge your customers may be told, for you to edit and send. It runs on your own [AI model](/docs/agents/ai-models/), connected with your own key; without one the button says which connection to add. Outflare never pays for the AI or lends you a key. For answers written without you, see the [support assistant](/docs/guides/support-assistant/).

## Online and Away

At the top of the Inbox, say whether you are **Online** or **Away** for new chats. You stay online while the Inbox is open; closing the tab takes you out within three minutes.

- A new chat from your website goes to whoever is online with the fewest open conversations.
- If they don't answer within 30 seconds, it moves to the next person online.
- When nobody is online, or nobody has answered within two minutes, the chat asks the visitor for an email address and the conversation carries on by email from your support mailbox. This is offered only when the brand has a support mailbox.
- A reply to a visitor who has left the chat, and gave an address, is also sent by email. Their answer lands in the same conversation.

A brand that never uses the switch works as before: chats wait unassigned.

## Sound and notifications

New chats and messages show up in the Inbox on their own, with a message and an **Open** button. Turn on **Sound and notifications** under the Online and Away switch to also hear a short chime and, when the Inbox tab is in the background, get a notification from your browser. It is off to start and is remembered per browser; the browser asks once for permission.

## Hand a conversation to sales

When a support conversation turns into a sales opportunity, press **Sales opportunity**. Pick the team, add a note, and the conversation moves to that team, unassigned and unread, with your note on it. You stay looped in. You can also flag the customer under [Needs attention](/docs/guides/signals/) in the same step.

Sales finds these under **From support**. If your own AI model reads support conversations for signals and spotted an opportunity, a line above the reply box suggests the hand-off; there is no extra AI call.

## API and agents

Everything on this page is in the [API](/docs/api/) under `/v1/brands/{brand}/`: `support/conversations`, `inbox`, `saved-replies`, `inbox-presence`, `inbox-loop-ins`, `inbox-viewing` and `support/conversations/{id}/hand-off`. Reading needs `inbox.read`; changing anything needs `inbox.manage`.

Agents use the [MCP server](/docs/agents/mcp/): `add_inbox_note`, `loop_in_on_inbox_message`, `list_saved_replies`, `create_saved_reply`, `suggest_inbox_reply` and `hand_off_support_conversation`. Message text is stored and returned as data, never acted on as instructions.
