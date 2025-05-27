---
'@scayle/storefront-application-nuxt': patch
---

**\[E2E\]** Updated end-to-end test to verify user data update. To align with recent UI changes, the `updateUserData()` method in `/playwright/page-objects/accountPage.ts` has been updated. It now sets the user birth date input matched with the new format (adjusted in the `USER_ACCOUNT` constant object in `/playwright/support/constants.ts`), ensuring accurate and stable verification of user data updates.
