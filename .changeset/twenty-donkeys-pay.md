---
'@scayle/storefront-application-nuxt': patch
---

**\[Unit Testing\]** Added a global `vi.mock()` for the `routeChangeTrackingObserver.global.ts` middleware.
This intercepts the middleware import during tests and provides a dummy function (`vi.fn()`) instead.
This is necessary because the original middleware's `setTimeout` could attempt to access the DOM (document) after happy-dom was destroyed, causing errors.
Global mocks are now managed in the renamed `test/vitest-setup/storefront.ts`.

- Renamed `templates/nuxt/test/vitest-setup/storefront-nuxt.ts` to `templates/nuxt/test/vitest-setup/storefront.ts` to define global mocks.
