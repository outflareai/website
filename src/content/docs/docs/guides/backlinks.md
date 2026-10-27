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

## Read it like Ahrefs

The links table follows Ahrefs' backlinks report, and it only reads what Outflare stored, so you can filter as much as you like without spending anything.

- **Full URLs you can click.** Each row shows the referring page's title and its whole URL, and the anchor with the whole target URL on your site. When the target redirects, each hop shows under it (for example `301 →` and the page it lands on). Every URL opens in a new tab.
- **One link per domain.** By default each linking domain is one row, the best link from it (live, followed, in the page's content, from its strongest page). The number in **Links** says how many links it stands for; open it to see the rest. Switch to **One link per page** or **All links**.
- **All, New and Lost, with history.** **All** shows live links plus the ones lost in the range you pick under **Show history** (last 7 days to all time). **New** lists links first seen in that range, **Lost** links lost in it, with the reason when the tool knows it.
- **Filters.** Dofollow, nofollow, UGC and sponsored; backlink type (in content, text, image, redirect, canonical and more); DR; domain traffic; the referring page's type (article, listing, forum and so on); spam score; and a word or phrase, anywhere or only in the referring page URL, its title, the anchor or the target URL.
- **Columns.** DR (the linking domain's strength) and UR (the page's), domain traffic, the page's referring domains, linked domains and external links, page traffic, keywords the page ranks for, the anchor and target, and first seen, last seen and lost dates. Sort by any of the numbers or dates.

Filters stay in the page's address, so you can bookmark or share a view.

### Where each detail comes from

Ahrefs gives every column. DataForSEO gives the page's rank (shown as UR), the link type, language, platform and redirects, but no traffic or page type. Traffic costs extra on Ahrefs, so it's off until you turn on **Read traffic for each backlink** in the Ahrefs connection's settings on **Rankings & backlinks** (or `link_traffic: true` in its SEO settings). It adds about 25 Ahrefs units a link: about 5,200 units a site a week at the default 200 links. New details fill in on the next weekly read, or straight away with **Snapshot now**.

## Gained, lost and regained

A link is **live** while any of your tools still finds it, and **lost** once none does. Each change is an event in the **Changes** feed:

| Event | When |
| --- | --- |
| New | A tool finds a link for the first time |
| Lost | No tool finds it any more, dated by the tool's last sighting, with the reason when the tool knows it (removed from the page, page gone, page redirects, noindex) |
| Regained | A lost link is found again |

The first read of a site is a baseline: only links found or lost in the 30 days before it show as events, so years-old links don't arrive as news. The page's totals count live and lost links, referring domains and followed links, with what you gained and lost in the last 30 days and in each of the last 12 weeks.

## Spam links and the disavow file

Every link gets a **spam score** from 0 (clean) to 100 (spam), and hovering it says why. The score is the higher of your SEO tool's own judgement (DataForSEO's spam score, Ahrefs' spam flag) and Outflare's own checks added up:

- a very weak linking domain
- a domain ending that spam networks favour
- spam words in the link text, such as casino or payday
- a page with hundreds of outgoing links (a link farm)
- the same domain linking to you 100 times or more

From 30 a link is **suspect**, from 60 **toxic**. The **Toxic links** total shows how many still need a look; filter the list with **Toxic** to see them.

Nothing happens on a score alone. Open **Review** on a link and choose:

- **Keep: it's a real link**, for a link you want.
- **Disavow this link**, or **Disavow every link from** its domain.
- **Clear the review**, to undo either.

Once something is marked, **Download disavow file** gives you the text file for Google Search Console's disavow links tool. It lists a whole domain (`domain:`) when every link from it is marked, and single pages otherwise. Upload it yourself in Search Console. Outflare never uploads it and never contacts the sites that link to you. Most sites never need a disavow file at all: Google ignores most spam links on its own.

## Link opportunities on the fixes list

Each weekly read, and each review, puts what is worth doing about a site's links on the workspace's [fixes list](/docs/guides/site-audits/#the-fixes-list), next to the site audit's fixes:

| Fix | One per | When |
| --- | --- | --- |
| Win back a lost link | linking domain | A domain rated 30 or more stopped linking to you in the last 90 days |
| Redirect a broken page | page | Live links point to a page your latest crawl found broken (4xx or 5xx) |
| A domain that links to competitors | domain | A domain rated 30 or more links to 2 or more of your tracked [competitors](/docs/guides/competitors/) but not to you |
| Review toxic links | site | Toxic links nobody has reviewed yet |

Each kind adds at most 25 fixes a site, strongest first. A fix the next read no longer finds is done, and one marked done that is still found opens again. Marking links to disavow takes them out of the win-back and broken-page fixes. Open a fix to copy a prompt that lists the links behind it for your own agent, or jump to Backlinks or Competitors.

These are suggestions only. Outflare never contacts a site, asks for a link or disavows anything on its own.

## How much it reads and costs

Each week Outflare asks each tool for the 200 links from the strongest linking domains, plus the links lost in the last 90 days, for each site. Change the number per connection (1 to 1,000) with `link_rows` in its SEO settings.

- **DataForSEO:** about $0.03 a site a week.
- **Ahrefs:** about 50 to 200 API units a site a week at the default size, plus about 25 units a link if you turn on link traffic.

The read counts against the connection's monthly budget like any other SEO call, and its cost is in Outcomes. If a read fails (a missing Backlinks subscription at DataForSEO, say), the page shows why and the rest of the snapshot still runs. To read now instead of waiting for the week, take a snapshot on **Rankings & backlinks**, or call `POST /v1/workspaces/$WS/seo/$ID/sync`.

## API and agents

```sh
# Links, strongest first: free, reads what is stored
curl -H "Authorization: Bearer $TOKEN" "$URL/v1/workspaces/$WS/backlinks?status=live&order=rating"

# One followed link per domain from DR 50 and up, new in the last month
curl -H "Authorization: Bearer $TOKEN" "$URL/v1/workspaces/$WS/backlinks?group=domain&follow=dofollow&dr_min=50&change=new&since=2026-09-27"

# Links lost since a date, and links whose anchor mentions a phrase
curl -H "Authorization: Bearer $TOKEN" "$URL/v1/workspaces/$WS/backlinks?change=lost&since=2026-09-01"
curl -H "Authorization: Bearer $TOKEN" "$URL/v1/workspaces/$WS/backlinks?q=free%20trial&q_in=anchor"

# What changed in the last 30 days
curl -H "Authorization: Bearer $TOKEN" "$URL/v1/workspaces/$WS/backlinks/events?days=30"

# Toxic links nobody reviewed yet
curl -H "Authorization: Bearer $TOKEN" "$URL/v1/workspaces/$WS/backlinks?spam=toxic&review=none"

# Mark a domain to disavow, then download the file
curl -X PATCH -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"review": "disavow", "domain": true}' "$URL/v1/workspaces/$WS/backlinks/$LINK"
curl -H "Authorization: Bearer $TOKEN" "$URL/v1/workspaces/$WS/backlinks/disavow?site_id=$SITE" -o disavow.txt

# Link opportunities on the fixes list
curl -H "Authorization: Bearer $TOKEN" "$URL/v1/workspaces/$WS/fixes?source=seo_links&status=open"

# Each site's totals and weekly trend
curl -H "Authorization: Bearer $TOKEN" "$URL/v1/workspaces/$WS/backlinks/summary"
```

Reading needs the `seo.read` scope and reviewing needs `seo.manage`, and a brand's token sees only its brand's sites. Agents use the MCP tools `list_backlinks` (with `spam=toxic`), `list_backlink_events`, `get_backlinks_summary`, `review_backlink` and `get_disavow_file`, and can ask things like "which strong links did we lose this month?". Agents see link opportunities with `list_fixes` (`source: seo_links`) and `get_fix_prompt`. Each weekly read is the audit action `backlinks.synced`, with how many links were seen, gained, lost and regained and how many link opportunities it added, reopened and confirmed.
