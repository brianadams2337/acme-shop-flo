import { extendPromise } from '@scayle/storefront-nuxt'

export function useCampaign() {
  const promise = useRpc('getCampaignKey', 'getCampaignKey')
  const { data, fetch } = promise

  const campaign = computed(() => data.value)

  return extendPromise(
    promise.then(() => ({})),
    { data: campaign, fetch },
  )
}
