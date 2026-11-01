---
title: Watch the news and find journalists
description: Save news searches that run on your own Geonode account, keep every article about your brand as its coverage, and find the journalists who cover your topics, with media lists that keep themselves up to date.
sidebar:
  order: 15
---

<span class="pill shipped">Shipped</span> The news watch, coverage, journalists and media lists, in the app, through the API and for agents.

The news watch reads the news for you. Save a search and Outflare runs it on a schedule, keeps every article it finds, and tells you who wrote it. It is the first part of digital PR in Outflare: see what is being written about your topics and your brand, find the journalists who cover them, then turn what you have into a [story](/docs/guides/stories/) and pitch it to them.

Choose a [brand](/docs/guides/brands/), then open **Outreach → News watch**. It has four tabs: **Coverage**, **Articles**, **Journalists** and **Searches**.

## What it needs

A web search connection on your own account: [Geonode](/docs/integrations/seo/). Each run is one search on your Geonode account, recorded in your spend and kept within the usage limit you set on the connection (**Connectors → Geonode → Usage**). Outflare never runs a search on a key of its own: without a web search connection, searches wait and say they need one, and a search that reaches your limit tries again at its next time.

## Searches

A search follows one of two things:

- **A topic**, such as "residential proxies", to see what is being written and who writes it. A topic can belong to one brand or be shared by every brand.
- **Your brand**, such as "Northpeak", to keep each article about it as that brand's **coverage**. A coverage search belongs to a brand.

For each search, choose how far back each run looks (a day, a week or a month), how often it runs (every 6 hours to once a week; daily by default) and, if you like, a language. Pause a search to keep it without running it.

A new search runs straight away, and **Run now** runs it again whatever its schedule. A run that fails is tried again soon: after 15 minutes, then after 1 and 2 hours, then every 4 hours. A search that has no connection, or whose key was refused, waits for its schedule instead, since only you can fix that. Each search shows why its last run failed until a run works again.

## Articles

Each run keeps up to 50 results. An article is kept once per workspace, however many searches find it, without tracking tags such as `utm_` parameters, and with the searches that found it. Deleting a search deletes the articles only it found.

## Coverage

An article from a coverage search becomes your brand's coverage when its title or snippet names every word of the search and it isn't on your own website. Each item sits on the outlet's company record (a prospect company if you have none), so what you know about an outlet is in one place.

New coverage waits for a person: **Confirm** it or **Dismiss** it. Add an article the watch missed yourself. Each item shows whether the article links to your site once someone has checked. You can also put an item on one of your [stories](/docs/guides/stories/), so the story's results count it.

The news watch's coverage feeds [Coverage](/docs/guides/coverage/)'s discovery list, where you manage placements and publisher relationships in depth.

## Journalists

Outflare's crawler reads each new article once, up to 20 from each run, for its byline and the date it was published. It obeys `robots.txt` and sites that opt out of crawling, and costs nothing.

When a byline is one person's name, the free email finder looks for their address at the outlet's own domain. When it is fairly sure, the author becomes a **journalist**: a person on the outlet's company record, like any other contact, with the articles they wrote. Outflare never buys journalist data.

The **Journalists** tab lists each journalist with how many articles they wrote, their latest, their outlets and the searches their articles came up in, most articles first. Narrow it to one search to see who covers that topic, and open a journalist to see what they wrote.

### Media lists

A media list is a [smart list](/docs/guides/smart-lists/) of the journalists who wrote an article a search found, ever or in the last so many days. It keeps itself up to date as the news watch finds new articles, and works like any other list. On the **Journalists** tab, **Make a media list** creates one for a search.

## Permissions

Reading searches, articles, coverage and journalists needs `seo.read`. Saving, changing and running searches, and confirming or adding coverage, need `seo.manage`. A member limited to some brands sees and changes only those brands' searches and coverage, plus the shared topics.

## API and agents

| Call | What it does |
| --- | --- |
| `GET /v1/workspaces/{ws}/news-searches`, `POST` | List or save searches |
| `PATCH /v1/workspaces/{ws}/news-searches/{search}`, `DELETE` | Change, pause or delete a search |
| `POST /v1/workspaces/{ws}/news-searches/{search}/run` | Run a search now |
| `GET /v1/workspaces/{ws}/news-articles` | Articles found, by search or by journalist (`journalist_id`) |
| `GET /v1/workspaces/{ws}/coverage`, `POST` | Coverage, or add an article yourself |
| `PATCH /v1/workspaces/{ws}/coverage/{coverage}` | Confirm or dismiss coverage, mark whether it links, or put it on a story |
| `GET /v1/workspaces/{ws}/journalists` | Journalists, most articles first, optionally for one search |

A media list is a smart list with the rule `{"news_search": "<search id>", "op": "exists", "within_days": 90}`. Agents use the MCP tools `create_news_search`, `list_coverage` and `list_journalists`, among others.
