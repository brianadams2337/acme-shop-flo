---
'@scayle/storefront-application-nuxt': minor
---

**\[Basket\]** Added express checkout functionality to the basket page using the `<scayle-express-checkout />` web component. Additionally, `/app/middleware/authGuard.global.ts` and `/app/pages/checkout.vue` have been updated to allow not logged in users to access the checkout page during the express checkout flow. This is achieved by checking for a `transactionId` query parameter in the route.
