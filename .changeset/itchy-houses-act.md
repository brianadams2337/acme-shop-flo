---
'@scayle/storefront-boilerplate-nuxt': patch
---

E2E: Improved the robustness of the Country Detector shop switcher end-to-end test by incorporating the `first()` method. This ensures we consistently select the first matching shop element in cases where multiple options are present, preventing potential test ambiguities and enhancing overall reliability.
