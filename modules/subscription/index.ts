import {
  addComponentsDir,
  addImportsDir,
  createResolver,
  defineNuxtModule,
} from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: '@scayle/storefront-subscription',
    configKey: 'subscription',
    version: '1.0.0',
    compatibility: {
      bridge: false,
      nuxt: '>=3.10',
    },
  },
  async setup() {
    const resolver = createResolver(import.meta.url)
    await addComponentsDir({
      path: resolver.resolve('./components'),
      global: true,
    })

    addImportsDir(resolver.resolve('./composables'))
    addImportsDir(resolver.resolve('./helpers'))
  },
})
