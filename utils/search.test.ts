import { describe, expect, it } from 'vitest'
import {
  getSearchFilterLabels,
  buildFiltersQuery,
  type CategoryFilter,
} from './search'

describe('buildFiltersQuery', () => {
  it('should build filters queries for attribute filters', () => {
    const filters: CategoryFilter[] = [
      {
        type: 'attribute',
        attributeFilter: {
          group: {
            id: 1001,
            key: 'color',
            label: 'Detail Color',
            type: '',
            multiSelect: false,
          },
          values: [
            {
              id: 10,
              value: 'blau',
              label: 'Blau',
            },
            {
              id: 13,
              value: 'rot',
              label: 'Rot',
            },
          ],
        },
      },
      {
        type: 'attribute',
        attributeFilter: {
          group: {
            id: 1002,
            key: 'size',
            label: 'Size',
            type: '',
            multiSelect: false,
          },
          values: [
            {
              id: 39,
              value: 'm',
              label: 'M',
            },
            {
              id: 37,
              value: 'xl',
              label: 'XL',
            },
          ],
        },
      },
    ]
    const query = buildFiltersQuery(filters)
    expect(query).toEqual({
      'filters[color]': '10,13',
      'filters[size]': '39,37',
    })
  })

  it('should build filters queries for boolean filters', () => {
    const filters: CategoryFilter[] = [
      {
        type: 'boolean',
        booleanFilter: {
          slug: 'sale',
          label: 'Sale',
          value: true,
        },
      },
      {
        type: 'boolean',
        booleanFilter: {
          slug: 'isNew',
          label: 'New',
          value: true,
        },
      },
    ]
    const query = buildFiltersQuery(filters)
    expect(query).toEqual({ 'filters[sale]': 'true', 'filters[isNew]': 'true' })
  })
})

describe('getSearchFilterLabels', () => {
  it('should return search filter labels', () => {
    const filters: CategoryFilter[] = [
      {
        type: 'attribute',
        attributeFilter: {
          group: {
            id: 1001,
            key: 'color',
            label: 'Detail Color',
            type: '',
            multiSelect: false,
          },
          values: [
            {
              id: 10,
              value: 'blau',
              label: 'Blau',
            },
            {
              id: 13,
              value: 'rot',
              label: 'Rot',
            },
          ],
        },
      },
      {
        type: 'attribute',
        attributeFilter: {
          group: {
            id: 1002,
            key: 'size',
            label: 'Size',
            type: '',
            multiSelect: false,
          },
          values: [
            {
              id: 39,
              value: 'm',
              label: 'M',
            },
            {
              id: 37,
              value: 'xl',
              label: 'XL',
            },
          ],
        },
      },
      {
        type: 'boolean',
        booleanFilter: {
          slug: 'sale',
          label: 'Sale',
          value: true,
        },
      },
    ]

    const labels = getSearchFilterLabels(filters)
    expect(labels).toEqual(['Blau', 'Rot', 'M', 'XL', 'Sale'])
  })
})
