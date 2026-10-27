---
title: Feature flags
description: Turn something on for the visitors you pick, or split them between versions of a page to see which works better. Each visitor keeps their version, and your website and servers agree on it.
sidebar:
  order: 9.7
---

<span class="pill shipped">Shipped</span> In the web app (**Analytics → Feature flags**), the REST API and the MCP server.

A feature flag turns something on for the visitors you pick, or splits them between versions so you can see which works better: a new headline on half your visitors, a banner only for people from one campaign, a new checkout for 10% of visitors first. Your website reads flags through Outflare's [tracking script](/docs/guides/website-tracking/), and your servers through the API. Both get the same answer for the same visitor.

## Two kinds

- **A switch** is on or off for each visitor.
- **A split** gives each visitor one of two to ten versions, by weight, such as `control` 50% and `faster` 50%. A version can carry content, such as `{"headline": "Ship faster"}`, so a page can show a new headline without a deploy.

A new flag is off until you turn it on. While it's off, every visitor gets `false`, and your pages don't even learn it exists.

## Who gets it

- **Conditions.** The page's path, site, full address, a parameter of the address (such as `utm_source`), where the visitor came from, their device (computer, phone, tablet) and browser language. Your servers can also say whether someone is signed in, and send their own properties, such as their plan. Every condition must hold.
- **Rollout.** Of the visitors who match, the share that gets the flag at all. Raising it only adds visitors: nobody loses it.
- **Brand.** A flag for one brand reaches only that brand's site.
- **Servers only.** A flag can stay out of your pages entirely, for your servers alone.

## Each visitor keeps their version

The version comes from the flag and the visitor's own id, so the same visitor sees the same version on every page and every visit, and your servers agree with the page. Nothing extra is stored about them. Changing the split of a flag that's on moves some visitors to another version, and the page warns you before you do. Changes reach visitors within 10 seconds.

## On your website

Add `data-flags` to your tracking script's tag:

```html
<script async src="https://app.outflare.ai/site.js" data-key="ofk_test_not_a_real_key" data-flags></script>
```

Then use the visitor's versions in a script:

```html
<script>
  window.outflare = window.outflare || [];
  function onFlags(fn) { outflare.onFlags ? outflare.onFlags(fn) : outflare.push(["onFlags", fn]); }

  onFlags(function (flags) {
    if (flags["pricing-headline"] === "faster") {
      document.querySelector("h1").textContent = outflare.flagPayload("pricing-headline").headline;
    }
  });
</script>
```

- `outflare.onFlags(fn)` runs once the visitor's flags are known.
- `outflare.flag("pricing-headline")` gives the version, or `false`.
- `outflare.flagPayload("pricing-headline")` gives the version's content.

Or in CSS alone: the page gets a class for each version the visitor has, such as `of-flag-pricing-headline-faster`.

### No flicker

So visitors don't see the original for a moment before their version, put this first in your `<head>`. The page stays hidden until the flags arrive, and never longer than one and a half seconds:

```html
<script>document.documentElement.classList.add("of-wait"); setTimeout(function () { document.documentElement.classList.remove("of-wait"); }, 1500);</script>
<style>.of-wait body { opacity: 0 }</style>
```

### See a version yourself

Add `?of_flag=pricing-headline:faster` to any page's address to see that version, even before the flag is on. It lasts for the rest of your visit and only in your browser. Several go in one parameter: `?of_flag=pricing-headline:faster,chat-widget:on`.

## On your servers

Ask `POST /v1/workspaces/{ws}/flags/evaluate` with an API token that has `analytics.read`, passing the visitor's id from the page (`outflare.anonymousId()`) as `anonymous_id` so the server agrees with the page. It returns each flag that is on with the visitor's version and why. Agents use the MCP tools `list_flags`, `create_flag`, `update_flag`, `archive_flag` and `evaluate_flags`.

## Who can change them

Anyone with `analytics.read` sees flags; changing them needs `analytics.manage` (owners, admins and operators by default). Every change is in the audit log.
