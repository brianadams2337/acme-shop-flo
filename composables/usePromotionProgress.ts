export default async (currentPromotion: Promotion) => {
  const { data: basketData } = await useBasket()

  const minOrderValue = computed(() => {
    return currentPromotion.customData?.minOrderValue || 0
  })
  const minOrderAmount = computed(() => divideWithHundred(minOrderValue.value))

  const progress = computed(() => {
    if (!minOrderValue.value) {
      return
    }
    return basketData.value.cost.withTax / minOrderAmount.value
  })

  const isFullProgress = computed(() => progress.value && progress.value >= 100)

  const formattedAmount = computed(() => toCurrency(minOrderValue.value))

  return {
    minOrderAmount,
    progress,
    isFullProgress,
    formattedAmount,
  }
}
