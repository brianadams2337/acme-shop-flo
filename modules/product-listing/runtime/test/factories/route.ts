import type { RouteLocationNormalizedGeneric } from 'vue-router'
import { Factory } from 'fishery'

export const routeFactory = Factory.define<RouteLocationNormalizedGeneric>(
  () => ({
    name: 'test',
    params: {},
    matched: [],
    path: '/test',
    fullPath: '/test',
    redirectedFrom: undefined,
    hash: '',
    meta: { test: '' },
    query: {},
  }),
)
