---
title: Reviews
description: Every review of your brands on Trustpilot, G2, Capterra and Google in one place, your review score and where it's heading, and answers drafted for you to post.
sidebar:
  order: 15
---

<span class="pill shipped">Shipped</span> Trustpilot, G2, Capterra and Google reviews, read every day, with a review score, its direction and Draft answer, in the app, through the API and for agents.

**Reviews** (`/<workspace>/reviews`) has its own place in the menu. It shows what customers say about each brand: every review with its stars, sentiment, date, a link to it and your answer, each site's own score and count day by day, and one review score that tells you whether things are getting better or worse.

The Apple App Store and Google Play come next, on the same page.

## Start: your review pages

Reviews opens on **Your review pages**: each brand's pages on review sites, in one list.

1. **Add them.** Pages already in the brand's links are listed. With Geonode connected, Outflare searches the web for the brand's Trustpilot, G2 and Capterra pages and shows what it finds with **Confirm** and **Not ours**; **Find it** searches again. To add one by hand, paste its address in the box at the bottom. Google places are added by pasting the place's Google Maps link.
2. **Connect Geonode.** Pages are read through your own Geonode account. **Connect Geonode** opens it on Connectors, says what it's for, and brings you back once it's connected.
3. **Read every day.** A page is read as soon as you add or confirm it, then once a day. The first read brings in the page's earlier reviews too, so the history shows from day one.

| Site | The address to add |
| --- | --- |
| Trustpilot | `trustpilot.com/review/<your domain>` |
| G2 | `g2.com/products/<product>/reviews` |
| Capterra | `capterra.com/p/<id>/<product>/` |
| Google | The place's Google Maps link |

A page that shows no rating and no reviews (a challenge page, a login wall or a wrong address) shows an error on its row and is tried again the next day. It never reads as zero. For Google, the place's rating and count are read every day; individual reviews are read as far as the public page shows them.

**Pause** keeps a page and its reviews but stops reading it. **Remove** takes it off the brand's links; its reviews stay.

## Your review score

Each site's own score is shown as the site shows it. Outflare's **review score** (0 to 100) adds every review of a brand together, so you can follow one number over time:

- **Stars count most.** 1 star is 0 and 5 stars is 100.
- **Recent reviews count more.** A review counts half as much after 180 days.
- **More reviews count more.** The score starts from 10 imaginary 3.5-star reviews, so three 5-star reviews don't beat 900 reviews at 4.6.

**Direction** compares the last 28 days with the 28 before:

| Direction | What it means |
| --- | --- |
| Growing | New reviews are coming at least 15% faster, and the score held |
| Improving | The score rose by 2 points or more |
| Steady | About the same as before |
| Stagnating | New reviews slowed by 30% or more, or fewer than 8 came in 8 weeks |
| Slipping | The score fell by 2 points or more |
| Too few to tell | Fewer than 5 reviews so far |

Beside it: the average stars, how many reviews from the last 28 days were answered and how quickly, and how many were unhappy. **By site** shows each site's score, count, review score and direction.

## Draft answer

Every review has **Draft answer**. Your own AI model writes a public answer in a few seconds, from:

- **How you answer reviews**, at the bottom of the page: your tone, who signs, where to send people for help, what never to say, and notes such as known issues and their fixes. It starts from the brand's voice and rules; check it and save.
- the brand's name, what it does and who it's for;
- your past answers on that site, as examples;
- the reviewer's earlier reviews of the brand;
- the review itself, and the site's length limit.

Edit the draft, or type what to change ("shorter", "mention the fix") and **Rewrite**. Outflare never posts it: **Copy and open the review** copies it and opens the review on the site, where you post it. Then **Mark as answered**. Answers you post on the site are found on the next read anyway.

When a review looks fake, is spam or is about another business, the AI suggests not answering and says why; report it on the site instead. Drafts never offer anything in return for changing a review, never ask for it to be changed, never argue, and never include private details.

Unhappy reviews from the last 90 days with no answer go on the [fixes list](/docs/guides/site-audits/#the-fixes-list) until they're answered.

## Your own accounts only

Outflare never uses a shared Geonode or AI key. Review pages are read through your own Geonode account (a token or so a day per page once the history is in), and answers are drafted with your own AI model under **Settings → AI model** (the task "Review answers"). Until you connect Geonode, nothing is read; without an AI model, you write answers yourself.

## API and agents

Reading needs the `social.read` scope; changes need `social.manage`.

- `GET .../reviews` lists reviews (filter by site, page, sentiment, stars, `replied=false` for the ones waiting for an answer).
- `GET .../reviews/summary` gives the review score, direction, each site's numbers and the weekly series.
- `POST .../reviews/{id}/draft` drafts an answer; `POST .../reviews/{id}/replied` marks it answered.
- `GET .../reviews/pages`, `PATCH .../reviews/pages/{id}` and `GET .../reviews/pages/{id}/days` cover the pages and their numbers day by day.
- `GET` and `PUT .../brands/{brand}/review-guide` read and change how a brand answers.

Webhooks: `review.posted`, `review.replied`, `review.reply_drafted` and `review_momentum.changed`. In [Query](/docs/guides/query-and-search/), the `reviews` and `review_page_days` tables.

MCP tools: `get_reviews_summary`, `list_reviews`, `get_review`, `draft_review_answer`, `mark_review_answered`, `list_review_pages`, `update_review_page`, `read_review_pages`, `get_review_page_days`, `find_review_pages`, `get_review_guide` and `update_review_guide`.
