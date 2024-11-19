---
'@scayle/storefront-boilerplate-nuxt': patch
---

Added all Tailwind CSS duration classes to the safe list, ensuring complete availability. This addresses an issue where durations defined with the `duration-{duration}` syntax were unintentionally purged.
Also consistency is improved by updating transition components to exclusively accept duration values defined within the Tailwind configuration.
