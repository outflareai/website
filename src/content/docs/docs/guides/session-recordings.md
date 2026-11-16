---
title: Session recordings
description: Watch a visit to your website back, as the visitor saw it, where they moved, what they clicked and where they got stuck. Nothing a visitor types is ever recorded.
sidebar:
  order: 9.82
---

<span class="pill shipped">Shipped</span> In the web app, the REST API and the MCP server.

A **recording** plays a visit to your website back, as the visitor saw it: where they moved, what they clicked, how far they read and where they got stuck. It answers the question numbers can't: *why* did people leave this page?

Recordings come from the [website tracking](/docs/guides/website-tracking/) snippet you already have, so there is nothing new to install. They run inside Outflare and call no third-party service. They are off until you turn them on for a brand.

In the app, open **Analytics** in the sidebar, then **Recordings**. [Heatmaps](/docs/guides/heatmaps/) use the same settings.

## Turn it on

Open **Recordings › Settings**. Each setting saves as you change it, and your website picks it up within a minute. The switch at the top right of the Recordings page turns recording on or off without opening the settings.

| Setting | What it does |
| --- | --- |
| **Record visits** | Keeps a recording of visits to watch back. |
| **Heatmaps** | Counts where each page is clicked and how far down it is scrolled. |
| **Share of visits recorded** | Every visit, or a random share of them on a busy site. A visit is picked once, when it starts. |
| **Hide all text** | Also hides every piece of text on the page, for sites that show personal details. |
| **Keep recordings for** | 7 to 90 days. Older recordings are deleted for good. |
| **Shortest visit kept** | Recordings of visits shorter than this are deleted about half an hour after they end, so the list holds visits worth watching. |
| **Most recordings a day** | Once this many visits are recorded in a day (UTC), the rest of that day's visits aren't. Heatmaps keep counting. No limit by default. |
| **Only these pages** | Record and count only the pages you list, one per line: `/pricing`, or `/blog/*` for every page under it. Empty means every page. |
| **Never these pages** | Pages left out of recordings and heatmaps, such as `/account/*`. A visit that passes through one is still recorded on its other pages. |

Changing the settings needs the `customers.manage` permission; watching needs `customers.read`.

## What is and isn't recorded

- **Nothing a visitor types is ever recorded.** Every field is hidden before anything leaves the visitor's browser, and no setting turns that off.
- To hide one part of a page, add `data-of-mask` to it. `data-of-block` leaves the part out altogether and shows an empty box its size.

  ```html
  <div data-of-mask>Order #1042 for Ana at Acme</div>
  <section data-of-block>…</section>
  ```

- Where consent is needed (see the [consent banner](/docs/guides/consent-banner/)), a visitor is recorded only after they allow analytics, and recording stops if they withdraw it.
- `data-replay="off"` on the snippet keeps recordings and heatmaps off for that site, whatever the brand's settings say.
- Canvas drawings and the contents of frames from other sites are not recorded.

Say in your privacy notice that visits to your site may be recorded.

## Watch a visit

The list shows each visit's visitor, when it started, how long it lasted, the pages seen, clicks, device and country. A green dot marks the ones nobody has watched yet. Filter by page, device, length and period.

Open a row to watch the visit full screen: play and pause, drag to any moment, play at up to 8× speed, and skip the pauses where nothing happened. Once the visitor is known (they signed up or signed in), the recording links to their [person](/docs/guides/customer-records/).

A visit is one browser tab, up to four hours, and shows in the list a few seconds after it starts. Delete a recording from its page; its files are removed within ten minutes.

## Storage and limits

Recordings are kept as files, so the server needs file storage; the Recordings page says so when it has none. When you host Outflare yourself, set an S3-compatible bucket (Cloudflare R2, Amazon S3, MinIO) with `OUTFLARE_S3_ENDPOINT`, `OUTFLARE_S3_BUCKET`, `OUTFLARE_S3_ACCESS_KEY_ID` and `OUTFLARE_S3_SECRET_ACCESS_KEY`. Heatmaps need no bucket.

A recording stops at 4 hours or 60 MB and keeps what it has, and a workspace stores at most 5 GB of new recordings a day.

## API and agents

| Call | What it does |
| --- | --- |
| `GET /v1/brands/{brand}/replay/settings`, `PATCH` | Read and change the settings |
| `GET /v1/brands/{brand}/recordings` | List recordings, by `days`, `path`, `device`, `min_seconds` or `record_id` |
| `GET /v1/brands/{brand}/recordings/{recording}` | One recording; its parts are at `/parts/{part}`, in order |
| `DELETE /v1/brands/{brand}/recordings/{recording}` | Delete one |

In the MCP server: `get_replay_settings`, `update_replay_settings`, `list_recordings` and `delete_recording`. An agent can find the visits worth watching, such as the long ones on your pricing page this week, and point you at them.

The recorder is the open-source [rrweb](https://github.com/rrweb-io/rrweb), served from your own Outflare address and loaded only for visits that are recorded.
