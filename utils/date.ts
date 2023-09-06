/**
 *
 * @param date
 * @returns Date formatted according to currentShop.locale
 */
const localeFormattedDate = (date: string | undefined): string | null => {
  if (!date || isNaN(new Date(date).valueOf())) {
    return null
  }
  const {
    $currentShop: { locale },
  } = useNuxtApp() as any
  return new Intl.DateTimeFormat(locale.replace('_', '-'), {
    dateStyle: 'medium',
  }).format(new Date(date))
}

export default { localeFormattedDate }
