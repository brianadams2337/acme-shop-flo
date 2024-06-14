---
'@scayle/storefront-boilerplate-nuxt': minor
---

Fix errors in async composable usage

This change enables all rules in `@scayle/eslint-plugin-vue-composable` and ensures that all composables in the application conform to best practices regarding asyncronous usage. These changes may fix various bugs relating to reactivity issues. As part of this change, some composables are now entirely synchronous.
