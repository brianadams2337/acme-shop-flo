import { describe, it, vi, expect, beforeEach } from 'vitest'
import { useProductListFilter } from './useProductListFilter'

const mocks = vi.hoisted(() => {
  return {
    route: { query: {} },
    router: { push: vi.fn() },
    useAppliedFilters: {
      productConditions: { value: '' },
      appliedFilter: { value: {} },
      appliedFiltersCount: { value: 0 },
    },
    useTrackingEvents: {
      trackFilterApply: vi.fn(),
      trackFilterFlyout: vi.fn(),
    },
    useFilters: { data: { value: { filters: {}, unfilteredCount: 0 } } },
    useProductListSort: { value: '' },
    useToast: { show: vi.fn() },
    useI18n: { t: vi.fn().mockImplementation((key) => key) },
  }
})

vi.mock('#app/composables/router', () => ({
  useRoute: vi.fn().mockReturnValue(mocks.route),
  useRouter: vi.fn().mockReturnValue(mocks.router),
}))

vi.mock('#storefront/composables', () => ({
  useFilters: vi.fn().mockReturnValue(mocks.useFilters),
}))

vi.mock('#i18n', () => ({
  useI18n: vi.fn().mockReturnValue(mocks.useI18n),
}))

vi.mock('~/composables', () => ({
  useAppliedFilters: vi.fn().mockReturnValue(mocks.useAppliedFilters),
  useTrackingEvents: vi.fn().mockReturnValue(mocks.useTrackingEvents),
  useProductListSort: vi
    .fn()
    .mockReturnValue({ selectedSort: mocks.useProductListSort }),
  useToast: vi.fn().mockReturnValue(mocks.useToast),
}))

describe('useFilter', () => {
  beforeEach(() => {
    mocks.useFilters.data.value.filters = [
      {
        id: 1,
        slug: 'brand',
        name: 'Brand',
        values: [
          {
            name: 'value',
            id: 2,
            productCount: 10,
            value: 123,
          },
        ],
        type: 'attributes',
      },
      {
        id: 12,
        slug: 'sale',
        name: 'Sale',
        values: [
          {
            name: true,
            productCount: 12,
          },
          {
            name: false,
            productCount: 2,
          },
        ],
        type: 'boolean',
      },
      {
        id: 3,
        slug: 'prices',
        name: 'Prices',
        values: [
          {
            min: 10,
            max: 300,
            productCount: 30,
          },
        ],
        type: 'range',
      },
    ]
    mocks.useAppliedFilters.appliedFilter.value = { attributes: [] }
    mocks.useAppliedFilters.appliedFiltersCount.value = 0
    mocks.route.query = {}

    vi.clearAllMocks()
  })

  describe('availableFilters', () => {
    it('should have correct filterable values', () => {
      const { availableFilters } = useProductListFilter()

      expect(availableFilters.value).toHaveLength(3)
      expect(availableFilters.value).toStrictEqual([
        {
          id: 1,
          name: 'Brand',
          slug: 'brand',
          type: 'attributes',
          values: [
            {
              id: 2,
              name: 'value',
              productCount: 10,
              value: 123,
            },
          ],
        },
        {
          id: 12,
          name: 'Sale',
          slug: 'sale',
          type: 'boolean',
          values: [
            {
              name: true,
              productCount: 12,
            },
            {
              name: false,
              productCount: 2,
            },
          ],
        },
        {
          id: 3,
          name: 'Prices',
          slug: 'prices',
          type: 'range',
          values: [
            {
              max: 300,
              min: 10,
              productCount: 30,
            },
          ],
        },
      ])
    })

    it('should filter our boolean filter without products', () => {
      mocks.useFilters.data.value.filters = [
        {
          id: 12,
          slug: 'sale',
          name: 'Sale',
          values: [
            {
              name: true,
              productCount: 0,
            },
            {
              name: false,
              productCount: 2,
            },
          ],
          type: 'boolean',
        },
        {
          id: 12,
          slug: 'otherBoolean',
          name: 'other',
          values: [
            {
              name: true,
              productCount: 0,
            },
            {
              name: false,
              productCount: 2,
            },
          ],
          type: 'boolean',
        },
        {
          id: 12,
          slug: 'existingBoolean',
          name: 'Existing',
          values: [
            {
              name: true,
              productCount: 12,
            },
            {
              name: false,
              productCount: 2,
            },
          ],
          type: 'boolean',
        },
      ]

      const { availableFilters } = useProductListFilter()
      expect(availableFilters.value).toHaveLength(1)
      expect(availableFilters.value[0]).toStrictEqual({
        id: 12,
        name: 'Existing',
        slug: 'existingBoolean',
        type: 'boolean',
        values: [
          {
            name: true,
            productCount: 12,
          },
          {
            name: false,
            productCount: 2,
          },
        ],
      })
    })
  })

  describe('unfilteredCount', () => {
    it('should return unfiltered count', () => {
      const { unfilteredCount } = useProductListFilter()
      mocks.useFilters.data.value.unfilteredCount = 1
      expect(unfilteredCount.value).toEqual(1)
    })
  })

  describe('clearedPriceQuery', () => {
    it('should return cleared price query', () => {
      mocks.useAppliedFilters.appliedFiltersCount.value = 1
      mocks.route.query = {
        'filters[minPrice]': '1',
        'filters[maxPrice]': '12',
      }
      const { clearedPriceQuery } = useProductListFilter()
      expect(clearedPriceQuery.value).toEqual({})
    })
  })
})
