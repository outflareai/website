---
title: Errors
description: See the errors your website and servers throw, grouped into issues without browser noise, with everything an engineer or an AI coding assistant needs to fix them.
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

The type, the message, the stack, the page and its site, and whether your code caught it. With it come the things a bug can depend on: the browser and operating system with their versions, the user agent, the browser's language, the visit's country, the window's size, and whether the visitor uses dark mode or reduced motion. None of it is anything a visitor typed or chose on the page.

Before anything is sent, email addresses in the message and stack become `[email]`, long key-shaped strings become `[key]`, and query strings are taken off addresses. The script never reads what a visitor typed. A page sends at most 20 errors, and at most 5 of the same one.

## Set up: three things that make errors easier to fix

**Errors → Set up** shows, for the last 7 days, which of these are done, with the snippets to copy. Each is done once, by whoever builds your site.

1. **Source maps**, so stacks show your own files, lines and function names ([below](#source-maps)).
2. **The release**, so each error says which version of your site it happened in, and each issue says which one it first appeared in. Add `data-release` to the Outflare script tag your site already has, filled in by your build with a version, a date or a commit:

   ```html
   <script async src="https://app.outflare.ai/site.js" data-key="ofk_..." data-release="2026.11.18"></script>
   ```

   Or call `outflare.setRelease("2026.11.18")` once the script has loaded. Use the same value as `release` when you upload source maps.
3. **React component names**, for sites built with React 19 or newer: the components the error happened inside. Pass them on where your app starts:

   ```js
   const report = (handled) => (error, info) =>
     window.outflare?.captureException(error, { component_stack: info.componentStack, handled });

   createRoot(document.getElementById("root"), {
     onUncaughtError: report(false),
     onCaughtError: report(true),
     onRecoverableError: report(true),
   }).render(<App />);
   ```

A production build of React or Redux Toolkit shortens its own errors to a code ("Minified React error #418"). Outflare spells these out with no setup.

## Issues

The same bug is one issue, however many times it happens: errors are grouped by their type, their message with numbers and ids left out, and the file they were thrown in without its build hash. So one bug is one issue in Chrome, Firefox and Safari alike, and a new build of your site doesn't split it. When the same bug still lands in two issues, tick them and choose **Merge into one**; **Split apart** on the issue's page takes a merge back.

The list is a table with a tab for each status. Each row shows how many times the error happened with a bar for each day, how many visitors it reached and what share of your visitors that is, the page where it hits the largest share of that page's visitors, and when it was first and last seen. Above the list, **Visitors who hit an error** is the share of all your visitors any error happened to. **New** marks an issue first seen in the period you are looking at. Search finds an error by its text or page, and filters show only new ones, ones back again, uncaught ones, the website's or the server's, or one site: with errors from more than one site (`example.com`, `app.example.com`), the list has a **Site** column and a site filter.

Opening an issue shows it day by day, the pages it happened on with the share of each page's views and visitors it reached, who changed its status and when, and every time it happened, 20 at a time. Each error opens to its stack, the React components, the release, the site, the browser and system with versions, the window and settings, **what the visitor did before** (their page views and events in the 30 minutes before it), a link to the recording when the visit was recorded, and a link to the person when they are known.

- **Mark fixed** once it's fixed. If it happens again, it opens again, marked **Back again**, and alerts you.
- **Ignore** one you won't fix, such as noise from a browser extension. It never comes back or alerts.
- **Archive** one that may have stopped. It comes back quietly only if it happens again.
- **Delete** removes the issue and every error in it. It can't be undone; if it happens again it's a new issue.

Tick several rows to do any of these at once. Everything but Delete can be undone from the message that follows.

## Noise: filters and ignore rules

Some errors aren't your site's. These are always kept out of the open list, under a **Filtered** tab with the reason, and never alert: errors thrown inside a browser extension, an email link scanner opening your page, code a crypto wallet or an in-app browser injects, a copy of your page saved to a file, and a copy served from a bare IP address.

**Ignore rules**, under **Errors → Ignore rules**, are your own filters. A rule looks in one part of an error (its message, its type, the files in its stack, the page's address or the site) for a piece of text. Matching errors, stored and new, move to **Filtered** and stop alerting; delete the rule and they come back. **Ignore errors like this** in an error's menu starts a rule from it. A rule on the site keeps a staging site's errors out.

To refuse errors from sites that aren't yours before they arrive, list your own sites on the script under **Settings → Website tracking** ("Sites it records").

## Fix it with your AI coding assistant

**Copy fix prompt for AI** copies a prompt for Claude Code, Cursor or any coding assistant: the error with its full message, how often and to what share of visitors it happened, the site and pages, browsers with versions, the window and settings, the release it first appeared in, the stack (in your own files once you upload source maps), the React components, and what to do: find the cause, fix it rather than hide it, and add a test. **Show prompt** shows exactly what is copied, and selecting several errors on the list copies one prompt for up to 10. **Copy error** copies it as plain text for a ticket or a chat. Prompts never include who the visitor was.

## Alerts

The first error of an issue nobody has seen before raises an [alert](/docs/guides/alerts/), once for the issue. An issue you marked fixed raises one more when it comes back; an ignored or archived one raises none. Filtered errors raise none. A release that breaks many things at once stops at ten alerts an hour for a brand, and the rest are on the Errors page.

**Emails are off until you switch them on.** A site that has just started capturing errors has many new ones, so nobody is emailed by default: new errors show on the Errors page and under Alerts. The **Emails about new errors** switch at the top of the Errors page turns the email on for the brand's owners and admins, and off again. Under **Settings → Alerts** you can also send them to Slack or Telegram through your own connection, and each person can mute them for themselves. Every alert email ends with a **Manage notifications** link to that page.

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

`GET /v1/brands/{brand}/errors` lists issues (`status` may be `filtered`, and `host` keeps one site), `GET /v1/brands/{brand}/errors/{fingerprint}` reads one, `PATCH` marks it fixed (`resolved`), ignored, archived or open, `DELETE` deletes it with its errors, and `POST /v1/brands/{brand}/errors/bulk` does any of these to up to 200 at once. `GET .../errors/{fingerprint}/occurrences` pages through every error of an issue, and `.../occurrences/{id}/before` is what the visitor did before one. `POST .../errors/merge` merges issues and `DELETE .../errors/{fingerprint}/merged/{merged}` splits one off again. Ignore rules are under `/v1/brands/{brand}/error-rules`.

In the MCP server: `list_error_issues`, `get_error_issue`, `list_error_occurrences`, `get_error_before`, `update_error_issue`, `bulk_error_issues`, `delete_error_issue`, `merge_error_issues`, `split_error_issue`, `list_error_rules`, `create_error_rule`, `update_error_rule`, `delete_error_rule`, `list_source_maps` and `delete_source_map`.
