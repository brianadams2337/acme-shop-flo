---
'@scayle/storefront-application-nuxt': patch
---

**\[E2E\]** Enhanced maintainability and clarity of User Authentication Tests: Refactored constant objects related to logged-in user and registration end-to-end tests. Comprehensive JSDoc documentation has been added, explaining the required environment variable setup for dedicated test users. Inline comments now explicitly outline the prerequisites, including the creation of specific test users via environment variables.

- `TEST_USER_EMAIL1=`: Dedicated test user for Chromium and default test user accross end-to-end tests.
- `TEST_USER_EMAIL2`: Dedicated test user for desktop Firefox.
- `TEST_USER_EMAIL3`: Dedicated test user for desktop Webkit (Safari).
- `TEST_USER_EMAIL4`: Dedicated test user for mobile Chrome.
- `TEST_USER_EMAIL5`: Dedicated test user for mobile Webkit (Safari).
- `TEST_USER_NO_ORDERS`: Test user with no orders placed. Used to verify Orders page empty state.
- `TEST_USER_PASSWORD=`: Password (the same for all test users listed above).
- `TEST_USER_WRONG_PASSWORD`: Password used for test that verifies user authentication with wrong credentials.
- `TEST_USER_GUEST`: Test user used to verify Registration process for guest user.
