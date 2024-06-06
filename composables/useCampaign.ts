import { computed } from 'vue'
import { extendPromise } from '@scayle/storefront-nuxt'
import { useRpc } from '#storefront/composables'

export function useCampaign() {
  const promise = useRpc('getCampaignKey', 'getCampaignKey')
  const { data, fetch } = promise

  const campaign = computed(() => data.value)

  return extendPromise(
    promise.then(() => ({})),
    { data: campaign, fetch },
  )
}
