import { BasketListingMetadata, WishlistListingMetadata } from '~/constants'

// @function tracks basket and wishlist changes
export const useUserItemsTrackingWatcher = async () => {
  const { data: basket } = await useBasket()
  const { data: wishlist, products: wishlistProducts } = await useWishlist()
  const {
    trackBasket,
    trackWishlist,
    collectBasketItems,
    collectProductListItems,
  } = useTrackingEvents()
  const route = useRoute()

  watch(
    () => deepClone(basket.value),
    (newValues, oldValues) => {
      const isBasketPage = route.fullPath.includes('/basket')
      if (
        didWishlistOrBasketDataChange(oldValues, newValues) &&
        !isBasketPage
      ) {
        trackBasket(
          collectBasketItems(basket.value?.items, {
            listId: BasketListingMetadata.ID,
            listName: BasketListingMetadata.NAME,
          }),
        )
      }
    },
  )

  watch(
    () => deepClone(wishlist.value),
    (newValues, oldValues) => {
      if (didWishlistOrBasketDataChange(oldValues, newValues)) {
        trackWishlist(
          collectProductListItems(wishlistProducts.value, {
            listId: WishlistListingMetadata.ID,
            listName: WishlistListingMetadata.NAME,
          }),
        )
      }
    },
  )
}
