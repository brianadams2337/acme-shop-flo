---
'@scayle/storefront-boilerplate-nuxt': patch
---

Country Detection: Enhanced the `closeModal()` function within our Country Detection tests to include a check for the modal's visibility on page load. This improvement ensures greater test stability, particularly when the test suite is executed from a different time zone than the targeted shop, as it accounts for potential modal visibility differences based on location and time.
