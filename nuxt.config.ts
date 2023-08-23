// https://nuxt.com/docs/api/configuration/nuxt-config
import { i18n, image, svgo } from './config'

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  plugins: ['~/plugins/validation'],
  modules: [
    'nuxt-svgo',
    '@nuxt/image',
    '@nuxtjs/i18n',
    'nuxt-lazy-hydrate',
    'nuxt-jsonld',
    '@vueuse/nuxt',
  ],

  components: {
    global: true,
    dirs: [
      '~/components',
      {
        path: '~/assets/icons',
        prefix: 'icon',
        pathPrefix: true,
        extensions: ['svg'],
      },
    ],
  },
  svgo,
  image,
  i18n,
})
