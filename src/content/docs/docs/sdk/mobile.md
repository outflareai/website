---
title: Send events from your app
description: Libraries for iOS, Android, React Native and Flutter that send the screens people see and what they do in your app to Outflare.
---

<span class="pill shipped">Shipped</span> iOS, Android, React Native and Flutter.

These libraries send the screens people see and what they do in your mobile app to a brand's [product events](/docs/guides/customer-records/). Each has the same few calls and does the same work for you:

- **Kept on the phone.** Events wait in a file, so they survive the app being closed, and go out 20 at a time: once 20 wait, or every 30 seconds. With no connection, the newest 1,000 wait until there is one.
- **Stored once.** Every event gets a message id, so one that is sent twice is stored once.
- **Says where it came from.** Each event carries the app's name, version and build, the phone's model and system, and the language. Never the phone's own name or an advertising id.

<span class="pill building">Not on the registries yet</span> The packages are not published to npm, Maven Central, pub.dev or as a Swift package yet. Take them from the [repository](https://github.com/outflareai/outflare/tree/main/sdk).

## The key

An app can be taken apart, so it must never hold an API token. It sends with a **site key that has no sites**: under [Website tracking](/docs/guides/website-tracking/), add a key for each app and leave "Sites it records" empty. The key is public. It can only add screens and events, and reads nothing. A key that lists websites refuses an app's events.

## iOS

```swift
import Outflare

let outflare = Outflare(Outflare.Config(key: "ofk_test_not_a_real_key"))

outflare.screen("Checkout")
outflare.track("Order Started", properties: ["items": 2])
```

It uses only Foundation, reads the app's name and version from Info.plist, sends what waits when the app goes to the background, and also runs on iPadOS, macOS, tvOS and watchOS.

## Android

```kotlin
import ai.outflare.App
import ai.outflare.Config
import ai.outflare.Outflare

// In Application.onCreate: make one and share it.
val outflare = Outflare(
    Config(
        key = "ofk_test_not_a_real_key",
        directory = filesDir,
        app = App(name = "Northpeak", version = BuildConfig.VERSION_NAME),
    ),
)

outflare.screen("Checkout")
outflare.track("Order Started", mapOf("items" to 2))
```

It is plain Kotlin with no dependencies and sends on a background thread. The app needs the `android.permission.INTERNET` permission. Call `outflare.flush()` in `onStop`.

## React Native

```ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createOutflare } from "@outflare/react-native";

export const outflare = createOutflare({
  key: "ofk_test_not_a_real_key",
  storage: AsyncStorage,
  app: { name: "Northpeak", version: "2.4.0" },
});

outflare.screen("Checkout");
outflare.track("Order Started", { items: 2 });
```

It has no native code, so it needs no linking and works with Expo, and it sends what waits when the app goes to the background. With React Navigation, call `outflare.screen(name)` from the navigation container's `onStateChange`.

## Flutter

```dart
import 'package:outflare/outflare.dart';
import 'package:path_provider/path_provider.dart';

final outflare = Outflare(
  key: 'ofk_test_not_a_real_key',
  directory: (await getApplicationSupportDirectory()).path,
  appName: 'Northpeak',
  appVersion: '2.4.0',
);

outflare.screen('Checkout');
outflare.track('Order Started', {'items': 2});
```

It is plain Dart with no plugins. Call `outflare.flush()` when the app goes to the background. Dart can't read the phone's model or Android's version by itself: pass `deviceModel` and `osVersion` to see them in reports.

## The calls

| Call | What it does |
| --- | --- |
| `screen(name, properties)` | A screen the person saw. Stored as a `screen.viewed` event with the screen's name. |
| `track(event, properties)` | Something the person did, with a plain name such as Order Started. |
| `anonymousId` | The visitor's id on this phone. |
| `reset()` | Forgets the visitor. Call it when someone signs out. |
| `flush()` | Sends what waits now. |

Set `host` to your own server when you self-host.

## Saying who the person is

An app can't say who someone is, because anyone can read its key. After sign-in, send the library's `anonymousId` to your own server and have it call `identify` with your user's id and that `anonymousId`, using one of the [server libraries](/docs/sdk/events/):

```ts
tracker.identify({ userId: "u_123", anonymousId: idFromTheApp, traits: { plan: "pro" } });
```

The screens and events the person sent before signing in then join their record.

## Good to know

- **Visits.** An app's events join visits as a website's do, so sessions, devices and countries work the same way. The visit's browser shows as `app`.
- **Time.** An event is dated when it reaches Outflare, never by the phone's clock. Events sent after a long time offline are dated late.
- **Trust.** Anyone can send with a public key, so an app's events never count as product usage or revenue. Send orders and payments from your server.
- **Limits.** A site key's limits apply: 20 events a request and 250,000 events a day for each key.
