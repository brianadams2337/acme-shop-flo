import { describe, it, expect } from 'vitest'
import { renderSuspended } from '@nuxt/test-utils/runtime'
import ShopSwitcherItem from './ShopSwitcherItem.vue'

describe('ShopSwitcherItem.vue', () => {
  describe('shop name', () => {
    it('should print the shop name without the language', async () => {
      const { baseElement } = await renderSuspended(ShopSwitcherItem, {
        props: { locale: 'en-US', isCurrent: false },
      })
      expect(baseElement).toHaveTextContent('United States')
    })

    it('should print the shop name with the language', async () => {
      const { baseElement } = await renderSuspended(ShopSwitcherItem, {
        props: { locale: 'de-DE', isCurrent: false, includeLanguage: true },
      })
      expect(baseElement).toHaveTextContent('Deutschland | Deutsch')
    })

    it('should include the flag when includeFlag is tru', async () => {
      const { baseElement } = await renderSuspended(ShopSwitcherItem, {
        props: {
          locale: 'es-US',
          isCurrent: false,
          includeLanguage: true,
          includeFlag: true,
        },
      })
      expect(baseElement).toHaveTextContent('🇺🇸 Estados Unidos | español')
    })
  })
})
