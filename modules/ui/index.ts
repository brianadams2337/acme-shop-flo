import {
  addImportsDir,
  createResolver,
  defineNuxtModule,
  addComponentsDir,
} from '@nuxt/kit'

export type ModuleOptions = {
  prefix?: string
  autoImports?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@scayle/storefront-ui',
    configKey: 'storefront-ui',
    version: '0.1.0',
    compatibility: {
      bridge: false,
      nuxt: '>=3.10',
    },
  },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    if (options.autoImports) {
      await addComponentsDir({
        path: resolve('./runtime/components'),
        pathPrefix: false,
        prefix: options.prefix ?? 'SF',
        // Only auto import Vue components
        // Resolves:
        // > This module cannot be imported in the Vue part of your app.
        // > [importing @nuxt/test-utils/runtime from modules/ui/runtime/components/core/button/Button.nuxt.test.ts]
        extensions: ['vue'],
      })
      addImportsDir(resolve('./runtime/composables'))
      addImportsDir(resolve('./runtime/helpers'))
    }

    nuxt.options.alias['#storefront-ui'] = resolve('./runtime')
    nuxt.options.alias['#storefront-ui/components'] = resolve(
      './runtime/components',
    )
  },
})
