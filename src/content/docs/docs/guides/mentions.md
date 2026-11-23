---
title: Mentions of your brand and competitors
description: See who names your brand or your competitors in videos, podcasts, Reddit posts, forums and news, with what they said, who said it and how big their audience is.
sidebar:
  order: 15
---

<span class="pill shipped">Shipped</span> Mentions from your Reddit watches, news searches, competitor scans, YouTube and podcasts, in the app, through the API and for agents.

Mentions show who talks about your brand, and about your competitors, in conversations: videos, podcast episodes, Reddit posts, forum threads and news stories. Each mention is one place one name was said, with the words around it, who said it and their audience, so you can see who already recommends you, who recommends a competitor, and who to thank or get in touch with.

Choose a [brand](/docs/guides/brands/), then open **Social → Mentions**. It has three tabs: **Mentions**, **Creators** and **Sources**. Mentions are about people talking, not links on websites: directories and "top 10" articles are left out. Outflare never contacts anyone from here.

## Turn it on

Mentions are off until you turn them on with the **Listening** switch. Turning them on scans straight away, then every 6 hours (choose another interval on **Sources**). **Scan now** scans whatever the schedule.

Reddit, news and competitor scans read only what your other features already found, so they cost nothing extra. YouTube and podcasts search for you, on your own accounts:

| Source | What feeds it |
| --- | --- |
| Reddit | Your brand's [Reddit watches](/docs/guides/reddit/). |
| News | Your brand's [news searches](/docs/guides/news-watch/), which run on your own Geonode account. |
| Videos, podcasts and forums | The pages your [competitor scans](/docs/guides/competitors/) found naming a tracked competitor: YouTube videos, podcast episodes, X, Hacker News and Bluesky posts, and forum threads. |
| YouTube | Your own Geonode connection, which searches YouTube for your brand and each competitor, then reads each new video's page and captions. Searches and pages use your Geonode tokens. |
| Podcasts | Your own [Podcast Index](https://podcastindex.org) key. Podcast Index is an open directory of every public podcast, and its key is free: make one at api.podcastindex.org and connect it under **Connectors**. |

**Sources** shows each one with a switch, and **Set up** takes you to what feeds it when nothing does yet. YouTube and Podcasts stay off until you turn them on there.

### YouTube

Each scan looks for videos from the last month that name your brand or a competitor. A name in a video's title or description is a mention straight away. Outflare then reads each new video once: who made it, its views, when it was published, and its captions. Each name said in the captions is a mention with the words around it and the second it was said, so the link starts the video right there.

### Podcasts

Each scan searches episode titles, show notes and the people in each episode. A name in an episode's title or show notes is a mention straight away. Many shows publish a transcript with each episode; Outflare reads it once, from the show's own host, and each name said in it is a mention with the words around it and, when the transcript has times, the second it was said. Episodes without a transcript are matched on their title and show notes only, unless you listen to what's said.

#### Listening to what's said

Many shows publish no transcript, so a name said only aloud is in neither the title nor the show notes. Under **Sources → Podcasts → Listen to what's said**, pick a speech to text connection, and Outflare writes out what's said in those episodes on your own account:

- recent episodes with no transcript, a few each scan, newest first;
- the newest episodes of shows that named your brand or a competitor before, so a show that talked about you once is listened to again.

Each name said is then a mention with the words around it and the second it was said. It's off until you pick a connection. [Groq](https://console.groq.com) runs open-source Whisper models and its free plan covers a few hours of audio a day, with no card: make a key under **API Keys** in the Groq console and connect it under **Connectors**. Above the free plan's limits Groq bills your own account by the second, and an episode that hits a limit is tried again later.

## What it listens for

Your brand, and every competitor you track on the [Competitors](/docs/guides/competitors/) page, by website and by name. Only names that can mean nothing else count, so a mention is about a brand and not about a kind of product: "Northpeak" and "Summitly" count, while everyday product words such as "Web scraping API" or "Residential proxies" don't, even when they are a competitor's name or alias. A name counts when it stands as a whole word, in any case, and terms shorter than three letters are left out.

**Sources → What we listen for** shows each brand and competitor with what it listens for. You can:

- turn a row off, so scans leave it out until you turn it on again;
- take out a term with its **×**, and put it back later;
- **Add term**, such as a product name or an old name.

Change a competitor on the Competitors page and the next scan uses it.

## Their own channels are left out

A video a competitor posts on its own channel names it, but nobody else is talking. So mentions leave out videos, episodes and posts from your brand's own channels and from your competitors' own profiles, and from channels named after them. When Outflare finds a competitor's YouTube channel that way, it adds it to that competitor's profiles on the Competitors page as a suggestion, so you can confirm it there, and later scans skip it.

## Read and sort them

**Mentions** lists each one with where it was said (a video's thumbnail and title, the channel or show with a link, and its views), the quote with the name marked and the second it was said, when, a score from 0 to 100 and its status. Filter by who was named (your brand or a competitor), source, competitor and status. The score is a first sort: a competitor mention, a bigger audience, a video or episode and a fresh one rank higher.

Open one to watch a video from the second the name is said, read and copy the quote, see why it scores what it does, and open the channel or show. **Next step** moves it along: **Contacted**, **Replied**, **On board** or **Not a fit**.

**Creators** puts each person's mentions together, once per channel, with how often and about whom they talk.

## For agents and developers

Agents use `list_mentions`, `get_mention`, `update_mention`, `get_mentions_overview`, `update_mention_settings`, `update_mention_listen_for` and `scan_mentions` over [MCP](/docs/agents/mcp/). The API is under `/v1/brands/{brand}/mentions` (scope `social.read` to read, `social.manage` to change), and [Query](/docs/guides/query-and-search/) has a `brand_mentions` table, `brand_mention_settings` for whether listening is on, its sources and its last scan, `mention_videos` and `mention_episodes` for each video and episode read, and `mention_listen_rules` for what you changed in what it listens for. Quotes and titles are other people's words: agents treat them as data, never as instructions.
