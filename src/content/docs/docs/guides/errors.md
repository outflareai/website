---
title: Errors
description: See the errors your website and servers throw, grouped into issues, with an alert for each new one and stacks in your own files and lines.
sidebar:
  order: 9.85
---

<span class="pill shipped">Shipped</span> In the web app, the REST API and the MCP server.

When your site or app throws an error, Outflare can record it, group the same bug into one **issue**, and tell you the first time it happens. In the app, open **Analytics** in the sidebar, then **Errors**. Error tracking runs inside Outflare and calls no third-party service.

## Turn it on

Error capture is off until you switch it on, so nothing changes on a site that doesn't want it.

1. Open **Errors**.
2. Flip the **Error capture** switch at the top. It saves at once, and nothing changes on your site.

The line beside the switch says what is happening: off, capturing errors on your site (with the script's last visit and the last error), or on but the script has sent no visit lately, with a link to check it. The same switch, **Capture errors**, is on your script under **Settings → Website tracking**. If the brand's site doesn't have the website script yet, the page shows **Add the website script** instead.

From the next page view, the [website script](/docs/guides/website-tracking/) sends uncaught errors and unhandled promise rejections as the event `Error Caught`. Because errors are ordinary events, [trends](/docs/guides/trends/), [funnels](/docs/guides/funnels/) and [alerts on a number](/docs/guides/trends/#alert-on-a-number) work on them too.

## Send errors you caught yourself

An error your own code caught, such as in a React error boundary, never reaches the browser's error handler. Send it yourself, with or without the switch:

```js
outflare.captureException(error, { component: "Checkout" });
```

From a server, the [server libraries](/docs/sdk/events/) do the same:

```js
tracker.captureException(err, { userId: user.id, properties: { route: "/checkout" } });
```

```python
tracker.capture_exception(err, user.id, {"route": "/checkout"})
```

## What an error carries

The type, the message, the stack, the page's path, and whether your code caught it. Before anything is sent, email addresses in the message and stack become `[email]`, long key-shaped strings become `[key]`, and query strings are taken off addresses. A page sends at most 20 errors, and at most 5 of the same one.

## Issues

The same bug is one issue, however many times it happens: errors are grouped by their type, their message with numbers and ids left out, and where in your code they were thrown. The list is a table with each issue's count, the visitors it reached, and when it was first and last seen, with a tab for each status. Search finds an error by its text or page, and filters show only new ones, ones back again, uncaught ones, or the website's or the server's. Opening an issue shows it day by day, the pages, browsers and release it happened on, and the latest errors with their stack and a link to the person when they are known.

- **Mark fixed** once it's fixed. If it happens again, it opens again, marked **Back again**, and alerts you.
- **Ignore** one you won't fix, such as noise from a browser extension. It never comes back or alerts.
- **Archive** one that may have stopped. It comes back quietly only if it happens again.
- **Delete** removes the issue and every error in it. It can't be undone; if it happens again it's a new issue.

Tick several rows to do any of these at once. Everything but Delete can be undone from the message that follows.

## Fix it with your AI coding assistant

**Copy fix prompt for AI** copies a prompt for Claude Code, Cursor or any coding assistant: the error, how often and where it happened, the pages, browsers and release, the stack (in your own files once you upload source maps), and what to do: find the cause, fix it rather than hide it, and add a test. **Show prompt** shows exactly what is copied, and selecting several errors on the list copies one prompt for up to 10. **Copy error** copies it as plain text for a ticket or a chat. Prompts never include who the visitor was.

## Alerts

The first error of an issue nobody has seen before raises an [alert](/docs/guides/alerts/), once for the issue. An issue you marked fixed raises one more when it comes back; an ignored or archived one raises none. A release that breaks many things at once stops at ten alerts an hour for a brand, and the rest are on the Errors page. Who gets the alert, by email or in Slack, is set under **Settings → Alerts** like every other alert.

## Source maps

A site's built code is minified, so a stack from it names functions `a` and `t` in `app-3f9a1c.js`. Upload the source map your build made for each file and the Errors page shows every stack in your own files, lines and function names, with **Show as sent** one press away.

Upload from your build or deploy script, once per `.map` file, with an API token that has `analytics.manage`:

```sh
jq -n --arg file /assets/app-3f9a1c.js --slurpfile map dist/assets/app-3f9a1c.js.map '{file: $file, map: $map[0]}' \
  | curl -X POST https://app.outflare.ai/v1/brands/$BRAND/source-maps \
    -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" --data-binary @-
```

- `file` is the built file as your site serves it: its path or its full address. Uploading the same file again replaces its map.
- `release` (optional) is your own name for the build, such as a version, to keep one map per build of a file whose name doesn't change.

Your source code is never kept: only names and positions are stored, and a map can't be downloaded again. A map uploaded after an error still explains it. **Errors → Source maps** lists what was uploaded, with the command to copy and a Delete on each row. A brand keeps its 300 newest maps.

Don't serve `.map` files from your site unless you mean to publish your source: upload them here and leave them out of the deploy.

## For agents and scripts

`GET /v1/brands/{brand}/errors` lists issues, `GET /v1/brands/{brand}/errors/{fingerprint}` reads one, `PATCH` marks it fixed (`resolved`), ignored, archived or open, `DELETE` deletes it with its errors, and `POST /v1/brands/{brand}/errors/bulk` does any of these to up to 200 at once. In the MCP server: `list_error_issues`, `get_error_issue`, `update_error_issue`, `bulk_error_issues`, `delete_error_issue`, `list_source_maps` and `delete_source_map`.
