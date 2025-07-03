---
'@scayle/storefront-application-nuxt': patch
---

**\[Login & Registration\]** Fixed authentication methods (`login`, `guestLogin`, `logout`, `register`, `forgotPassword`, `resetPasswordByHash`) in `useAuthentication` composable to clear error messages before execution, preventing stale error messages from persisting after successful operations.
