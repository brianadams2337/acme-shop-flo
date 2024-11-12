---
'@scayle/storefront-boilerplate-nuxt': patch
---

E2E: Streamlined our Add to Basket end-to-end tests by combining the guest user and logged-in user flows. This change results in:

- Improved Stability: Reduced the potential for inter-test interference during parallel execution.
- Faster Execution: Eliminated redundant steps by merging separate test cases.
- Expanded Coverage: Added a new assertion to verify that products remain in the basket after user authentication, covering a crucial aspect of the user journey.
