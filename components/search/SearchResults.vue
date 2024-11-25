<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="space-y-5 bg-white" role="listbox">
    <CategorySuggestionList
      v-if="categories.length"
      :category-suggestions="categories"
      @click:result="emit('click:result', $event)"
    />
    <ProductSuggestionList
      v-if="products.length"
      :product-suggestions="products"
      @click:result="emit('click:result', $event)"
    />
    <NavigationItemSuggestionList
      v-if="navigationItems.length"
      :search-term="searchTerm"
      :navigation-item-suggestions="navigationItems"
      @click:result="emit('click:result', $event)"
    />
    <LocalizedLink
      role="option"
      data-testid="display-all-results"
      :to="getSearchRoute(searchTerm)"
      :aria-label="showMoreAriaLabel"
      class="rounded transition-all duration-150 hover:right-1 hover:bg-gray-100 hover:px-1.5 focus:bg-gray-100 focus:px-1.5"
      @click="emit('close')"
    >
      <span
        class="text-md font-normal leading-5 text-gray-600 max-lg:py-3 lg:text-sm"
        v-html="showMoreLabel"
      />
    </LocalizedLink>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import DOMpurify from 'dompurify'
import type {
  CategorySearchSuggestion,
  ProductSearchSuggestion,
  NavigationItemSuggestion as NavigationItemSuggestionType,
  SearchEntity,
} from '@scayle/storefront-core'
import ProductSuggestionList from './products/ProductSuggestionList.vue'
import NavigationItemSuggestionList from './navigationItem/NavigationItemSuggestionList.vue'
import CategorySuggestionList from './categories/CategorySuggestionList.vue'
import LocalizedLink from '~/components/LocalizedLink.vue'
import { useRouteHelpers } from '~/composables'

type Props = {
  products: ProductSearchSuggestion[]
  categories: CategorySearchSuggestion[]
  navigationItems: NavigationItemSuggestionType[]
  searchTerm: string
}
const { searchTerm } = defineProps<Props>()

const { getSearchRoute } = useRouteHelpers()

const emit = defineEmits<{
  (e: 'click:result', value: SearchEntity): void
  (e: 'close'): void
}>()

const { t } = useI18n()
const showMoreLabel = computed(() => {
  const regex = new RegExp(searchTerm.replaceAll(' ', '|'), 'gi')
  return DOMpurify.sanitize(
    t('search.search_results', { searchTerm }).replace(
      regex,
      '<span class="font-semibold">$&</span>',
    ),
    {
      ALLOWED_TAGS: ['span'],
    },
  )
})
const showMoreAriaLabel = computed(() => {
  return DOMpurify.sanitize(t('search.search_results', { searchTerm }))
})
</script>
