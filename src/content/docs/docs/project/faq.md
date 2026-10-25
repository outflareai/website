---
title: FAQ
description: Common questions about Outflare.
---

**What is Outflare?**
Open-source go-to-market infrastructure that people and AI agents share. The first module is a self-hostable cold-email sequencer with bulk mailbox connection and a policy check on every send.

**Can I send emails with it yet?**
Not yet. Workspaces, access control and bulk mailbox connection with health checks work today. Lead import, sequences and sending, and the reply inbox are the next steps on the [roadmap](/docs/project/roadmap/).

**Who is it for?**
Outbound teams, agencies and GTM engineers who run many reseller mailboxes, want their data in their own database, and want agents and scripts to work through a real API.

**Does it replace my current sequencer?**
That is the goal for v1: connect mailboxes, import leads, run sequences, send safely and handle replies, all self-hosted.

**Which mailbox providers work?**
Google Workspace and Microsoft 365 are detected automatically. Any provider with SMTP and IMAP works if you give its servers in the CSV. Google Workspace and Microsoft 365 can also connect without passwords, through [OAuth or an admin connection](/docs/integrations/google-and-microsoft/). Mailboxes bought from Cheap Inboxes [import straight from your account](/docs/integrations/cheap-inboxes/), no CSV needed.

**How many mailboxes can it handle?**
One import takes up to 5000 mailboxes, and you can run as many imports as you like. The engine is a Go binary built for thousands of concurrent SMTP and IMAP connections, with Postgres as its only dependency.

**Does it warm up mailboxes?**
Yes. Turn on [warm-up](/docs/guides/warmup/) and your mailboxes email each other at a slowly rising volume, rescue that mail from spam and reply to some of it. You also see how much of each mailbox's and each domain's mail reaches the inbox. Warm-up runs between the mailboxes in your workspace, so it needs at least two.

**Is there a hosted version?**
Not yet. A managed Cloud is on the roadmap after v1. Today you self-host.

**Is it legal to send cold email with it?**
Outflare is a tool; the law depends on where you and your recipients are. Many jurisdictions, such as the US (CAN-SPAM), the EU and UK (GDPR and PECR) and Australia (Spam Act 2003), have rules about consent, identification and unsubscribing. The suppression list, unsubscribe handling and policy check are there to help you comply, not to decide for you.

**How is it licensed?**
The core is AGPL-3.0 and the SDKs are Apache-2.0. See [Open source and licensing](/docs/project/license/).
