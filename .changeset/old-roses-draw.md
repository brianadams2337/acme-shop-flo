---
'@scayle/storefront-boilerplate-nuxt': minor
---

- We've introduced `@nuxt/fonts` to streamline web font integration.
  This change simplifies the process of adding and managing fonts in Storefront projects while improving performance:
  - Zero-config setup for popular font providers (_Google Fonts, etc._)
  - Customization options with support for custom providers
  - Seamless Tailwind CSS Integration: Easily incorporate downloaded fonts into your Tailwind configuration for streamlined styling
  - Enhanced Privacy and Performance through Local Font Downloads: Fonts are downloaded and served from your server, addressing privacy concerns related to third-party font hosting (_like Google Fonts and GDPR compliance_) while improving your website's loading speed
  - Performance benefits:
    - Automatic font metric optimization (_using [Fontaine](https://github.com/unjs/fontaine) and [Capsize](https://github.com/seek-oss/capsize)_)
    - Build-time font caching
