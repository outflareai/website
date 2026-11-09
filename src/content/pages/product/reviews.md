---
title: "Review monitoring for Trustpilot, G2 and Google · Outflare"
description: "Every review of your brands on Trustpilot, G2, Capterra and Google in one place, a review score with its direction, and answers drafted by your own AI."
h1: "Every review of every brand, and answers ready to post."
label: Reviews
lede: "Outflare reads your Trustpilot, G2, Capterra and Google pages every day, adds them up into one review score that shows whether things are getting better or worse, and drafts an answer to each review for you to post."
answer: "Outflare's Reviews module collects every review of your brands from Trustpilot, G2, Capterra and Google, reading each page once a day through your own Geonode account. It shows each site's own score, one 0–100 review score with its direction over the last 28 days, and a Draft answer button that writes a reply with your own AI model. Outflare never posts the answer: you copy it and post it on the site."
points:
  - "Trustpilot, G2, Capterra and Google reviews, read daily"
  - "One review score from 0 to 100, with its direction"
  - "Answers drafted in your voice, never posted for you"
  - "Runs on your own Geonode account and AI key"
docs:
  - label: Reviews
    href: /docs/guides/reviews/
  - label: SEO and page-reading connectors
    href: /docs/integrations/seo/
  - label: AI models
    href: /docs/agents/ai-models/
  - label: Follow your competitors
    href: /docs/guides/competitors/
faqs:
  - q: "Which review sites does Outflare read?"
    a: "Trustpilot, G2, Capterra and Google (by pasting the place's Google Maps link). The docs say the Apple App Store and Google Play come next, on the same page."
  - q: "Does Outflare post replies to reviews for me?"
    a: "No. Draft answer writes a reply with your own AI model, and Copy and open the review copies it and opens the review on the site, where you post it yourself. Answers you post are picked up on the next daily read."
  - q: "What do I need to connect?"
    a: "A Geonode account of your own, which reads the review pages, and an AI model under Settings → AI model for drafting answers. Until Geonode is connected nothing is read; without an AI model you write answers yourself."
  - q: "How is the review score worked out?"
    a: "It adds every review of a brand together on a 0–100 scale, where 1 star is 0 and 5 stars is 100. Recent reviews count more (a review counts half as much after 180 days), and the score starts from 10 imaginary 3.5-star reviews so a handful of 5-star reviews can't beat hundreds at 4.6."
  - q: "Can an AI agent read and answer reviews?"
    a: "Yes. The API and MCP server can list reviews, read the summary, draft answers and mark reviews answered, with the social.read and social.manage scopes. Drafts still go to a person to post."
related:
  - /product/social/
  - /product/brands/
  - /product/competitors/
  - /product/support/
  - /product/mcp/
updated: 2026-11-09
order: 75
---

## How it works

1. **Add your review pages.** Pages already in a brand's links are listed. With Geonode connected, Outflare searches the web for the brand's Trustpilot, G2 and Capterra pages and asks you to **Confirm** or mark them **Not ours**. You can also paste any address by hand, and a Google place by its Google Maps link.
2. **Connect Geonode.** Pages are read through your own [Geonode](/docs/integrations/seo/) account, about a token a day per page once the history is in.
3. **Read every day.** A page is read as soon as you add it, then once a day. The first read brings in its earlier reviews too, so the history shows from day one.
4. **Answer.** Open a review, press **Draft answer**, edit it, then copy it to the site and **Mark as answered**.

A page that shows no rating and no reviews, such as a login wall or a wrong address, shows an error on its row and is tried again the next day. It never reads as zero.

| Site | What you add |
| --- | --- |
| Trustpilot | `trustpilot.com/review/<your domain>` |
| G2 | `g2.com/products/<product>/reviews` |
| Capterra | `capterra.com/p/<id>/<product>/` |
| Google | The place's Google Maps link |

## One review score, and where it's heading

Each site's own score is shown as the site shows it. On top, Outflare's **review score** (0 to 100) combines every review of a brand so you can follow one number over time. Stars count most, recent reviews count more, and more reviews count more.

**Direction** compares the last 28 days with the 28 before:

| Direction | What it means |
| --- | --- |
| Growing | New reviews are coming at least 15% faster, and the score held |
| Improving | The score rose by 2 points or more |
| Steady | About the same as before |
| Stagnating | New reviews slowed by 30% or more, or fewer than 8 came in 8 weeks |
| Slipping | The score fell by 2 points or more |
| Too few to tell | Fewer than 5 reviews so far |

Beside it you see the average stars, how many recent reviews were answered and how quickly, and how many were unhappy. **By site** breaks it down per site.

## Answers in your voice

**Draft answer** writes a public reply in a few seconds from:

- **How you answer reviews**: your tone, who signs, where to send people for help, what never to say, and known issues with their fixes. It starts from the brand's voice and rules.
- the brand's name, what it does and who it's for;
- your past answers on that site, as examples;
- the reviewer's earlier reviews of the brand;
- the review itself, and the site's length limit.

Type what to change ("shorter", "mention the fix") and **Rewrite**. When a review looks fake, is spam or is about another business, the AI suggests not answering and says why. Drafts never offer anything for changing a review, never ask for it to be changed, never argue and never include private details.

Unhappy reviews from the last 90 days with no answer go on the [fixes list](/docs/guides/site-audits/) until they're answered, next to your SEO and site fixes.

## For agents and integrations

Everything is in the [API](/docs/api/) and the [MCP server](/docs/agents/mcp/): `list_reviews`, `get_reviews_summary`, `draft_review_answer`, `mark_review_answered`, the review page tools and the brand's review guide. Webhooks fire on `review.posted`, `review.replied`, `review.reply_drafted` and `review_momentum.changed`, so a new 1-star review can reach Slack or your CRM. In [Query](/docs/guides/query-and-search/) the data is in the `reviews` and `review_page_days` tables.

You can also follow your [competitors'](/product/competitors/) review pages: only their rating and count are kept, never their reviews, and they stay apart from your own numbers.

## What Outflare doesn't do

- It doesn't post answers or contact reviewers. A person posts every answer on the review site.
- It doesn't ask for reviews or offer anything in exchange for one.
- It uses no shared Geonode or AI key. Reads bill your Geonode account and drafts bill your own AI provider.
