export default defineNuxtRouteMiddleware(async (to) => {
  const { isLoggedIn, user } = await useUser()

  const localePath = useLocalePath()

  const protectedRoutes = Object.values(
    usePick(routeList, [
      'account',
      'orders',
      'orderDetail',
      'checkout',
      'user',
    ]),
  ).map((it) => localePath(it.path))

  const isGuest = !!user.value?.status?.isGuestCustomer

  const isProtectedRoute = protectedRoutes.some((path) => to.path === path)

  if (!isLoggedIn.value && isProtectedRoute) {
    return navigateTo({ path: localePath(routeList.signin.path) })
  }

  if (isLoggedIn.value && isGuest && isProtectedRoute) {
    return navigateTo({ path: localePath(routeList.home.path) })
  }
})
