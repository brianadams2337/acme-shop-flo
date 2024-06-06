import { getCurrentScope, watch } from 'vue'
import { useBasket, useWishlist } from '#storefront/composables'
import { useRoute } from '#app/composables/router'
import { useTrackingEvents } from '~/composables/useTrackingEvents'
import { BasketListingMetadata, WishlistListingMetadata } from '~/constants'
import { didBasketDataChange, didWishlistDataChange } from '~/utils'

export const useUserItemsTrackingWatcher = async () => {
  const scope = getCurrentScope()
  const route = useRoute()

  const {
    trackBasket,
    trackWishlist,
    collectBasketItems,
    collectProductListItems,
  } = useTrackingEvents()

  const [{ data: wishlist, products: wishlistProducts }, { data: basket }] =
    await Promise.all([useWishlist(), useBasket()])

  scope?.run(() => {
    watch(
      () => basket.value,
      (newValues, oldValues) => {
        const isBasketPage = route.fullPath.includes('/basket')
        if (didBasketDataChange(oldValues, newValues) && !isBasketPage) {
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
      () => wishlist.value,
      (newValues, oldValues) => {
        if (didWishlistDataChange(oldValues, newValues)) {
          trackWishlist(
            collectProductListItems(wishlistProducts.value, {
              listId: WishlistListingMetadata.ID,
              listName: WishlistListingMetadata.NAME,
            }),
          )
        }
      },
    )
  })
}
