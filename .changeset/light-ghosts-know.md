---
'@scayle/storefront-boilerplate-nuxt': minor
---

**\[Architecture\]** Integrated the `@scayle/nuxt-image-provider` Nuxt module to optimize image delivery and leverage the full capabilities of the SCAYLE CDN.
This module introduces a dedicated provider for ´@nuxt/image`, enabling support for SCAYLE-specific image modifiers that provide greater control over image transformations and optimizations. 
The module also includes the `ScayleImg`and`ScaylePicture` components, which offer a simplified way to integrate images optimized for SCAYLE CDN within your application.
This enhancement improves image performance, reduces bandwidth consumption, and simplifies image management.
