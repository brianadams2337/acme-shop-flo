// plugins/storyblok.js
import { StoryblokVue, apiPlugin } from '@storyblok/vue'
import type { StoryblokRuntimeConfig } from '../types'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin(({ vueApp }) => {
  const runtimeConfig = useRuntimeConfig()
  const cms = runtimeConfig.public.cms as StoryblokRuntimeConfig

  vueApp.use(StoryblokVue, {
    accessToken:
      cms.accessToken ?? import.meta.env.NUXT_PUBLIC_CMS_ACCESS_TOKEN,
    apiOptions: {
      ...JSON.parse(JSON.stringify(runtimeConfig.public.storyblok)),
    },
    use: [apiPlugin],
  })
})
