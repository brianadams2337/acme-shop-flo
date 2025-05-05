---
'@scayle/storefront-application-nuxt': patch
---

**\[E2E\]** Enhanced maintainability and clarity of end-to-end tests:

- Refactored the constants objects in `playwright/support/constants.ts` for better organization and reduced redundancy.
- Implemented JSDoc comments in test specification files (`/playwright/tests/*.spec.ts`) to document test objectives and environment setup requirements (e.g., environment variables, test users).
- Standardized test code by promoting the reuse of constants across relevant test cases.
