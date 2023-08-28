<template>
  <div
    id="header"
    class="sticky top-0 z-50 bg-white"
    data-test-id="main-header">
    <div class="border-b border-gray-200">
      <div
        class="container flex h-[4.375rem] items-center justify-between gap-1 sm:gap-4">
        <div class="flex-1">
          <AppButton
            class="md:hidden"
            type="ghost"
            data-test-id="side-navigation-button"
            @click="toggleSideNavigation">
            <SvgoUiClose v-if="isSideNavigationOpen" class="h-6 w-6" />
            <SvgoUiBurger v-else class="h-6 w-6" />
          </AppButton>
        </div>
        <Logo class="ml-4 flex-initial" :width="138" :height="32" />
        <div class="flex flex-1 justify-end">
          <!-- <HeaderMainMenu v-if="!isCheckoutPage" /> -->
        </div>
      </div>
    </div>
    <HeaderSubNavigation
      v-if="!isCheckoutPage"
      v-bind="{ rootCategories, fetchingCategories }"
      :navigation-tree="navigationTrees[0]"
      @mouseenter:item="openFlyoutMenu"
      @mouseleave="closeFlyoutMenu"
      @mouseenter:navigation-item="openFlyoutMenuForNavigationTree" />
    <FlyoutMenu
      v-if="!isCheckoutPage"
      :is-open="isFlyoutMenuOpen"
      @mouseleave="closeFlyoutMenu">
      <!--- THE ID's ARE IMPORTANT TO NOT CLOSE FLYOUT WHILE FAST MOVING MOUSE TO ITEMS -->
      <div id="flyout-menu-items-container" class="flex space-x-20">
        <div
          id="flyout-menu-items-container-content"
          :key="flyoutMenuCategory.slug">
          <Headline size="sm" tag="p" type="loud" :is-uppercase="false">
            <DefaultLink
              :to="{ name: route.routes.home.name }"
              type="quiet"
              class="text-sm"
              @click="forceCloseFlyout">
              {{ flyoutMenuCategory.name }}
            </DefaultLink>
          </Headline>
          <TwoColumnList :items="childlessCategoryItems" class="mt-3">
            <template #item="{ item }">
              <DefaultLink
                :to="item.path"
                badge-placement="top"
                badge-size="sm"
                type="quieter"
                class="text-gray-750"
                @click="forceCloseFlyout">
                {{ item.name }}
              </DefaultLink>
            </template>
          </TwoColumnList>
        </div>
        <template v-for="category in flyoutMenuCategory.children">
          <div
            v-if="category.children?.length"
            :id="'flyout-menu-items-container-content-' + category.slug"
            :key="category.slug">
            <Headline size="sm" tag="p" type="loud" :is-uppercase="false">
              <DefaultLink
                :to="category.path"
                type="quiet"
                @click="forceCloseFlyout">
                {{ category.name }}
              </DefaultLink>
            </Headline>
            <TwoColumnList :items="category.children" class="mt-4">
              <template #item="{ item }">
                <DefaultLink
                  :to="item.path"
                  badge-placement="top"
                  badge-size="sm"
                  type="quieter"
                  @click="forceCloseFlyout">
                  {{ item.name }}
                </DefaultLink>
              </template>
            </TwoColumnList>
          </div>
        </template>

        <!-- navigation flyout -->

        <div
          id="flyout-menu-items-container-content"
          :key="flyoutNavigationItem.id">
          <Headline size="sm" tag="p" type="loud" :is-uppercase="false">
            <NavigationTreeItem
              type="quiet"
              class="text-sm"
              :navigation-item="flyoutNavigationItem"
              @click:navigation-item="closeFlyoutMenu" />
          </Headline>
          <TwoColumnList :items="childlessNavigationItems" class="mt-4">
            <template #item="{ item }">
              <NavigationTreeItem
                :navigation-item="item"
                type="quieter"
                class="text-gray-750"
                @click:navigation-item="closeFlyoutMenu" />
            </template>
          </TwoColumnList>
        </div>

        <template v-for="navigationItem in flyoutNavigationItem.children">
          <div
            v-if="navigationItem.children.length"
            :id="'flyout-menu-items-container-content-' + navigationItem.id"
            :key="navigationItem.id">
            <Headline size="sm" tag="p" type="loud" :is-uppercase="false">
              <NavigationTreeItem
                :navigation-item="navigationItem"
                @click:navigation-item="closeFlyoutMenu" />
            </Headline>
            <TwoColumnList :items="navigationItem.children" class="mt-4">
              <template #item="{ item }">
                <NavigationTreeItem
                  type="quieter"
                  :navigation-item="item"
                  @click:navigation-item="closeFlyoutMenu" />
              </template>
            </TwoColumnList>
          </div>
        </template>
      </div>
      <template #teaser>
        <slot name="flyout-teaser" />
      </template>
    </FlyoutMenu>
  </div>
</template>

<script setup lang="ts">
import {
  Category,
  NavigationTree,
  NavigationItems,
} from '@scayle/storefront-nuxt'

defineProps({
  rootCategories: {
    type: [Array, Object] as PropType<Category[] | Category>,
    default: () => [],
  },
  fetchingCategories: {
    type: Boolean,
    default: () => false,
  },
  navigationTrees: {
    type: Array as PropType<NavigationTree[]>,
    default: () => [],
  },
})

const {
  isFlyoutMenuOpen,
  closeFlyoutMenu,
  flyoutMenuCategory,
  isSideNavigationOpen,
  openFlyoutMenu,
  toggleSideNavigation,
  openFlyoutMenuForNavigationTree,
  flyoutNavigationItem,
} = useUiState()

const hasChildrenItems = (item: Category | NavigationItems[0]) =>
  item.children?.length === 0

const childlessCategoryItems = computed(() => {
  return flyoutMenuCategory.value.children.filter(hasChildrenItems)
})

const childlessNavigationItems = computed(() => {
  return flyoutNavigationItem.value.children.filter(hasChildrenItems)
})

const isCheckoutPage = computed(() => {
  return false
  // return isExactActiveRoute(route.value, $helpers.route.routes.checkout.path, {
  //     ignoreQuery: false,
  //   }),
})

const forceCloseFlyout = (event: MouseEvent) => closeFlyoutMenu(event, true)
</script>

<script lang="ts">
export default {
  name: 'AppHeader',
}
</script>
