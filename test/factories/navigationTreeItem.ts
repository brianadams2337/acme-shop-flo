import type {
  NavigationItemCategory,
  NavigationItemExternal,
  NavigationItemPage,
} from '@scayle/storefront-nuxt'
import { Factory } from 'fishery'
import { categoryFactory } from './category'

export const navigationItemExternalFactory =
  Factory.define<NavigationItemExternal>(() => ({
    id: 5717,
    assets: {},
    languages: {},
    name: 'Home',
    visibleFrom: null,
    visibleTo: null,
    children: [],
    type: 'individual-link',
    options: { url: 'https://google.com', isOpenInNewWindow: true },
  }))

export const navigationItemPageFactory = Factory.define<NavigationItemPage>(
  () => ({
    id: 5717,
    assets: {},
    languages: {},
    name: 'PageName',
    visibleFrom: null,
    visibleTo: null,
    children: [],
    type: 'page',
    page: '/page',
  }),
)

export const navigationItemCategoryFactory =
  Factory.define<NavigationItemCategory>(() => ({
    id: 5717,
    assets: {},
    languages: {},
    name: 'CategoryName',
    visibleFrom: null,
    visibleTo: null,
    children: [],
    extraFilters: {},
    type: 'category',
    categoryId: 1,
    category: categoryFactory.build({ id: 1, path: '/path' }),
  }))
