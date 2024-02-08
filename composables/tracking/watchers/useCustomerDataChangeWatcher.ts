export const useCustomerDataChangeWatcher = async () => {
  const { isLoggedIn, customerType, user } = await useUser()

  const { trackCustomerData } = useTrackingEvents()
  // set initially to -1, to ensure that the event get triggered on shop init
  const currentUserId = useState<number | undefined>(
    'current-user-id',
    () => -1,
  )

  watch(
    () => user.value,
    () => {
      if (currentUserId.value === user.value?.id) {
        return
      }

      currentUserId.value = user.value?.id

      trackCustomerData({
        isLoggedIn: isLoggedIn.value,
        customerType: customerType.value,
        user: user.value,
      })
    },
  )
}
