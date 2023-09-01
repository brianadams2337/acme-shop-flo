import helpers from '~/helpers'

declare module '#app' {
  interface NuxtApp {
    $helpers: typeof helpers
  }
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      helpers,
    },
  }
})
