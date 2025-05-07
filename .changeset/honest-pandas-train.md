---
'@scayle/storefront-application-nuxt': patch
---

**\[E2E\]** Comprehensive documentation added to end-to-end tests. JSDoc comments have been implemented in end-to-end test files within `/playwright/tests/e2e-*spec.ts` to enhance understanding and maintainability. This documentation includes:

- Clear descriptions of each test's purpose and scope.
- Explicit prerequisites for specific tests, such as environment variable configurations and required test user states (e.g., for Orders page pagination).

Key areas documented include:

- `e2e-CountryDetector.spec.ts`: Explanation of timezone forcing for Country Detector modal testing.
- `e2e-Footer.spec.ts`: Description of the test suite's scope.
- `e2e-Orders.spec.ts`: Details on environment variable setup for test user credentials.
- `e2e-OrderSuccessPage.spec.ts`: Prerequisites regarding product availability for successful order completion.
- `e2e-Wishlist.spec.ts`: Scope and environment variable requirements for test user credentials.
