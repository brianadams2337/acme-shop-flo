import type { MaybeRefOrGetter } from 'vue'
import { onMounted, ref, toValue } from 'vue'
import type { PublicShopConfig } from '@scayle/storefront-nuxt'
import { getCurrentCountryFromTimezone } from '../utils/currentCountry'
import {
  useAvailableShops,
  useCurrentShop,
  useUser,
} from '#storefront/composables'

export type CountryDetectionParams = {
  /**
   * Ref or function indicating whether the user has been prompted before.
   */
  hasPromptedUser: MaybeRefOrGetter<boolean>
  /**
   * An optional function to get the detected country code.
   * Defaults to a function that gets the country code from the user's timezone.
   * @returns Returns the detected country code
   */
  getDetectedCountryCode?: () =>
    | Promise<string | undefined>
    | (string | undefined)
  /**
   * An optional function to determine whether the user should be prompted to switch shops.
   * @param detectedRegion - The actual region of the user
   * @param currentRegion - Region of the current shop
   * @returns Boolean whether or not the user should be prompted to switch shops
   */
  shouldPromptUser?: (
    detectedRegion: string,
    currentRegion: string,
  ) => Promise<boolean> | boolean
}

/**
 * A composable that provides logic for detecting the user's country and suggesting shops matching the detected country
 * @param {CountryDetectionParams} params - An object containing the parameters for the composable.
 * @returns An object containing the suggested shops, detected region, and whether the suggestion is active.
 */
export function useCountryDetection({
  hasPromptedUser,
  getDetectedCountryCode = getCurrentCountryFromTimezone,
  shouldPromptUser,
}: CountryDetectionParams) {
  const currentShop = useCurrentShop()
  const availableShops = useAvailableShops()
  const user = useUser()

  const suggestionActive = ref(false)

  /**
   * Get the shops matching a region code
   * @param region The two character region code to search for
   * @param fallbackShopId The shop ID to use if there is no match
   */
  const getShopsForRegion = (
    region: string | undefined,
    fallbackShopId?: number,
  ) => {
    if (!region) {
      return []
    }
    const shopsForRegion = availableShops.value.filter(
      (shop) => new Intl.Locale(shop.locale).region === region,
    )
    if (shopsForRegion.length === 0 && fallbackShopId) {
      return availableShops.value.filter(
        (shop) => shop.shopId === fallbackShopId,
      )
    }

    return shopsForRegion
  }

  const suggestedShops = ref<PublicShopConfig[]>([])
  const detectedRegion = ref()

  onMounted(async () => {
    detectedRegion.value = await getDetectedCountryCode()
    const currentRegion = new Intl.Locale(currentShop.value.locale).region

    suggestedShops.value = getShopsForRegion(detectedRegion.value).filter(
      (shop) => shop.shopId !== currentShop.value.shopId,
    )

    const isLoggedIn = (await user).isLoggedIn

    suggestionActive.value =
      detectedRegion.value &&
      currentRegion &&
      detectedRegion.value !== currentRegion &&
      (shouldPromptUser
        ? await shouldPromptUser(detectedRegion.value, currentRegion)
        : // Do not show the country modal if the user is logged in or the user has already dismissed the modal
          !(toValue(isLoggedIn) || toValue(hasPromptedUser)))
  })

  return {
    suggestedShops,
    detectedRegion,
    suggestionActive,
  }
}
