---
title: Email templates
description: Write each lifecycle email once, with variables, preview it as you type, and publish versions your app sends by handle.
sidebar:
  order: 14
---

<span class="pill shipped">Shipped</span>

A template is an email you write once and send many times by its **handle**, such as `password-reset`. Open **Lifecycle → Email templates** and start from one of these:

- blank
- password reset
- sign-in code
- receipt
- welcome

## Drafts and versions

Editing changes a **draft**. Press **Publish** to make the draft the next version, with a note about what changed. From then on, sends use that version. A half-finished edit never reaches customers.

Every published version is kept. **Load into draft** brings an old one back. Your app can pin a version with `"version": 3` in the send.

## Variables

| Write | To get |
| --- | --- |
| `{{first_name}}` | A variable, escaped in HTML |
| `{{first_name\|there}}` | A fallback when it is empty |
| `{{user.plan}}` | A field of an object you pass |
| `{{{receipt_html}}}` | HTML you built yourself, not escaped |
| `{{#if coupon}}…{{else}}…{{/if}}` | A part shown only when it is set |
| `{{unsubscribe_url}}` | The one-click unsubscribe link (lifecycle email) |

Each variable can be:

- **required:** a send without it is refused with `template_variables_missing`, which names the missing ones
- given a **default**, used when the send leaves it out
- given an **example**, shown in the preview

When you save, the variables your content uses are added for you.

## Preview and test

The preview updates as you type, as desktop, phone or plain text, filled with your examples. **Send a test** sends the saved draft to you, marked as a test so it stays out of your numbers.

If you leave the plain-text part empty, Outflare makes it from the HTML.

## By API

```sh
curl -X POST "https://app.outflare.ai/v1/workspaces/$WS/email-templates" \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" \
  -d '{"name": "Receipt", "subject": "Your receipt for {{amount}}",
       "html": "<p>We received {{amount}}.</p>",
       "variables": [{"name": "amount", "required": true, "example": "$49.00"}],
       "publish": true}'
```

The MCP tools are `create_email_template`, `update_email_template`, `publish_email_template` and `preview_email_template`.
