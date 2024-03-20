import {
  type Product,
  type Variant,
  type Value,
  getPrice,
  getAttributeValue,
  getTotalAppliedReductions,
} from '@scayle/storefront-nuxt'

import type { Ref } from 'vue'
import {
  type PreferredDeliveryDate,
  getSubscriptionIntervals,
  getOrdinalSuffix,
  SUBSCRIPTION_ELIGIBILITY_ATTRIBUTE_NAME,
  SUBSCRIPTION_INTERVALS_ATTRIBUTE_NAME,
  SUBSCRIPTION_TERM,
  SUBSCRIPTION_CANCELLATION_POLICY,
} from '../helpers/subscription'

const selectedInterval = ref<Value | undefined>()
const selectedPreferredDeliveryDate = ref<PreferredDeliveryDate | undefined>()

export async function useSubscription(
  product: Ref<Product>,
  pricePromotionKey: Ref<string>,
  variant: Ref<Variant | undefined>,
) {
  const { $i18n } = useNuxtApp()
  const { data: subscriptionProduct } = await useProduct({
    params: {
      id: product.value.id,
      with: {
        variants: {
          attributes: {
            withKey: [
              SUBSCRIPTION_ELIGIBILITY_ATTRIBUTE_NAME,
              SUBSCRIPTION_INTERVALS_ATTRIBUTE_NAME,
              SUBSCRIPTION_TERM,
              SUBSCRIPTION_CANCELLATION_POLICY,
            ],
          },
          lowestPriorPrice: true,
        },
      },
      pricePromotionKey: pricePromotionKey.value,
    },
    key: `product-${product.value.id}-subscription`,
  })

  const subscriptionIntervals = computed(() =>
    getSubscriptionIntervals(selectedVariant.value),
  )

  const subscriptionTerm = computed(() =>
    getAttributeValue(selectedVariant.value?.attributes, SUBSCRIPTION_TERM),
  )

  const subscriptionCancellationPolicy = computed(() =>
    getAttributeValue(
      selectedVariant.value?.attributes,
      SUBSCRIPTION_CANCELLATION_POLICY,
    ),
  )

  const itemToAdd = computed(() => {
    return {
      variantId: selectedVariant.value?.id,
      quantity: 1,
      customData: customData.value,
      displayData: displayData.value,
    }
  })

  const customData = computed(() => {
    return {
      subscriptionDefinition: {
        subscriptionInterval: selectedInterval.value?.value,
        subscriptionDeliveryDate: selectedPreferredDeliveryDate.value?.day,
        subscriptionTerm: subscriptionTerm.value,
        subscriptionCancellationPolicy: subscriptionCancellationPolicy.value,
      },
      pricePromotionKey: pricePromotionKey.value,
    }
  })

  const ordinalSuffixKey = computed(() =>
    getOrdinalSuffix($i18n.locale, selectedPreferredDeliveryDate.value?.day),
  )

  const displayData = computed(() => {
    return {
      'attribute-1': {
        key: 'subscriptionDeliveryDate',
        label: $i18n.t('subscription.follow_up_delivery'),
        value: $i18n.t('subscription.day_of_month_selection_caption', {
          dayOfMonth:
            selectedPreferredDeliveryDate.value?.day +
            $i18n.t(`global.ordinal_suffixes.${ordinalSuffixKey.value}`),
        }),
      },
      'attribute-2': {
        key: 'subscriptionInterval',
        label: $i18n.t('subscription.interval'),
        value: selectedInterval.value?.label,
      },
    }
  })

  const subscriptionPrice = computed(() =>
    selectedVariant.value ? getPrice(selectedVariant.value) : undefined,
  )

  const showPriceFromSubscription = computed(
    () =>
      !selectedVariant.value &&
      !!subscriptionPrice.value?.appliedReductions.length,
  )

  const subscriptionVariantEligible = computed(
    () =>
      getAttributeValue(
        selectedVariant.value?.attributes,
        SUBSCRIPTION_ELIGIBILITY_ATTRIBUTE_NAME,
      ) === 'true',
  )

  const totalReductions = computed(
    () =>
      (subscriptionPrice.value &&
        getTotalAppliedReductions(subscriptionPrice.value)?.relative * 100) ||
      0,
  )

  const selectedVariant = computed(() => {
    return subscriptionProduct.value?.variants?.find(
      (subscriptionVariant) => subscriptionVariant.id === variant.value?.id,
    )
  })

  return {
    subscriptionProduct,
    selectedVariant,
    subscriptionIntervals,
    selectedInterval,
    selectedPreferredDeliveryDate,
    itemToAdd,
    subscriptionPrice,
    showPriceFromSubscription,
    subscriptionVariantEligible,
    totalReductions,
    ordinalSuffixKey,
  }
}
