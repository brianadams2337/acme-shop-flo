<template>
  <div class="space-y-5 bg-white" role="listbox">
    <CategorySuggestionList
      v-if="categories.length"
      :category-suggestions="categories"
      @click:result="$emit('click:result', $event)"
    />
    <ProductSuggestionList
      v-if="products.length"
      :product-suggestions="products"
      @click:result="$emit('click:result', $event)"
    />
    <NavigationItemSuggestionList
      v-if="navigationItems.length"
      :search-term="searchTerm"
      :navigation-item-suggestions="navigationItems"
      @click:result="$emit('click:result', $event)"
    />
    <ShowAllResultsLink
      :search-term="searchTerm"
      role="option"
      @click="$emit('close')"
    />
  </div>
</template>

<script setup lang="ts">
import type {
  CategorySearchSuggestion,
  ProductSearchSuggestion,
  NavigationItemSuggestion as NavigationItemSuggestionType,
  SearchEntity,
} from '@scayle/storefront-core'
import ProductSuggestionList from './products/ProductSuggestionList.vue'
import NavigationItemSuggestionList from './navigationItem/NavigationItemSuggestionList.vue'
import CategorySuggestionList from './categories/CategorySuggestionList.vue'
import ShowAllResultsLink from './ShowAllResultsLink.vue'

type Props = {
  products: ProductSearchSuggestion[]
  categories: CategorySearchSuggestion[]
  navigationItems: NavigationItemSuggestionType[]
  searchTerm: string
}
defineProps<Props>()

defineEmits<{
  (e: 'click:result', value: SearchEntity): void
  (e: 'close'): void
}>()
</script>
