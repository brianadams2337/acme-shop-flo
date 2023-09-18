/**
 * @param date
 * @returns Date formatted according to currentShop.locale
 */
export const localeFormattedDate = (date?: string): string | null => {
  const locale = useCurrentShop().value?.locale
  if (!date || isNaN(new Date(date).valueOf()) || !locale) {
    return null
  }

  return new Intl.DateTimeFormat(locale.replace('_', '-'), {
    dateStyle: 'medium',
  }).format(new Date(date))
}
