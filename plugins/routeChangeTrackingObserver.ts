export default defineNuxtPlugin(() => {
  const router = useRouter()
  const store = useStore()
  const { $tracking } = useNuxtApp()

  if (!$tracking) {
    return
  }

  router?.afterEach((to, from) => {
    if (process.server) {
      return
    }

    $tracking.push(
      mapTrackingDataForEvent('content_view', {
        content_name: to.path,
        title: (typeof document !== 'undefined' && document.title) || '',
        page_type: store.value.pageType,
        page_type_id: store.value.pageTypeId,
        click_origin: from?.fullPath,
      }),
    )
  })
})
