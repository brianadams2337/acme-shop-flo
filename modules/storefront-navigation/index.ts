import { defineNuxtModule, createResolver, addImportsDir } from '@nuxt/kit'

interface ModuleOptions {
  autoImports?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@scayle/storefront-navigation',
    configKey: 'storefront-navigation',
    version: '0.0.1',
    compatibility: {
      bridge: false,
      nuxt: '>=3.13',
    },
  },
  defaults: {},
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    nuxt.options.alias['#storefront-navigation/utils'] =
      resolve('./runtime/utils')
    nuxt.options.build.transpile.push('#storefront-navigation/utils')
    if (options.autoImports) {
      addImportsDir(resolve('./runtime/utils'))
    }
  },
})
