const SHOW_PROMOTIONS_DELAY = 5000

export default (promotions: Promotion[]) => {
  const currentPromotion = useState<Promotion>(
    'current-promotion',
    () => promotions[0],
  )

  const timeoutId = ref<NodeJS.Timeout>()

  const showNextPromotion = (currentIndex = -1) => {
    timeoutId.value = setTimeout(() => {
      const isLast = currentIndex === promotions.length - 1
      const idx = isLast ? 0 : currentIndex + 1
      currentPromotion.value = promotions[currentIndex]
      showNextPromotion(idx)
    }, SHOW_PROMOTIONS_DELAY)
  }

  onMounted(() => showNextPromotion())
  onUnmounted(() => clearTimeout(timeoutId.value))

  return {
    currentPromotion,
  }
}
