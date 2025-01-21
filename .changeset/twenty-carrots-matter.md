---
'@scayle/storefront-boilerplate-nuxt': minor
---

[Architecture] Introduce modernized local `@scayle/nuxt-gtm` module to replace unmaintained `@zadigetvoltaire/nuxt-gtm` module and use recent `@gtm-support/vue-gtm` as direct dependency.
This also allows us to drop the automated dependency patch for a included legacy version of `@gtm-support/vue-gtm`.
