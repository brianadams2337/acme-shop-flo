import { useBreakpoints } from '@vueuse/core'
import breakpoints from '../config/breakpoints'

export function useDefaultBreakpoints() {
  return useBreakpoints(breakpoints)
}
