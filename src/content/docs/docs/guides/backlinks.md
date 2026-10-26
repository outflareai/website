---
title: Track your backlinks
description: See the links other sites have to yours, merged from Ahrefs and DataForSEO on your own accounts, and which ones you gained, lost and got back each week.
sidebar:
  order: 14
---

<span class="pill shipped">Shipped</span> Backlinks from Ahrefs and DataForSEO, the feed of links gained, lost and regained, in the app, through the API and for agents.

Outflare keeps a history of the links other websites have to yours. Each week your [Ahrefs or DataForSEO connection](/docs/integrations/seo/) reads the links to every site you [audit](/docs/guides/site-audits/), and Outflare merges both tools into one list. When a link appears, disappears or comes back, Outflare records it and keeps it, so you still know what you lost after the tools have forgotten it.

In the app, open **SEO** in the sidebar, then **Backlinks**.

## What you need

- **A site.** Backlinks are read for the sites under **Site audits**. Add yours there; it doesn't need to be proved for this.
- **Ahrefs or DataForSEO, on your own account.** Outflare has no link data of its own and never lends you its account. Connect either tool (or both) on the Connectors page. Until one is connected, the page says which to add and reads nothing.

## One list from both tools

A link is one page on another site linking to one page on yours. When Ahrefs and DataForSEO both find it, it is still one row, and each tool's own view sits beside it: whether it still sees the link, when it first found it, how strong the linking domain is, and its spam judgement.

- **Rating** is the linking domain's strength, 0 to 100: Ahrefs DR when Ahrefs saw the link, otherwise DataForSEO's rank on the same scale. The two tools measure differently, so don't compare one tool's number with the other's.
- **Followed or nofollow**, plus sponsored and user-generated links, come from the link's rel attributes.
- Links between your own subdomains are not backlinks and are left out.

## Gained, lost and regained

A link is **live** while any of your tools still finds it, and **lost** once none does. Each change is an event in the **Changes** feed:

| Event | When |
| --- | --- |
| New | A tool finds a link for the first time |
| Lost | No tool finds it any more, dated by the tool's last sighting, with the reason when the tool knows it (removed from the page, page gone, page redirects, noindex) |
| Regained | A lost link is found again |

The first read of a site is a baseline: only links found or lost in the 30 days before it show as events, so years-old links don't arrive as news. The page's totals count live and lost links, referring domains and followed links, with what you gained and lost in the last 30 days and in each of the last 12 weeks.

## How much it reads and costs

Each week Outflare asks each tool for the 200 links from the strongest linking domains, plus the links lost in the last 90 days, for each site. Change the number per connection (1 to 1,000) with `link_rows` in its SEO settings.

- **DataForSEO:** about $0.03 a site a week.
- **Ahrefs:** about 50 to 200 API units a site a week at the default size.

The read counts against the connection's monthly budget like any other SEO call, and its cost is in Outcomes. If a read fails (a missing Backlinks subscription at DataForSEO, say), the page shows why and the rest of the snapshot still runs. To read now instead of waiting for the week, take a snapshot on **Rankings & backlinks**, or call `POST /v1/workspaces/$WS/seo/$ID/sync`.

## API and agents

```sh
# Links, strongest first: free, reads what is stored
curl -H "Authorization: Bearer $TOKEN" "$URL/v1/workspaces/$WS/backlinks?status=live&order=rating"

# What changed in the last 30 days
curl -H "Authorization: Bearer $TOKEN" "$URL/v1/workspaces/$WS/backlinks/events?days=30"

# Each site's totals and weekly trend
curl -H "Authorization: Bearer $TOKEN" "$URL/v1/workspaces/$WS/backlinks/summary"
```

They need the `seo.read` scope, and a brand's token sees only its brand's sites. Agents use the MCP tools `list_backlinks`, `list_backlink_events` and `get_backlinks_summary`, and can ask things like "which strong links did we lose this month?". Each weekly read is the audit action `backlinks.synced`, with how many links were seen, gained, lost and regained.
