---
title: Bulk edits
description: Change many people or companies at once, from a list, a saved query or ids, with a preview first, every change in each record's history, and undo for 7 days.
sidebar:
  order: 1.55
---

<span class="pill shipped">Shipped</span> In the web app (**Bulk edit everyone in it** on a list), the REST API and the MCP server.

A bulk edit changes many people or companies of one brand at once: give them an owner, add or remove tags, set or clear a field, put them in or take them out of a static list, or archive them. Only the workspace's **owners**, signed in, run one. Anyone who may change records can preview it.

Every change a bulk edit makes is written to each record's own history, with who ran it and which bulk edit it was. An undo adds history too: the record shows both the change and the undo.

## Which records

Pick one of:

- **A list** (`smart_list_id`): its members now. A list of companies changes companies.
- **A saved query** (`saved_query_id`): its `record_id` (or `id`) column picks the records, up to 10,000. Write it in [Query](/docs/guides/query-and-search/#query), such as `SELECT id FROM people WHERE country = 'DE'`.
- **Records by id** (`record_ids`): up to 10,000.

One bulk edit changes people or companies, not both, and up to 50,000 records. Merged and deleted records are left out. The records are fixed when it is made, so it changes exactly what the preview counted.

## What it changes

```json
{
  "smart_list_id": "…",
  "changes": {
    "set": { "owner": "<user id>", "segment": "enterprise", "region": null },
    "add_tags": ["churn-risk"],
    "remove_tags": ["trial"],
    "add_to_list": "<static list id>",
    "remove_from_list": "<static list id>",
    "archive": true
  }
}
```

- `set` writes fields by key, checked against the catalog like a hand edit; `null` clears a field. `owner` is a field, so this is how you reassign records.
- `add_to_list` and `remove_from_list` are static lists of the brand, for people only.
- `archive` archives each record. Deleting isn't a bulk edit.

A bulk edit writes as a person, so it wins over imports and syncs, and each record it changes is a `record.updated` (or `record.archived`) like a hand edit, so [rules](/docs/guides/rules/), journeys and webhooks act on it.

## Preview, run, undo

1. `POST /v1/brands/{brand}/bulk-edits/preview` checks the changes and shows how many records, and the first 20 with each change from and to.
2. `POST /v1/brands/{brand}/bulk-edits` (owners) starts it and answers `202`. `GET .../bulk-edits/{id}` shows its `status` (queued, running, done or failed) and how many records it `changed`, found `unchanged` or `skipped`.
3. `POST .../bulk-edits/{id}/undo` (owners, within 7 days) puts the records back. A field someone changed since keeps its new value, and is counted as `kept`.

Each record's `GET .../records/{record}/history` lists the change with its `bulk_edit_id`. `GET /v1/brands/{brand}/bulk-edits` lists every bulk edit, newest first. Agents have `list_bulk_edits`, `get_bulk_edit` and `preview_bulk_edit`: an agent can prepare and preview one, and an owner runs it.
