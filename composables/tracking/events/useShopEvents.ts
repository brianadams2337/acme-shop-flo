import { version } from '../../../package.json'
import { TrackingEvent, TrackingPayload } from '~/types/tracking'

const SHOP_GENDER: 'male' | 'female' | 'other' | '' = ''

const useShopEvents = (
  track: (event: TrackingEvent, payload: TrackingPayload) => any,
) => {
  return {
    trackShopInit: () => {
      const currentShop = useCurrentShop()
      if (!currentShop.value) {
        return
      }

      const { currency, shopId, locale } = currentShop.value

      return track('shop_init', {
        shop_currency: currency,
        shop_id: shopId,
        shop_gender: SHOP_GENDER,
        shop_version: version,
        locale: locale?.replace('_', '-'),
        landing_page: process.client ? window.location.href : '',
        referrer: process.client ? window.document.referrer : '',
        parameter: process.client ? window.location.search || '' : '',
        origin: 'web',
      })
    },
  }
}

export default useShopEvents
