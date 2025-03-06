import {
  type AutomaticDiscountEffect,
  type BasketItem,
  type BuyXGetYEffect,
  PromotionEffectType,
} from '@scayle/storefront-nuxt'
import Color from 'color'
import type { Promotion } from '~/types/promotion'

const getRGBAValue = (color: string, alpha: AlphaValue) =>
  Color(color)
    .alpha(alpha / 100)
    .rgb()
    .string()

export const FALLBACK_COLOR = '#007aff'

type AlphaValue = 0 | 5 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100

type PromotionStyle =
  | { textColor: string; backgroundColor: string; color?: string }
  | { textColor?: string; backgroundColor: string; color: string }

/**
 * Returns a style object with a background color based on the provided color and alpha values.
 *
 * @param color - The color to use for the background. If not provided, the fallback color will be used.
 * @param alpha - The alpha value to apply to the color. If not provided, no alpha will be applied.
 *
 * @returns An object containing the background color style as hex color.
 */
export const getBackgroundColorStyle = (
  color?: string | unknown,
  alpha?: AlphaValue,
): { backgroundColor: string } => {
  const colorHex = Color(color ?? FALLBACK_COLOR).hex()

  return {
    backgroundColor:
      alpha !== undefined ? getRGBAValue(colorHex, alpha) : colorHex,
  }
}
/**
 * Returns a style object with a text color based on the provided color and alpha values.
 *
 * @param color - The color to use for the text. If not provided, the fallback color will be used.
 * @param alpha - The alpha value to apply to the color. If not provided, no alpha will be applied.
 *
 * @returns An object containing the text color style as hex color.
 */
export const getTextColorStyle = (
  color?: string | unknown,
  alpha?: AlphaValue,
) => {
  const colorHex = Color(color ?? FALLBACK_COLOR).hex()
  return {
    color: alpha !== undefined ? getRGBAValue(colorHex, alpha) : colorHex,
  }
}

/**
 * Returns a promotion style object based on the provided promotion.
 *
 * @param promotion - The promotion to use for determining the style. If not provided, an empty style will be returned.
 *
 * @returns An object containing the promotion style as hex color.
 */
export const getPromotionStyle = (
  promotion?: Promotion | null,
): PromotionStyle | undefined => {
  if (!promotion) {
    return
  }

  return {
    ...getBackgroundColorStyle(promotion.customData?.colorHex, 10),
    ...getTextColorStyle(promotion.customData?.colorHex, 100),
  }
}
/**
 * Checks if the given promotion is of type BuyXGetY.
 *
 * @param promotion - The promotion to check.
 * @returns True if the promotion is a BuyXGetY type, false otherwise.
 */
export const isBuyXGetYType = (promotion?: Promotion | null): boolean => {
  return promotion?.effect?.type === PromotionEffectType.BUY_X_GET_Y
}

/**
 * Checks if the given promotion is of type AutomaticDiscountEffect.
 *
 * @param promotion - The promotion to check.
 * @returns True if the promotion is an AutomaticDiscount type, false otherwise.
 */
export const isAutomaticDiscountType = (
  promotion?: Promotion | null,
): boolean => {
  return promotion?.effect?.type === PromotionEffectType.AUTOMATIC_DISCOUNT
}

/**
 * Returns an array of variant IDs of the Buy X Get Y promotion. The returned variant IDs are eligible as a free gift.
 *
 * @param promotion - The promotion object.
 * @returns An array of variant IDs.
 */
export const getVariantIds = (promotion?: Promotion | null): number[] => {
  if (!isBuyXGetYType(promotion) || !promotion) {
    return []
  }
  const { additionalData } = promotion.effect as BuyXGetYEffect
  return additionalData.variantIds
}

/**
 * Checks if a free gift is eligible in the current basket.
 *
 * A promotion is considered eligible if its variants are included in the basket item.
 *
 * @param basketItem - The basket item to check eligibility for.
 * @returns Whether the promotion is eligible as a free gift.
 */
export const isFreeGiftEligible = (basketItem: BasketItem) => {
  const variantIds = getVariantIds(basketItem.promotion)
  return variantIds.includes(basketItem.variant.id)
}

export const getAdditionalData = (
  promotion?: Promotion | null,
): AutomaticDiscountEffect['additionalData'] | undefined => {
  if (!isAutomaticDiscountType(promotion) || !promotion) {
    return
  }
  const { additionalData } = promotion.effect as AutomaticDiscountEffect
  return additionalData
}

/**
 * Checks if the passed basket item is a gift or not.
 *
 * @param basketItem - The basket item to check.
 * @returns Whether the basket item is a gift.
 */
export const isFreeGiftBasketItem = (basketItem: BasketItem) =>
  isFreeGiftEligible(basketItem) && basketItem.promotion?.isValid
