import { useCurrentShop } from '#storefront/composables'

export function useFormatDate() {
  const currentShop = useCurrentShop()

  const formatLocaleDate = (date?: Date): string | null => {
    const locale = currentShop.value?.locale

    if (!date || isNaN(date.valueOf()) || !locale) {
      return null
    }

    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }).format(date)
  }

  return {
    formatLocaleDate,
  }
}
