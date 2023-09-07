/**
 * Add more flyout toggles here
 * this makes sure we are following DRY coding principles
 * individual components should not have to import composables, destructure them and then call them
 */

export const showBasketFlyOut = (): void => {
  const { openBasketFlyout } = useUiState()
  openBasketFlyout()
}
