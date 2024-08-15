---
'@scayle/storefront-boilerplate-nuxt': patch
---

Replaced `radash.sum` with native calculations and array operations:

```ts
array.reduce((acc, item) => acc + item, 0)
```
