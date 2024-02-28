export function usePromotionConditionBanner(
  movLeft: Ref<number>,
  quantityLeft: Ref<number | undefined>,
) {
  const { $i18n } = useNuxtApp()
  const { formatCurrency } = useFormatHelpers()

  const label = computed(() => {
    const formattedMovLeft = formatCurrency(movLeft.value)

    const quantityLabel = $i18n.t('basket.promotion.quantity', {
      quantityLeft: quantityLeft.value,
    })
    const movLabel = $i18n.t('basket.promotion.mov', {
      movLeft: formattedMovLeft,
    })
    const quantityAndMovLabels = $i18n.t('basket.promotion.quantity_and_mov', {
      quantityLeft: quantityLeft.value,
      movLeft: formattedMovLeft,
    })

    if (movLeft.value && quantityLeft.value) {
      return quantityAndMovLabels
    }

    return movLeft.value ? movLabel : quantityLabel
  })

  return { label }
}
