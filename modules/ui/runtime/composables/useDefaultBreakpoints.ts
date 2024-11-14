import { useBreakpoints } from '@vueuse/core'
import { useRuntimeConfig } from '#imports'

export function useDefaultBreakpoints() {
  const { breakpoints } = useRuntimeConfig().public.storefrontUI
  return useBreakpoints(breakpoints)
}
