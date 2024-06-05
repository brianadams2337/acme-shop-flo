import { USE_BANNER_KEY, useContext } from '~/composables'

export const useStorefrontBanner = () => {
  return useContext(USE_BANNER_KEY)
}
