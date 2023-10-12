import {
  Category,
  NavigationItems,
  NavigationItemExternal,
} from '@scayle/storefront-nuxt'

export type FlyoutMenuCategory = {
  name: string
  path: string
  slug: string
  id: number
  children: Category[]
}

type NavigationItem = NavigationItems[0]

type FlyoutsState = Record<
  'flyoutMenuOpen' | 'searchFlyout' | 'basketFlyout' | 'userFlyout',
  boolean
> & {
  flyoutMenuCategory: FlyoutMenuCategory
  flyoutNavigationItem: NavigationItem
}

const DEFAULT_FLYOUT_NAVIGATION_ITEM: NavigationItemExternal = {
  id: 1,
  children: [],
  name: '',
  type: 'external',
  assets: {},
  languages: {},
  visibleFrom: null,
  visibleTo: null,
  options: {
    url: '',
    isOpenInNewWindows: false,
  },
}

const DEFAULT_FLYOUT_CATEGORY: FlyoutMenuCategory = {
  id: 1,
  name: '',
  path: '',
  slug: '',
  children: [],
}

const state = reactive<FlyoutsState>({
  flyoutMenuOpen: false,
  flyoutMenuCategory: DEFAULT_FLYOUT_CATEGORY,
  flyoutNavigationItem: DEFAULT_FLYOUT_NAVIGATION_ITEM,
  searchFlyout: false,
  basketFlyout: false,
  userFlyout: false,
})

export default () => {
  const isFlyoutMenuOpen = computed(() => state.flyoutMenuOpen)
  const flyoutMenuCategory = computed(() => state.flyoutMenuCategory)
  const flyoutNavigationItem = computed(() => state.flyoutNavigationItem)
  const isBasketFlyoutOpen = computed(() => state.basketFlyout)
  const isUserFlyoutOpen = computed(() => state.userFlyout)
  const isSearchFlyoutOpen = computed(() => state.searchFlyout)

  let closeFlyoutTimeout: NodeJS.Timeout

  const closeFlyoutMenu = (event: MouseEvent, force = false) => {
    const relatedTarget = event.relatedTarget as Element
    const shouldClose =
      ![
        'flyout-menu',
        'flyout-menu-items-container',
        'flyout-overscroll-container',
        'flyout-menu-items-container-content',
      ].includes(relatedTarget?.id) || force

    if (!shouldClose) {
      return
    }

    closeFlyoutTimeout = setTimeout(() => {
      state.flyoutMenuOpen = false
      state.flyoutMenuCategory = DEFAULT_FLYOUT_CATEGORY
      state.flyoutNavigationItem = DEFAULT_FLYOUT_NAVIGATION_ITEM
    }, 200)
  }
  const openFlyoutMenu = ({ children, name, path, slug, id }: Category) => {
    if (children?.length === 0) {
      state.flyoutMenuOpen = false
      return
    }
    if (closeFlyoutTimeout) {
      clearTimeout(closeFlyoutTimeout)
    }

    state.flyoutMenuOpen = true
    state.flyoutMenuCategory = {
      name,
      path,
      slug,
      id,
      children: children || [],
    }
    state.flyoutNavigationItem = DEFAULT_FLYOUT_NAVIGATION_ITEM
  }

  const openFlyoutMenuForNavigationTree = (item: NavigationItem) => {
    state.flyoutNavigationItem = item
    state.flyoutMenuCategory = DEFAULT_FLYOUT_CATEGORY
    state.flyoutMenuOpen = true
  }

  const openSearchFlyout = () => {
    state.searchFlyout = true
  }

  const closeSearchFlyout = () => {
    state.searchFlyout = false
  }

  const openBasketFlyout = () => {
    state.basketFlyout = true
  }

  const closeBasketFlyout = () => {
    state.basketFlyout = false
  }

  const openUserFlyout = () => {
    state.userFlyout = true
  }

  const closeUserFlyout = () => {
    state.userFlyout = false
  }

  return {
    isFlyoutMenuOpen,
    flyoutMenuCategory,
    flyoutNavigationItem,
    closeFlyoutMenu,
    openFlyoutMenu,
    isSearchFlyoutOpen,
    closeSearchFlyout,
    openSearchFlyout,
    isBasketFlyoutOpen,
    isUserFlyoutOpen,
    openBasketFlyout,
    closeBasketFlyout,
    openUserFlyout,
    closeUserFlyout,
    openFlyoutMenuForNavigationTree,
  }
}
