---
'@scayle/storefront-application-nuxt': minor
---

**\[Architecture\]** To improve performance and dependency management, we have migrated from Yarn v1 to PNPM.
This results in faster installation times and more efficient use of disk space due to PNPM's unique approach to handling `node_modules`.
Instead of running command via `yarn some:command`, they will now be executed via `pnpm some:command`, e.g. `pnpm install` or `pnpm dev`.

For more details on how to use PNPM and its extended features, check the [official PNPM documentation](https://pnpm.io/motivation).
