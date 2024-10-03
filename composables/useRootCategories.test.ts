import { describe, it, vi, expect, beforeEach, type Mock } from 'vitest'
import type { Category } from '@scayle/storefront-nuxt'
import { useRootCategories } from './useRootCategories'
import type { NuxtError } from '#app'
import { createError } from '#app/composables/error'

function getBaseCategoryData(): Omit<Category, 'id'> {
  return {
    path: '/root/child/test',
    name: 'Test',
    slug: 'test',
    parentId: 2048,
    rootlineIds: [2045, 2048, 2058],
    childrenIds: [],
    properties: [],
    isHidden: false,
    depth: 3,
    supportedFilter: ['color', 'brand', 'size'],
    shopLevelCustomData: {},
    countryLevelCustomData: {},
  }
}

type RootCategoriesMockType = {
  then: Mock
  data: {
    value:
      | {
          categories: Category[]
          activeNode: undefined
        }
      | {
          categories: Category
          activeNode: Category
        }
      | undefined
  }
  fetching: { value: boolean }
  error: { value: NuxtError<unknown | null> | null }
}

const mocks = vi.hoisted(() => {
  const useCategories: RootCategoriesMockType = {
    then: vi.fn(),
    data: {
      value: {
        categories: [],
        activeNode: undefined,
      },
    },
    fetching: { value: false },
    error: { value: null },
  }

  return {
    useCategories,
  }
})

vi.mock('#storefront/composables', () => ({
  useCategories: vi.fn().mockReturnValue(mocks.useCategories),
}))

describe('useRootCategories', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return root categories and all categories with multiple categories', () => {
    mocks.useCategories.data.value = {
      categories: [
        { id: 1, ...getBaseCategoryData() },
        { id: 2, ...getBaseCategoryData() },
      ],
      activeNode: undefined,
    }

    const { fetchingCategories, rootCategories, error, allCategories } =
      useRootCategories()

    expect(fetchingCategories.value).toBe(false)
    expect(rootCategories.value.map(({ id }) => id)).toEqual([1, 2])
    expect(allCategories.value.map(({ id }) => id)).toEqual([1, 2])
    expect(error.value).toBe(null)
  })

  it('should return root categories and all categories with single categories', () => {
    const category: Category = { id: 1, ...getBaseCategoryData() }
    mocks.useCategories.data.value = {
      categories: category,
      activeNode: category,
    }

    const { fetchingCategories, rootCategories, error, allCategories } =
      useRootCategories()

    expect(fetchingCategories.value).toBe(false)
    expect(rootCategories.value.map(({ id }) => id)).toEqual([1])
    expect(allCategories.value.map(({ id }) => id)).toEqual([1])
    expect(error.value).toBe(null)
  })

  it('should handle empty categories data', () => {
    mocks.useCategories.data.value = undefined

    const { fetchingCategories, rootCategories, error, allCategories } =
      useRootCategories()

    expect(fetchingCategories.value).toBe(false)
    expect(rootCategories.value).toEqual([])
    expect(allCategories.value).toEqual([])
    expect(error.value).toBe(null)
  })

  it('should handle errors', () => {
    const mockError = createError('root categories error')
    mocks.useCategories.data.value = undefined
    mocks.useCategories.error.value = mockError

    const { fetchingCategories, rootCategories, error, allCategories } =
      useRootCategories()

    expect(fetchingCategories.value).toBe(false)
    expect(rootCategories.value).toEqual([])
    expect(allCategories.value).toEqual([])
    expect(error.value).toBe(mockError)
  })
})
