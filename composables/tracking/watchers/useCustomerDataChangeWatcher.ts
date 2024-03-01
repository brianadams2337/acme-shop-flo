export const useCustomerDataChangeWatcher = async () => {
  const { isLoggedIn, customerType, user, fetching } = await useUser()

  const { trackCustomerData } = useTrackingEvents()

  watch(
    () => user.value,
    (userData) => {
      if (!isLoggedIn.value) {
        return
      }
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
        trackCustomerData({
          isLoggedIn: false,
          customerType: 'guest',
        })
      },
      { once: true },
    )
  })
}
