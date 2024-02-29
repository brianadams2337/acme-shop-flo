export const useCustomerDataChangeWatcher = async () => {
  const { isLoggedIn, customerType, user, fetching } = await useUser()

  const { trackCustomerData } = useTrackingEvents()

  watch(
    () => user.value,
    (userData) => {
      if (!isLoggedIn.value) {
        return
      }
      console.log('track watcher')
      trackCustomerData({
        isLoggedIn: isLoggedIn.value,
        customerType: customerType.value,
        user: userData,
      })
    },
  )

  onNuxtReady(() => {
    watch(
      () => fetching.value,
      (newFetching) => {
        if (newFetching || isLoggedIn.value) {
          return
        }

        console.log('track nuxt ready')
        console.log(fetching.value)
        trackCustomerData({
          isLoggedIn: false,
          customerType: 'guest',
        })
      },
      { once: true },
    )
  })
}
