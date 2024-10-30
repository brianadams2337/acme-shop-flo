import { describe, it, expect } from 'vitest'
import type { CentAmount, ProductSearchQuery } from '@scayle/storefront-nuxt'
import { routeFactory } from '../test/factories/route'
import {
  getClearedFilterQueryByKey,
  getNewQueryFilters,
  createNewPriceQuery,
  createNewBoolAttributeQuery,
  createNewAttributeQuery,
  getClearedPriceQuery,
} from './filterQuery'

describe('getClearedFilterQueryByKey', () => {
  it('should return cleared filter query', () => {
    const route = routeFactory.build({
      query: { 'filters[newAttribute]': ['1', '2', '3', '4'] },
    })
    const query = getClearedFilterQueryByKey(route, 'newAttribute')
    expect(query).toEqual({})
  })
})

describe('getNewQueryFilters', () => {
  it('should return new query filters', () => {
    const route = routeFactory.build({
      query: {
        sort: 'asc',
        term: 'term',
      },
    })

    const query = getNewQueryFilters(route, { 'filters[newBool]': 'true' })
    expect(query).toEqual({
      sort: 'asc',
      term: 'term',
      'filters[newBool]': 'true',
    })
  })

  it('should return new query filters with ommited page', () => {
    const route = routeFactory.build({
      query: {
        sort: 'asc',
        term: 'term',
        page: '1',
      },
    })

    const query = getNewQueryFilters(route, { 'filters[newBool]': 'true' })
    expect(query).toEqual({
      sort: 'asc',
      term: 'term',
      'filters[newBool]': 'true',
    })
  })
})

describe('createNewAttributeQuery', () => {
  it('should return query with new filter and value', () => {
    const appliedFilter = { attributes: [] }
    const route = routeFactory.build({
      query: {},
    })

    const query = createNewAttributeQuery(route, appliedFilter, {
      slug: 'newAttribute',
      id: 1,
    })
    expect(query).toEqual({ 'filters[newAttribute]': '1' })
  })

  it('should return query with added new filter attribute and merged with existing query', () => {
    const appliedFilter = { attributes: [] }
    const route = routeFactory.build({
      query: {
        'filters[otherAttributes]': '1, 2, 3',
        sort: 'asc',
        term: 'term',
      },
    })

    const query = createNewAttributeQuery(route, appliedFilter, {
      slug: 'newAttribute',
      id: 1,
    })
    expect(query).toEqual({
      'filters[newAttribute]': '1',
      'filters[otherAttributes]': '1, 2, 3',
      sort: 'asc',
      term: 'term',
    })
  })

  it('should return query with added new value', () => {
    const appliedFilter = {
      attributes: [
        { key: 'newAttribute', values: [2, 3, 4], type: 'attributes' },
      ],
    } as ProductSearchQuery

    const query = createNewAttributeQuery(routeFactory.build(), appliedFilter, {
      slug: 'newAttribute',
      id: 1,
    })

    expect(query).toEqual({ 'filters[newAttribute]': '2,3,4,1' })
  })

  it('should return query with removed existing value', () => {
    const appliedFilter = {
      attributes: [
        { key: 'newAttribute', values: [2, 3, 4], type: 'attributes' },
      ],
    } as ProductSearchQuery

    const query = createNewAttributeQuery(routeFactory.build(), appliedFilter, {
      slug: 'newAttribute',
      id: 2,
    })
    expect(query).toEqual({ 'filters[newAttribute]': '3,4' })
  })

  it('should return query with removed existing value and filter', () => {
    const appliedFilter = {
      attributes: [{ key: 'newAttribute', values: [2], type: 'attributes' }],
    } as ProductSearchQuery

    const query = createNewAttributeQuery(routeFactory.build(), appliedFilter, {
      slug: 'newAttribute',
      id: 2,
    })
    expect(query).toEqual({})
  })
})

describe('createNewBoolAttributeQuery', () => {
  it('should return query with added boolean filter and value if true', () => {
    const query = createNewBoolAttributeQuery(
      routeFactory.build(),
      { attributes: [] },
      { slug: 'newBool', value: true },
    )
    expect(query).toEqual({ 'filters[newBool]': 'true' })
  })

  it('should return query with removed boolean filter and value if false', () => {
    const appliedFilter = {
      attributes: [{ key: 'newBool', value: true, type: 'boolean' }],
    } as ProductSearchQuery

    const query = createNewBoolAttributeQuery(
      routeFactory.build(),
      appliedFilter,
      {
        slug: 'newBool',
        value: false,
      },
    )
    expect(query).toEqual({})
  })
})

describe('createNewPriceQuery', () => {
  it('should create new price query', () => {
    const query = createNewPriceQuery(
      routeFactory.build(),
      { attributes: [] },
      [99 as CentAmount, 2345 as CentAmount],
    )
    expect(query).toEqual({
      'filters[minPrice]': '99',
      'filters[maxPrice]': '2345',
    })
  })
})

describe('getClearedPriceQuery', () => {
  it('should return cleared price query', () => {
    const route = routeFactory.build({
      query: {
        'filters[minPrice]': '1',
        'filters[maxPrice]': '12',
      },
    })
    expect(getClearedPriceQuery(route)).toEqual({})
  })
})
