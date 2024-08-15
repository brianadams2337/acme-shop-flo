import { describe, it, vi, expect, beforeEach } from 'vitest'
import type { Ref } from 'vue'
import type { CentAmount, RFC33339Date, Variant } from '@scayle/storefront-nuxt'
import { useProductDetails } from './useProductDetails'
import type { NuxtError } from '#app'
import { createError } from '#app/composables/error'

const mocks = vi.hoisted(() => {
  return {
    useProduct: {
      then: vi.fn(),
      data: {
        value: {
          id: 1,
          isActive: true,
          isSoldOut: false,
          isNew: false,
          createdAt: '2022-04-26T15:04:56+00:00',
          updatedAt: '2022-06-21T20:02:33+00:00',
          masterKey: 'HGO3464001000001',
          referenceKey: '1',
          attributes: {
            color: {
              id: 1001,
              key: 'color',
              label: 'Color',
              type: '',
              multiSelect: false,
              values: {
                id: 6,
                label: 'Weiß',
                value: 'weiss',
              },
            },
            brand: {
              id: 550,
              key: 'brand',
              label: 'Marke',
              type: '',
              multiSelect: false,
              values: {
                id: 63,
                label: 'HUGO',
                value: 'hugo',
              },
            },
            name: {
              id: 20005,
              key: 'name',
              label: 'Name',
              type: null,
              multiSelect: false,
              values: {
                label: "HUGO Sweatshirt 'Dakimara'",
              },
            },
          },
          lowestPriorPrice: {},
          images: [
            {
              hash: 'images/fe8ee645c772b98de23b00e4f600a613.png',
            },
          ],
          variants: [] as Variant[],
          siblings: [],
          priceRange: {
            min: {
              currencyCode: 'EUR',
              withTax: 8990 as CentAmount,
              withoutTax: 7555 as CentAmount,
              appliedReductions: [],
              tax: {
                vat: {
                  amount: 1435 as CentAmount,
                  rate: 0.19,
                },
              },
            },
            max: {
              currencyCode: 'EUR',
              withTax: 8990 as CentAmount,
              withoutTax: 7555 as CentAmount,
              appliedReductions: [],
              tax: {
                vat: {
                  amount: 1435 as CentAmount,
                  rate: 0.19,
                },
              },
            },
          },
          categories: [],
        },
      },
      fetching: { value: false },
      error: { value: null } as Ref<NuxtError<unknown> | null>,
    },
    useState: {
      value: { lowestPriorPrice: '', price: '' } as
        | { lowestPriorPrice?: string; price?: string }
        | undefined,
    },
    useProductBaseInfo: {
      variantWithLowestPrice: {
        value: { lowestPriorPrice: '', price: '' } as {
          lowestPriorPrice: string
          price: string | { appliedReductions: string }
        },
      },
    },
  }
})

vi.mock('#app/composables/router', () => ({
  useRoute: vi.fn().mockReturnValue({ params: { slug: 'slug' } }),
}))

vi.mock('#app/composables/state', () => ({
  useState: vi.fn().mockReturnValue(mocks.useState),
}))

vi.mock('#image/composables', () => ({
  useImage: vi.fn().mockReturnValue({ getImage: vi.fn() }),
}))

vi.mock('#storefront/composables', () => ({
  useProduct: vi.fn().mockReturnValue(mocks.useProduct),
}))

vi.mock('~/composables', () => ({
  useProductBaseInfo: vi.fn().mockReturnValue(mocks.useProductBaseInfo),
  useBreadcrumbs: vi
    .fn()
    .mockReturnValue({ getBreadcrumbsFromProductCategories: vi.fn() }),
}))

describe('useProductDetails', () => {
  beforeEach(() => {
    mocks.useProduct.error.value = null
    mocks.useProduct.data = {
      value: {
        id: 1,
        isActive: true,
        isSoldOut: false,
        isNew: false,
        createdAt: '2022-04-26T15:04:56+00:00',
        updatedAt: '2022-06-21T20:02:33+00:00',
        masterKey: 'HGO3464001000001',
        referenceKey: '1',
        attributes: {
          color: {
            id: 1001,
            key: 'color',
            label: 'Color',
            type: '',
            multiSelect: false,
            values: {
              id: 6,
              label: 'Weiß',
              value: 'weiss',
            },
          },
          brand: {
            id: 550,
            key: 'brand',
            label: 'Marke',
            type: '',
            multiSelect: false,
            values: {
              id: 63,
              label: 'HUGO',
              value: 'hugo',
            },
          },
          name: {
            id: 20005,
            key: 'name',
            label: 'Name',
            type: null,
            multiSelect: false,
            values: {
              label: "HUGO Sweatshirt 'Dakimara'",
            },
          },
        },
        lowestPriorPrice: {},
        images: [
          {
            hash: 'images/fe8ee645c772b98de23b00e4f600a613.png',
          },
        ],
        variants: [],
        siblings: [],
        priceRange: {
          min: {
            currencyCode: 'EUR',
            withTax: 8990 as CentAmount,
            withoutTax: 7555 as CentAmount,
            appliedReductions: [],
            tax: {
              vat: {
                amount: 1435 as CentAmount,
                rate: 0.19,
              },
            },
          },
          max: {
            currencyCode: 'EUR',
            withTax: 8990 as CentAmount,
            withoutTax: 7555 as CentAmount,
            appliedReductions: [],
            tax: {
              vat: {
                amount: 1435 as CentAmount,
                rate: 0.19,
              },
            },
          },
        },
        categories: [],
      },
    }
  })

  it('should throw error with missing slug key for caching', () => {
    expect(() => useProductDetails()).toThrowError('missing key argument')
  })

  it('should throw error with if product call throws error', () => {
    mocks.useProduct.error.value = createError('bla')
    expect(() => useProductDetails('key')).toThrowError('bla')
  })

  describe('lowestPriorPrice', () => {
    beforeEach(() => {
      if (mocks.useState.value) {
        mocks.useState.value.lowestPriorPrice = 'state lowestPriorPrice'
      }
      mocks.useProductBaseInfo.variantWithLowestPrice.value.lowestPriorPrice =
        'variant lowestPriorPrice'
      mocks.useProduct.data.value.lowestPriorPrice = 'product lowestPriorPrice'
    })

    it('lowestPriorPrice should be state lowestPriorPrice', () => {
      const { lowestPriorPrice } = useProductDetails('key')

      expect(lowestPriorPrice.value).toBe('state lowestPriorPrice')
    })
    it('lowestPriorPrice should be variant lowestPriorPrice', () => {
      if (mocks.useState.value) {
        mocks.useState.value.lowestPriorPrice = ''
      }
      const { lowestPriorPrice } = useProductDetails('key')

      expect(lowestPriorPrice.value).toBe('variant lowestPriorPrice')
    })
    it('lowestPriorPrice should be product lowestPriorPrice', () => {
      if (mocks.useState.value) {
        mocks.useState.value.lowestPriorPrice = ''
      }
      mocks.useProductBaseInfo.variantWithLowestPrice.value.lowestPriorPrice =
        ''
      const { lowestPriorPrice } = useProductDetails('key')

      expect(lowestPriorPrice.value).toBe('product lowestPriorPrice')
    })
  })
  describe('price', () => {
    beforeEach(() => {
      mocks.useState.value = { price: 'state price' }
      mocks.useProductBaseInfo.variantWithLowestPrice.value.price =
        'variant price'
    })

    it('price should be state price', () => {
      const { price } = useProductDetails('key')

      expect(price.value).toBe('state price')
    })
    it('price should be variant price', () => {
      mocks.useState.value = undefined
      const { price } = useProductDetails('key')

      expect(price.value).toBe('variant price')
    })
  })
  describe('handleSelectedSize', () => {
    it('should be undefined if product has no variants', () => {
      const { handleSelectedSize } = useProductDetails('key')

      expect(
        handleSelectedSize({ label: 'label', value: 'value' }),
      ).toBeUndefined()
    })

    it('should get correct value', () => {
      const variant = {
        id: 12,
        referenceKey: '1',
        firstLiveAt: '2022-04-28T14:13:07+00:00' as RFC33339Date,
        createdAt: '2022-04-28T14:13:07+00:00' as RFC33339Date,
        updatedAt: '2022-05-05T15:05:35+00:00' as RFC33339Date,
        price: {
          currencyCode: 'EUR',
          withTax: 8990 as CentAmount,
          withoutTax: 7555 as CentAmount,
          appliedReductions: [],
          recommendedRetailPrice: null,
          tax: {
            vat: {
              amount: 1435 as CentAmount,
              rate: 0.19,
            },
          },
        },
        stock: {
          supplierId: 1,
          warehouseId: 1,
          quantity: 999,
          isSellableWithoutStock: false,
        },
        attributes: {
          size: {
            id: 2,
            key: 'size',
            label: 'Größe',
            type: '',
            multiSelect: false,
            values: {
              id: 25472,
              label: '34',
              value: '34',
            },
          },
        },
      } as Variant
      mocks.useProduct.data.value.variants.push(variant)
      const { handleSelectedSize, activeVariant } = useProductDetails('key')
      handleSelectedSize({
        id: 25472,
        label: '34',
        value: '34',
      })
      expect(activeVariant.value).toStrictEqual(variant)
    })
  })
  describe('hasSpecial', () => {
    it('hasSpecial should be false if product does not have variant with applied reductions', () => {
      const { hasSpecial } = useProductDetails('key')
      expect(hasSpecial.value).toBeFalsy()
    })
    it('hasSpecial should be true if product does has a variant with applied reductions', () => {
      mocks.useState.value = undefined
      mocks.useProductBaseInfo.variantWithLowestPrice.value.price = {
        appliedReductions: '2',
      }
      const { hasSpecial } = useProductDetails('key')
      expect(hasSpecial.value).toBeTruthy()
    })
  })
})
