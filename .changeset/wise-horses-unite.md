---
'@scayle/storefront-application-nuxt': patch
---

**\[Login & Registration\]** Updated authentication methods (`login`, `guestLogin`, `logout`, `register`, `forgotPassword`, `resetPasswordByHash`) in the `useAuthentication` composable to throw errors instead of caching them and storing them within its state. This change improves error handling clarity for authentication actions. The usage of these methods has also been adjusted to properly handle thrown errors.
