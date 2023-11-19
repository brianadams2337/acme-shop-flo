export default async () => {
  const { data: basketData } = await useBasket()

  const { currentPromotion } = useCurrentPromotion()

  const minOrderValue = computed(() => {
    return currentPromotion.value?.customData?.minOrderValue || 0
  })
  const minOrderAmount = computed(() => divideWithHundred(minOrderValue.value))

  const basketTotalForPromotion = computed(() => {
    return basketData.value.items
      .filter((it) => it.promotionId === currentPromotion.value?.id)
      .reduce((total, it) => total + it.price.total.withTax, 0)
  })

  const progress = computed(() => {
    if (!minOrderValue.value) {
      return 0
    }

    return basketTotalForPromotion.value / minOrderAmount.value
  })

  const isFullProgress = computed(() => {
    return !!progress.value && progress.value >= 100
  })

  const formattedAmount = computed(() => toCurrency(minOrderValue.value))

  const formattedAmountLeft = computed(() => {
    return toCurrency(minOrderValue.value - basketTotalForPromotion.value)
  })

  return {
    minOrderAmount,
    progress,
    isFullProgress,
    formattedAmount,
    formattedAmountLeft,
  }
}
