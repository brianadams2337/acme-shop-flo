import { computed } from 'vue'
import { useCheckoutComponents } from '#imports'
import { useCurrentShop, useRpc } from '#storefront/composables'

export type Customer = {
  authentication: { data: unknown; type: string }
  data: {
    birthDate?: string
    customData?: Record<string, unknown>
    email: string
    firstName: string
    gender: string
    id: number
    lastName: string
    trackingHash?: string
    publicKey: string
    referenceKey?: string
    title?: string
    type: string
    phone?: { plainText: string }
  }
  flags?: { canUpgradeToFullAccount?: boolean; isGuest: boolean }
  groups: string[]
}

export function useCheckoutWebComponent() {
  const currentShop = useCurrentShop()
  useCheckoutComponents({
    host: currentShop.value?.checkout.host,
    shopId: currentShop.value?.shopId,
  })

  const { data, refresh: fetchCheckoutToken } = useRpc(
    'getCheckoutToken',
    'getCheckoutToken',
    undefined,
    { immediate: false },
  )

  return {
    fetchCheckoutToken,
    accessToken: computed(() => data.value?.accessToken),
    checkoutJwt: computed(() => data.value?.checkoutJwt),
  }
}
