---
'@scayle/storefront-application-nuxt': minor
---

**\[Architecture\]** Improve locale date formatter to use short numeric format and re-use it in multiple places for a consistent formatting.
`formatLocaleDate` now accepts `Date` instead of `string` with parsing handled outside the function.
