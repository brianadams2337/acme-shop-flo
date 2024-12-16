---
'@scayle/storefront-boilerplate-nuxt': minor
---

Shop switching now defaults to redirecting users to the homepage of the newly selected shop. For cases where maintaining the current path is desired, the <ShopSwitcher /> component now accepts a `switchToHomePage` prop. Setting this prop to `false` will preserve the current path during the shop switch

```html
<ShopSwitcher :switch-to-home-page="false" />
```
