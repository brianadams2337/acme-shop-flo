/** @function tracks customer data changes */
export const useCustomerDataChangeWatcher = async () => {
  const { isLoggedIn, customerType, user } = await useUser()

  const { trackCustomerData } = useTrackingEvents()
  // set initially to -1, to ensure that the event get triggered on shop init
  let currentUserId: number | undefined = -1

  watch(
    () => user.value,
    () => {
      if (currentUserId !== user.value?.id) {
        currentUserId = user.value?.id
        trackCustomerData({
          isLoggedIn: isLoggedIn.value,
          customerType: customerType.value,
          user: user.value,
        })
      }
    },
  )
}
