---
'@scayle/storefront-boilerplate-nuxt': patch
---

Replaced `radash.unique` with native array operations:

```ts
arrayValue.filter(
  (item, index, self) =>
    index === self.findIndex((arrayItem) => arrayItem.value === item.value),
)
```
