import { addImportsDir, createResolver, defineNuxtModule } from '@nuxt/kit'

export * from './types'

type ModuleOptions = {
  autoImports?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@scayle/storefront-product-listing',
    configKey: 'product-listing',
    version: '1.0.0',
    compatibility: {
      bridge: false,
      nuxt: '>=3.10',
    },
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    nuxt.options.alias['#storefront-product-listing/composables'] = resolve(
      './runtime/composables',
    )

    nuxt.options.alias['#storefront-product-listing/utils'] =
      resolve('./runtime/utils')

    nuxt.options.alias['#storefront-product-listing'] = resolve('./')

    if (options.autoImports) {
      addImportsDir(resolve('./runtime/composables'))
    }
  },
})
