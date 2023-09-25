import { getLowestPrice, WishlistItem } from '@scayle/storefront-nuxt'
import {
  ProductActionData,
  TrackAddToWishListParams,
  TrackRemoveFromWishListParams,
  TrackingEvent,
  TrackingPayload,
  WishlistData,
  ProductListData,
} from '~/types/tracking'

const useWishlistEvents = (
  track: (event: TrackingEvent, payload: TrackingPayload) => any,
) => {
  const currencyCode = useCurrentShop().value!.currency

  return {
    trackWishlistItems: (items: WishlistItem[] = []) => {
      const wishlistPayload: WishlistData = {
        items: items || [],
        total_campaign_reduction_with_tax: 0.0,
        total_sale_reduction_with_tax: 0.0,
        total_with_tax: 0.0,
        total_without_tax: 0.0,
      }

      items.forEach((wishlistItem) => {
        const appliedReductions =
          wishlistItem.variant?.price?.appliedReductions ?? []

        wishlistPayload.total_sale_reduction_with_tax +=
          sumReductionsByCategory(appliedReductions, 'sale')
        wishlistPayload.total_campaign_reduction_with_tax +=
          sumReductionsByCategory(appliedReductions, 'campaign')

        if (wishlistItem.variant) {
          wishlistPayload.total_with_tax +=
            wishlistItem.variant?.price.withTax || 0.0
          wishlistPayload.total_without_tax +=
            wishlistItem.variant?.price.withoutTax || 0.0
        } else if (wishlistItem.product?.variants) {
          const { withTax = 0.0, withoutTax = 0.0 } = getLowestPrice(
            wishlistItem.product.variants,
          )
          wishlistPayload.total_with_tax += withTax
          wishlistPayload.total_without_tax += withoutTax
        }
      })

      track('wishlist', wishlistPayload)
    },
    trackRemoveFromWishlist: ({
      product,
      quantity = 1,
      listingMetaData,
      category,
      index = 1,
      pagePayload,
    }: TrackRemoveFromWishListParams) => {
      const payload: ProductActionData = {
        product: { ...product, index },
        quantity,
        list: listingMetaData,
        currencyCode,
      }
      if (category) {
        const { id = -1, name = '' } = category
        payload.category = { id: id > -1 ? id.toString() : '', name }
      }

      payload.pagePayload = pagePayload
      track('remove_from_wishlist', payload)
    },
    trackAddToWishlist: ({
      product,
      quantity = 1,
      listingMetaData,
      category,
      variant,
      index = 1,
      pagePayload,
    }: TrackAddToWishListParams) => {
      const payload: ProductActionData = {
        product: { ...product, index },
        quantity,
        list: listingMetaData,
        currencyCode,
      }

      if (category) {
        const { id = -1, name = '' } = category
        payload.category = { id: id > -1 ? id.toString() : '', name }
      }
      if (variant) {
        payload.variant = variant
      }

      payload.pagePayload = pagePayload
      track('add_to_wishlist', payload)
    },
    trackWishlist: (items: ProductListData[]) => {
      track('wishlist', {
        currencyCode,
        items,
      })
    },
  }
}
export default useWishlistEvents
