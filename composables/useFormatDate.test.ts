import { describe, it, expect, vi } from 'vitest'
import { useFormatDate } from './useFormatDate'

const mocks = vi.hoisted(() => ({
  currentShop: {
    value: {
      locale: 'de-DE' as string | null,
    },
  },
}))

vi.mock('#storefront/composables', () => ({
  useCurrentShop: vi.fn().mockReturnValue(mocks.currentShop),
}))

describe('useFormatDate', () => {
  describe('formatLocaleDate', () => {
    it('should format a valid date string correctly', () => {
      const { formatLocaleDate } = useFormatDate()
      const result = formatLocaleDate(new Date('2025-02-02'))
      expect(result).toBe('2.2.2025')
    })

    it('should return null for an invalid date string', () => {
      const { formatLocaleDate } = useFormatDate()
      const result = formatLocaleDate(new Date('invalid-date'))
      expect(result).toBeNull()
    })

    it('should return null if no date is provided', () => {
      const { formatLocaleDate } = useFormatDate()
      const result = formatLocaleDate()
      expect(result).toBeNull()
    })

    it('should handle a valid date object correctly', () => {
      const { formatLocaleDate } = useFormatDate()
      const result = formatLocaleDate(new Date(2025, 1, 2)) // Month is 0-based
      expect(result).toBe('2.2.2025')
    })

    it('should return null if locale is missing', () => {
      mocks.currentShop.value.locale = null
      const { formatLocaleDate } = useFormatDate()
      const result = formatLocaleDate(new Date('2025-02-02'))
      expect(result).toBeNull()
    })

    it('should format date for en-US locale', () => {
      mocks.currentShop.value.locale = 'en-US'
      const { formatLocaleDate } = useFormatDate()
      const result = formatLocaleDate(new Date('2025-02-02'))
      expect(result).toBe('2/2/2025')
    })
    it('should format date for hr-HR locale', () => {
      mocks.currentShop.value.locale = 'hr-HR'
      const { formatLocaleDate } = useFormatDate()
      const result = formatLocaleDate(new Date('2025-02-02'))
      expect(result).toBe('02. 02. 2025.')
    })
  })
})
