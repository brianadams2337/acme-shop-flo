import type {
  Promotion as CorePromotion,
  PromotionCustomData,
  BasketItem,
} from '@scayle/storefront-nuxt'

// This data can potentially change per tenant needs so the main goal is to
// change the types here so that it reflects the `customData` response payload
type CustomData = PromotionCustomData &
  Partial<{
    product: {
      promotionId: number
      badgeLabel: string
    }
    // This should match the `itemConditions`/`globalConditions` when creating or updating the  promotion
    giftConditions: Partial<{
      productId: number
      minQuantity: number
    }>
    headlineParts: string[]
    terms: string
    minOrderValue: number
    category: string
    colorHex: string
  }>

export {}

declare global {
  type Promotion = CorePromotion & { customData: CustomData }
  type BasketPromotion = BasketItem['promotion'] & Promotion
}
