import {
  getFirstAttributeValue,
  extendPromise,
  type WishlistItem,
} from '@scayle/storefront-nuxt'
import { computed } from 'vue'
import { useSeoMeta } from '@unhead/vue'
import { WishlistListingMetadata } from '~/constants'
import { useNuxtApp } from '#app'
import { useBasket, useWishlist } from '#storefront/composables'

export const wishlistListingMetadata = {
  id: WishlistListingMetadata.ID,
  name: WishlistListingMetadata.NAME,
} as const

export function useWishlistPage() {
  const app = useNuxtApp()

  useSeoMeta({
    robots: 'noindex,follow',
    title: app.$i18n.t('navigation.wishlist'),
  })

  const wishlist = useWishlist()
  const basket = useBasket()

  if (wishlist.error.value) {
    throw wishlist.error.value
  }

  const getWishlistItemForSorting = (item: WishlistItem) => {
    const attributes = item.product?.attributes
    return getFirstAttributeValue(attributes, 'name')?.label ?? ''
  }

  const orderedItems = computed(() => {
    if (!wishlist.items.value) {
      return []
    }

    return wishlist.items.value
      .slice() // This creates a shallow copy of the input array so it doesn't modify the original array, as the sort method modifies the array in place
      .sort((a, b) =>
        getWishlistItemForSorting(a).localeCompare(
          getWishlistItemForSorting(b),
        ),
      )
  })

  const count = wishlist.count
  const fetching = basket.fetching

  return extendPromise(
    Promise.all([wishlist, basket]).then(() => ({})),
    {
      orderedItems,
      count,
      fetching,
      data: wishlist.data,
      products: wishlist.products,
    },
  )
}
