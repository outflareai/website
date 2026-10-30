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

## Exclusion groups

Two A/B tests running at once on the same pages can share visitors, and one change can alter the other's effect. Put their flags in one **exclusion group**, such as `homepage`, to keep them apart. Each flag takes its share of the group's visitors (half by default) and is off for everyone else in the group, so no visitor is in two of the group's tests and each test measures its own change cleanly. Which share a visitor falls in comes from the group's name and their id, so it's the same on every page and server.

A group holds 100% of its visitors: a flag asking for more than is free is refused, and you can give it a smaller share or take a flag out. A flag's group and share are fixed while its A/B test runs, since changing them would change who the test measures.

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

To see which version wins, run an [A/B test](/docs/guides/ab-tests/) on the flag. A page that reads a flag (or, with `data-flags`, shows its class) tells Outflare once per visit, so the test counts that visitor.

### No flicker

The script loads without holding up your page, so the original can show for a moment before a version replaces it. There are two ways to prevent that.

**Decide on your server (best).** Your server asks for the visitor's flags ([below](#on-your-servers)), renders their version, and hands the same answer to the page in a tag the script reads first. The visitor sees their version in the first paint, and the test still counts them.

```html
<script type="application/json" id="outflare-flags">{"anonymousId":"the visitor's id","flags":{"pricing-headline":"faster"},"payloads":{}}</script>
```

Decide for the visitor's `of_aid` cookie when they have one; otherwise make an id (8 to 64 letters, digits and dashes) and the script keeps it for the visit. The SDKs build the tag for you, escaped so content in a version can't break out of it: `flagsBootstrapTag` in TypeScript and `flags_bootstrap_tag` in Python. The same works at the edge, such as a Cloudflare Worker in front of a static site. Keep your API token on the server.

**Hide the page until the flags arrive.** On a static site with no server of your own, put this first in your `<head>`. The page stays hidden until the flags arrive, and never longer than one and a half seconds:

```html
<script>document.documentElement.classList.add("of-wait"); setTimeout(function () { document.documentElement.classList.remove("of-wait"); }, 1500);</script>
<style>.of-wait body { opacity: 0 }</style>
```

Within a visit, the next page starts with the last answer at once. An [A/B test's checklist](/docs/guides/ab-tests/#before-you-start) shows how long visitors actually waited for their version.

### See a version yourself

Add `?of_flag=pricing-headline:faster` to any page's address to see that version, even before the flag is on. It lasts for the rest of your visit and only in your browser. Several go in one parameter: `?of_flag=pricing-headline:faster,chat-widget:on`.

### Change a page without code

For a version of a split, open the flag in **Analytics → Feature flags**, enter a page of your site under **Page to edit on**, and choose **Edit visually** next to the version. The page opens in a new tab with that version and an editor over it: click anything to change its text, hide it, or change a link or an image. **Save** in the editor, and visitors who get that version see the changes within a minute. The page needs the tracking script with `data-flags`.

- Each change applies to every element like the one you clicked.
- Text goes in as text, never HTML, and links and images only go to `https://` addresses or paths on your site.
- Showing a visitor the changes counts them in the flag's [A/B test](/docs/guides/ab-tests/).
- A version holds up to 50 changes. They're kept in its content as `changes`, so you can also write or review them there.

The editor link works for two hours, only for that version, and only while you can still change flags. It carries a secret, so don't share it.

## On your servers

Ask `POST /v1/workspaces/{ws}/flags/evaluate` with an API token that has `analytics.read`, passing the visitor's id from the page (`outflare.anonymousId()`) as `anonymous_id` so the server agrees with the page. It returns each flag that is on with the visitor's version and why. Agents use the MCP tools `list_flags`, `create_flag`, `update_flag`, `archive_flag` and `evaluate_flags`.

## Who can change them

Anyone with `analytics.read` sees flags; changing them needs `analytics.manage` (owners, admins and operators by default). Every change is in the audit log.
