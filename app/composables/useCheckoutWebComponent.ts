import { useScript } from '#imports'
import { useCurrentShop } from '#storefront/composables'

export function useCheckoutWebComponent() {
  const currentShop = useCurrentShop()
  return useScript(
    `${currentShop.value?.checkout.host}/frontend/checkout-wc/js?appId=${currentShop.value?.shopId}`,
    {
      key: 'checkout-wc',
      bundle: false,
      tagPriority: 'high',
      warmupStrategy: 'preload',
      trigger: 'client',
    },
  )
}
