---
'@scayle/storefront-boilerplate-nuxt': patch
---

E2E: Enhanced our Playwright end-to-end testing suite by integrating two new TypeScript linting rules within the eslint.config.mjs configuration:

- `no-floating-promises`: This rule enforces the use of await for any call that returns a Promise, preventing unintentional side effects and ensuring that asynchronous operations are handled correctly within our tests.
- `await-thenable`: This rule complements `no-floating-promises` by specifically targeting instances where await is used unnecessarily with values that are not Promises. This helps maintain consistency and clarity within our asynchronous code.
