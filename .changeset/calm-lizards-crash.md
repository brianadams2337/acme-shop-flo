---
'@scayle/storefront-application-nuxt': minor
---

**\[PLP\]** Updated to `@scayle/storefront-product-listing@2.0.0` and applied the necessary usage changes to `useProductListSort` and `useProductListingSeoData`.

- There is now only one call to `useProductListSort`, from the page component. In this page the sort options are constructed based on the selected category. The returned properties of the composable are passed as props to components which require them.
- `useProductListingSeoData` now receives the `isDefaultSortSelected` boolean as its final parameter.
- The `label` property of a `SelectedSort` is understood as an actual label rather than a translation key. This means that we render this label directly in the UI, instead of calling `$t(label)`.
