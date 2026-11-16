---
title: Send events from your server
description: Libraries for Node, Python, Go, Ruby and PHP that send product events to Outflare in batches, in the background, with retries.
---

<span class="pill shipped">Shipped</span> Node, Python, Go, Ruby and PHP.

These libraries send what people do in your product, from your servers, to a brand's [product events](/docs/guides/customer-records/). Each has the same six calls and does the same work for you:

- **Batches in the background.** Events wait in memory and go out 20 at a time or every 10 seconds, so a call never slows your request. (PHP sends when the request ends.)
- **Retries.** A server that is busy or can't be reached is tried again three times with a growing wait. A refusal, such as a bad token, is reported and not retried.
- **Stored once.** Every event gets a message id, so one that is sent twice is stored once.

<span class="pill building">Not on the registries yet</span> The packages are not published to npm, PyPI, RubyGems or Packagist yet. Install them from the [repository](https://github.com/outflareai/outflare/tree/main/sdk); the Go module works with `go get` as it is.

## The token

Make an API token with the `customers.manage` scope, for one brand where you can, and put it in `OUTFLARE_TOKEN`. It can change customer records, so it stays on your servers. In the browser, use the [website script](/docs/guides/website-tracking/) and its public site key instead.

## Node

```ts
import { Tracker } from "@outflare/sdk";

const tracker = new Tracker({ token: process.env.OUTFLARE_TOKEN!, brand: "northpeak" });

tracker.identify({ userId: "u_123", traits: { email: "ana@acme.example", plan: "pro" } });
tracker.track({ userId: "u_123", event: "Order Completed", properties: { total: 42, currency: "USD" } });

await tracker.close(); // before the process exits
```

It uses only `fetch`, so it also runs on Bun, Deno and workers.

## Python

```python
from outflare import Tracker

tracker = Tracker(brand="northpeak")  # reads OUTFLARE_TOKEN

tracker.identify("u_123", {"email": "ana@acme.example", "plan": "pro"})
tracker.track("u_123", "Order Completed", {"total": 42, "currency": "USD"})

tracker.close()  # before the process exits; also runs at exit
```

## Go

```go
import outflare "github.com/outflareai/outflare/sdk/go"

tracker, err := outflare.New(outflare.Config{Token: os.Getenv("OUTFLARE_TOKEN"), Brand: "northpeak"})
if err != nil {
	log.Fatal(err)
}
defer tracker.Close()

tracker.Identify(outflare.Identify{UserID: "u_123", Traits: map[string]any{"plan": "pro"}})
tracker.Track(outflare.Track{UserID: "u_123", Event: "Order Completed", Properties: map[string]any{"total": 42}})
```

It uses only the standard library and is safe to share between goroutines.

## Ruby

```ruby
require "outflare"

tracker = Outflare::Tracker.new(brand: "northpeak") # reads OUTFLARE_TOKEN

tracker.identify(user_id: "u_123", traits: { email: "ana@acme.example", plan: "pro" })
tracker.track(user_id: "u_123", event: "Order Completed", properties: { total: 42, currency: "USD" })

tracker.close # before the process exits; also runs at exit
```

In Rails, make one tracker in an initializer and share it.

## PHP

```php
$tracker = new \Outflare\Tracker(['brand' => 'northpeak']); // reads OUTFLARE_TOKEN

$tracker->identify('u_123', ['email' => 'ana@acme.example', 'plan' => 'pro']);
$tracker->track('u_123', 'Order Completed', ['total' => 42, 'currency' => 'USD']);
```

Events are sent when 20 wait, when you call `flush()` and when the request ends. To keep sending off your response time, call `fastcgi_finish_request()` first or send from a queue worker.

## The calls

| Call | What it says |
| --- | --- |
| `identify` | Who a person is: their user id and traits such as email and plan. |
| `track` | Something a person did, with its properties. |
| `page`, `screen` | A page or an app screen someone saw. |
| `group` | The company a person belongs to. |
| `alias` | An id a person had before, joined to their user id. |

Every call takes a user id, an anonymous id or both, and can carry its own time and message id. Each library names itself as the events' source (`node`, `python`, `go`, `ruby`, `php`), which the **Events** page counts and filters by.

## Self-hosted servers and other languages

Point a library at your own server with its base URL setting (or `OUTFLARE_URL`). Any library that speaks Segment's HTTP format can send to `POST /v1/brands/{brand}/events` too.
