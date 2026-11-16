---
title: Outflare for Chrome
description: A side panel for Chrome that shows what Outflare knows about the person who emailed you or the company whose website you are on, and adds someone new in two clicks.
sidebar:
  order: 9
---

<span class="pill shipped">Shipped</span> A side panel for Gmail and any website, a mark on the toolbar icon for companies you know and sites on your do-not-contact list, adding people and companies, notes and to-dos.

**Outflare for Chrome** is a side panel that sits beside the page you are on. It shows what your brand already knows about who is in front of you, so you don't switch tabs to check.

## What it shows

- **In Gmail**, the person the open email is from: their company, owner, stage, where they came from, whether they get marketing email, their deals, support conversations and to-dos.
- **On any website**, the company the site belongs to.
- **The toolbar icon** shows a green mark on a company you know, and a red `!` on a site on your do-not-contact list.
- **A search box** looks up any email address or website you type.

**Open in Outflare** on a card opens the person or company in the app.

## What you can do

- **Add someone new** in two clicks: the person alone, or the person with their company. On a website, add the company.
- **Add a note or a to-do** to anyone the panel shows.

Changes run right away, as you: they appear in the record's history under your name. A site or address on your do-not-contact list can't be added from the panel.

## Install it

The extension isn't in the Chrome Web Store yet. Until it is, load it from the `extension` folder of the [Outflare repository](https://github.com/outflareai/outflare):

1. Download the repository and find the `extension` folder.
2. Open `chrome://extensions` in Chrome and switch on **Developer mode** (top right).
3. Press **Load unpacked** and pick the `extension` folder.
4. Press the Outflare icon in the toolbar. Pin it from the puzzle menu if you don't see it. The side panel opens.
5. Press **Connect Outflare**, sign in and press **Allow**.
6. Pick the brand to work in.

Running Outflare on your own server? Press **Running Outflare on your own server?** before you connect and enter its address.

To disconnect, use the link at the bottom of the panel, or remove **Outflare for Chrome** in the app under **Connect your AI**.

## What it may do

Signing in uses Outflare's own approval page. The extension can list your brands, and read and add people and companies with their notes and to-dos, and never more than your own role allows. It can't send email, change settings or read anything else.

## Your privacy

- **The sites you visit stay in your browser.** The extension keeps a scrambled list of the websites your brand knows and checks the open site against it inside Chrome. Outflare is asked about a website only when it already holds it, or when you type it into the search box. A brand with more than 200,000 companies gets a shortened list, and the panel then asks Outflare about the open site.
- **In Gmail** the panel reads who the open email is from, their name and address, and never the email's text.
- It reads the address of the tab in front, for the icon and the panel, and nothing else from any page.

## For developers

The list of known websites comes from `GET /v1/brands/{brand}/records/known-domains` (scope `customers.read`): salted digests of the brand's company websites and do-not-contact websites. See the [API reference](/docs/api/).
