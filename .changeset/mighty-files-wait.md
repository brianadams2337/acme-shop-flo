---
'@scayle/storefront-boilerplate-nuxt': minor
---

**\[Performance\]** To avoid hydration mismatches, `<AccordionEntry>` no longer generates id's used for accessibility features on its own. It now requires the id being passed from the the parent component.
