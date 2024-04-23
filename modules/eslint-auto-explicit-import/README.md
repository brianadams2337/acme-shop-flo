# @scayle/storefront-eslint-auto-explicit-import

An extension of the official `@nuxt/eslint` module to insert more explicit import statement
automatically using `eslint --fix` into a Nuxt-based SCAYLE Storefront project.

NOTE: Currently composables, utilities, helper functions and imported functions from packages will
be automatically inserted as imports. No components used within a `<template>` will be imported by it!

- Based on [nuxt-eslint-auto-explicit-import](https://github.com/antfu/nuxt-eslint-auto-explicit-import)
- Based on [eslint-plugin-unimport](https://github.com/antfu/eslint-plugin-unimport)
- [Official @nuxt/eslint module](https://eslint.nuxt.com/)
- [Official ESLint Documentation](https://eslint.org/docs/latest/)

## Example

- [Example Commit on eslint-flat-config-viewer](https://github.com/antfu/eslint-flat-config-viewer/commit/0f8000851b4ac0d7f3ea5e49963c6d7248303b7b)

## Details

## Usage

Add local module to `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: [
    // Both are required
    '@nuxt/eslint',
    './modules/eslint-auto-explicit-import',
  ],
})
```

Followed by adding a dedicated `eslint` flat config if none exists:

```js
// eslint.config.mjs
import withNuxt from './nuxt/eslint.config.mjs'

export default withNuxt({
  // Your ESLint config
})
```

Running `eslint` should now throw errors if a source file does use auto-import.
Adding `--fix` allows for automatically inserting / fixing of missing imports.

```sh
# yarn lint .
yarn lint . --fix
```

## Troubleshooting

1. Should a Vue component not have a dedicated `<script>` tag with some content within,
   it might be possible that the included local `eslint-plugin-unimport` fails with a
   `range` undefined error.
   In this case it is necessary to manually add the missing `<script>` tag with some dummy content.
