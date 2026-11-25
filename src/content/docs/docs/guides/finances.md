---
title: Finances
description: The company's money in one place. Money in and out across every brand, your cash position across banks, cards and payment companies, merchants, and suggestions a person approves.
sidebar:
  order: 1.47
---

<span class="pill shipped">Shipped</span> Money in and out, accounts and the cash position, merchants and the To approve list, in the web app, the REST API, the MCP server and SQL.

**Finances** shows the whole company's money: what came in, what went out, which bank account it moved through and who it was paid to. It has its own section in the menu.

Outflare only reads. It never pays, transfers or exchanges money.

## Who can see it

Only owners see Finances to begin with. An owner can give someone two permissions, **See Finances** and **Manage Finances**, by putting them on a role of the company's own, such as "Finance", under Roles. No starting role but Owner has them, and nobody but a person who holds them can hand them out.

## Money in and out

The first page needs nothing connected. It adds up what Outflare already records for each brand:

| | Where it comes from |
| --- | --- |
| **Money in** | Each brand's [payments](/docs/guides/transactions/), less refunds and chargebacks. |
| **Money out** | Ad spend from connected ad accounts, outreach, data, software, partner payouts, costs added by hand, and AI calls on your own keys. |

You see money in, money out, profit and margin for this month, last month or the last 12 months, each brand's share, and where the money goes by category. Everything is converted to the company's currency, which an owner picks on the page. Costs that belong to no brand are shown as "No brand".

## Accounts

**Accounts** lists everywhere the company holds money, with each balance. An account has a type: a bank account, a card, a payment account (a payment company that holds your customers' money until it pays it out) or crypto (coins at a crypto payment gateway, or a wallet you add by hand). An account belongs to the whole company or to one brand, and a card can have a holder from your team, who answers for its lines.

### Your cash position

The top of the page answers "how much cash do we have?" in the company's currency:

- **Cash you can use now**: the balance of every open account.
- **Held or on its way**: money that is yours but still with a payment company, or in transit to your bank.
- **Cash in total**: the two together.

It is added up each time you open the page, from the latest balances, and says how many accounts it had to leave out because they have no balance yet or no exchange rate.

There are two ways to bring in an account's lines.

### Connect the bank

Open **Connectors**, set the category to **Bank accounts** and connect **Airwallex**, **Aspire** or **Revolut Business**. The bank's accounts then appear by themselves. Outflare reads each connected bank every few hours, and whenever someone chooses **Sync now**: the accounts, their balances and every settled line since the last read. The first read goes back a year.

- **Your own key, read only.** Each bank connects with a key you make in your own bank account, limited to reading. Outflare has no key of its own for any bank, and the connection stays off until you add yours.

  | Bank | What the key may do |
  | --- | --- |
  | Airwallex | A restricted key with Balances: Read |
  | Aspire | Accounts: Read and Transactions: Read |
  | Revolut Business | Accounts: Read and Transactions: Read (with its signing key, if Revolut's console asked you to make one) |

- **Each line once.** A line is kept once however often the bank is read. A card payment still pending at the bank comes in when it settles.
- **A bank that only answers known servers.** Aspire answers only the addresses it has been told about, and a Revolut key can carry an allowlist. Give the bank the public addresses your Outflare server calls from.
- **When a read fails.** The account says why, for example that the bank refused the key, and the next read tries again.

### Import a statement

Export the statement from your bank as a CSV file and choose **Import CSV**. You see what was found and which column is which before anything is saved. A line the account already has is skipped, so importing the same statement twice never doubles anything.

Use one way per account: connect the bank, or import its statements.

### Crypto

Coins count as cash too. Open **Connectors**, set the category to **Bank accounts** and connect **Sheepy**. Each coin balance your Sheepy account holds becomes an account by itself:

- **Balance** is what the coins are worth in euros, at Sheepy's own rate when last read, so it adds into your cash position. The coins themselves show beside it, such as "0.5 BTC".
- **A balance in euros** at Sheepy is an account too. Its lines are your withdrawals to the bank once they are done. Give them a transfer category.
- **Coin balances have no lines.** Payouts in coins are not read yet.
- A balance with nothing in it gets no account.

It runs on your own Sheepy key: in Sheepy's production profile, create an API key with no permission but `withdrawal:get`. Balances need none, and without `withdrawal:get` the balances still read, without lines.

### Payment companies

With [Stripe connected](/docs/integrations/connectors/) for a brand, each currency of your Stripe balance becomes an account by itself:

- **Balance** is what Stripe can pay out now.
- **Held or on its way** is what Stripe has not released yet, plus payouts that left Stripe and have not reached your bank.
- **Lines** are the payouts that arrived at your bank. Customers' payments are not repeated here: they already count as money in for the brand. Give payout lines a transfer category and nothing is counted twice.

It runs on your own Stripe key, which needs Read access to **Balance** and **Payouts** as well as what payments need. Without them the rest of the Stripe connection keeps working and no Stripe account appears.

### Lines

Each line shows its merchant, category, brand, the department and person responsible, whether it is a subscription, its notes, and its status: **Checked** (a person confirmed it), **Suggestion to approve** or **To sort**. Open a line to change any of these or add a note. Select several lines to approve them or set their category, brand or responsible person in one go.

## Merchants

A merchant is who a line was paid to or came from. Each one keeps its details in one place (legal name, country, address, tax number, website, contact) and what its lines get by default: a category, a brand, a department, a responsible person and whether it is a subscription.

Each merchant has **match words**: what the bank writes in a line's description. A new line whose description holds one gets a suggestion for that merchant. The merchant's page shows what was paid each month over the last twelve, every line matched to it, and its notes.

Categories are the company's own list. It starts with a standard set you can change, and each category counts as money in, a cost or a transfer between your own accounts.

## To approve

Outflare suggests and a person confirms. A suggested merchant waits under **To approve** until someone says yes (the line gets the merchant and its defaults and counts as checked) or no (the line stays to sort, and that merchant isn't suggested for it again).

For lines no match words find, your own AI model can read the description and suggest the merchant, one you have or a new one, with a category and a short reason.

- It runs only on [your own AI connection](/docs/agents/ai-models/), on the "Bank line matching" task, inside your [spend limits](/docs/guides/ai-usage/). With no AI model connected it stays off, and the page says so.
- A suggestion from the AI always waits for a person.
- The model is sent the line's date, description, amount and currency, your merchants' names and your category list.

Everything asks first. Under **What may approve itself** an owner can let a kind of suggestion through without asking; that is off for every kind to begin with.

## API and agents

Agents read the same data through the API, the MCP server and SQL. Reading needs See Finances and changing needs Manage Finances. A connected app never gets either from the consent screen: an owner has to put them on a token they make.

| | MCP tools |
| --- | --- |
| Money in and out | `get_company_money` |
| Accounts, cash position and lines | `list_bank_accounts`, `get_bank_account`, `list_bank_lines`, `get_bank_line`, `import_bank_lines`, `update_bank_line` |
| Connected banks and payment companies | `sync_bank_accounts` |
| Merchants and categories | `list_money_merchants`, `get_money_merchant`, `create_money_merchant`, `update_money_merchant`, `list_money_categories` |
| Suggestions and notes | `list_money_suggestions`, `accept_money_suggestion`, `reject_money_suggestion`, `list_money_notes`, `create_money_note` |
