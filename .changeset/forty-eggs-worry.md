---
'@scayle/storefront-application-nuxt': minor
---

**\[Translations\]** Removed several dynamic translations from the codebase and set the eslint rules `@intlify/vue-i18n/no-unused-keys` to error.

This will make maintaining translations easier and more reliable. It also improves discoverability by tooling.
Some dynamic translations are still used in the codebase and are ignored by the eslint rule.
The reason for this is that the static usage of the keys would make the codebase harder to read and maintain.
