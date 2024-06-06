import { defineNuxtRouteMiddleware } from '#app/composables/router'
import { usePageState } from '~/composables/usePageState'

export default defineNuxtRouteMiddleware((to) => {
  const { setPageState } = usePageState()

  setPageState('type', to.meta.pageType as PageType)
  // reset page type id before each navigation
  setPageState('typeId', '')
})
