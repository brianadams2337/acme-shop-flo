---
'@scayle/storefront-boilerplate-nuxt': minor
---

Create OpenTelemetry spans for Nitro requests

In addition to initializing the OpenTelemetry SDK, the OpenTelemetry module now instruments incoming requests to the Nitro server. The spans include the matched route name, HTTP method and other request metadata.
