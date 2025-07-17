<template>
  <scayle-express-checkout
    v-if="ready"
    origin="web"
    :jwt="data?.checkoutJwt"
    :access-token="data?.accessToken"
    :consent="JSON.stringify({ paypal: true, klarna: true })"
    :basket-total="basket?.cost.withTax"
    @invalid-access-token="onInvalidAccessToken"
    @consent-missing="onConsentMissing"
    @express-error="onExpressError"
    @express-checkout-finished="onExpressCheckoutFinished"
  />
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  useBasket,
  useCurrentShop,
  useLog,
  useRpc,
} from '@scayle/storefront-nuxt/composables'
import { navigateTo } from '#app/composables/router'
import { useCheckoutComponents } from '#imports'
import { useRouteHelpers, useToast } from '~/composables'

const log = useLog('SFExpressCheckout')
const currentShop = useCurrentShop()
const loaded = ref(false)

log.warn(
  '<SFExpressCheckout /> does not handle consent management by default. Please adjust the script trigger to respect the users consent based on your consent management system.',
)

const { onLoaded } = useCheckoutComponents({
  host: currentShop.value?.checkout.host,
  shopId: currentShop.value?.shopId,
  scriptOptions: {
    trigger: 'client',
  },
})
onLoaded(async () => {
  loaded.value = true
})

const {
  data,
  refresh: fetchCheckoutToken,
  status,
} = useRpc('getCheckoutToken', 'getCheckoutToken', undefined, {
  server: false,
})
const { data: basket } = useBasket()
const ready = computed(
  () => status.value === 'success' && !!basket.value && !!loaded.value,
)

const toast = useToast()
const onInvalidAccessToken = (e: unknown) => {
  console.log('express-checkout', 'onInvalidAccessToken', e)
  fetchCheckoutToken()
}
const onConsentMissing = (e: unknown) => {
  console.log('express-checkout', 'onConsentMissing', e)
  toast.show('Consent missing', {
    action: 'CONFIRM',
    type: 'ERROR',
  })
}
const onExpressError = (error: Error) => {
  console.log('express-checkout', 'onExpressError', error)
  toast.show('Express error' + error.message, {
    action: 'CONFIRM',
    type: 'ERROR',
  })
}
type ExpressCheckoutFinishedEvent = Event & {
  detail: {
    isFinalized: boolean
    orderId: number
    id: string
  }
}
const { getExpressCheckoutRoute } = useRouteHelpers()
const onExpressCheckoutFinished = async (
  event: ExpressCheckoutFinishedEvent,
) => {
  console.log('express-checkout', 'onExpressCheckoutFinished', event)
  if (event.detail.isFinalized) {
    log.debug('Express checkout in a single step is not supported.')
    return
  }
  await navigateTo(getExpressCheckoutRoute(event.detail.id))
}
</script>
