---
title: FAQ
description: Common questions about Outflare.
---

**What is Outflare?**
An open-source go-to-market platform that people and AI agents share. It brings your website analytics, SEO, customer records, email, social and paid media into one workspace, and gives your agents one API to work through. See the [introduction](/docs/).

**Who is it for?**
Marketing and growth teams, agencies and GTM engineers who want their go-to-market in one place, their data in their own database, and agents and scripts working through a real API.

**Is there a hosted version?**
Yes: Outflare Cloud at [app.outflare.ai](https://app.outflare.ai/), free during early access. Or self-host the same engine with Docker Compose. [Open source and Cloud](/docs/project/open-source-and-cloud/) explains the difference.

**Can I send email with it?**
Yes. Cold email runs as [sequences](/docs/guides/sequences/) across your mailboxes, and product email such as receipts and onboarding goes out through your own Amazon SES, Postmark or Resend account ([lifecycle email](/docs/guides/lifecycle-email/)). Every email passes the [policy check](/docs/concepts/policy-check/) first.

**Does Outflare give me an AI or data provider key?**
No. Every workspace connects its own accounts for AI models, data providers and every other service, on Cloud and self-hosted alike, and pays those providers directly. A feature stays off until you connect what it needs. See [Connectors](/docs/integrations/connectors/).

**Which mailbox providers work?**
Google Workspace and Microsoft 365 are detected automatically. Any provider with SMTP and IMAP works if you give its servers in the CSV. Google Workspace and Microsoft 365 can also connect without passwords, through [OAuth or an admin connection](/docs/integrations/google-and-microsoft/). Mailboxes bought from Cheap Inboxes [import straight from your account](/docs/integrations/cheap-inboxes/), no CSV needed.

**How many mailboxes can it handle?**
One import takes up to 5000 mailboxes, and you can run as many imports as you like. The engine is a Go binary built for thousands of concurrent SMTP and IMAP connections, with Postgres as its only dependency.

**Does it warm up mailboxes?**
Through your sequencer. Outflare doesn't send warm-up mail itself: connect EmailBison, Instantly or Smartlead, and Outflare turns their [warm-up](/docs/guides/warmup/) on for your mailboxes and shows each one's warm-up score.

**Is it legal to send cold email with it?**
Outflare is a tool; the law depends on where you and your recipients are. Many jurisdictions, such as the US (CAN-SPAM), the EU and UK (GDPR and PECR) and Australia (Spam Act 2003), have rules about consent, identification and unsubscribing. The [opt-out list, contact basis](/docs/guides/who-can-be-emailed/), unsubscribe handling and policy check are there to help you comply, not to decide for you.

**How is it licensed?**
The engine and web app are AGPL-3.0; the SDKs and MCP server are Apache-2.0. See [Open source and licensing](/docs/project/license/).
