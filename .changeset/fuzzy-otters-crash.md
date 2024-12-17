---
'@scayle/storefront-boilerplate-nuxt': minor
---

We've updated to `nuxt/i18n@9.x`. This introduces a new directory structure for localization to align with the upcoming changes of Nuxt 4.

- `lang/` directory has been renamed to `i18n/`
- `i18n.config.ts` has been moved to `i18n/i18n.config.ts`
- `lang/{locale}.json` translation files have been moved to `i18n/locales/{locale}.json`
- Removed preconfigured `i18n.langDir` option in `nuxt.config.ts` to use new default directory structure
- Additional details can be found in the[ official `nuxt/i18n` v8 to v9 migration guide](https://i18n.nuxtjs.org/docs/guide/migrating#upgrading-from-nuxtjsi18n-v8x-to-v9x)
