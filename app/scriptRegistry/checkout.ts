import { useRegistryScript } from '#nuxt-scripts/utils'
import { number, object, string } from '#nuxt-scripts-validator'
import type { RegistryScriptInput } from '#nuxt-scripts/types'

export const CheckoutComponentsOptions = object({
  host: string(),
  shopId: number(),
})

export type CheckoutComponentsInput = RegistryScriptInput<
  typeof CheckoutComponentsOptions,
  false,
  false,
  false
>

export function useCheckoutComponents(_options: CheckoutComponentsInput) {
  return useRegistryScript<never, typeof CheckoutComponentsOptions>(
    'scayle-checkout-components',
    (options) => ({
      schema: import.meta.dev ? CheckoutComponentsOptions : undefined,
      scriptInput: {
        key: 'checkout-wc',
        src: `${options.host}/frontend/checkout-wc/js?appId=${options.shopId}`,
      },
      scriptOptions: {
        bundle: false,
        tagPriority: 'high',
        warmupStrategy: 'preload',
        trigger: 'client',
      },
    }),
    _options,
  )
}
