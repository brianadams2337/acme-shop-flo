<template>
  <SearchResultItem :to="to" @click="emit('click:result', categorySuggestion)">
    <div class="flex space-x-2 text-gray-600">
      <template v-for="({ value }, index) in breadcrumbs" :key="value">
        <span
          :class="{
            'min-w-[3ch] truncate': index > 0,
            'shrink-0': index === 0,
          }"
        >
          {{ value }}
        </span>
        <span v-if="index < breadcrumbs.length">|</span>
      </template>
      <span class="shrink-0 font-semi-bold-variable">
        {{ category.categorySuggestion.category.name }}
      </span>
    </div>
    <div v-if="filters.length" class="flex flex-wrap gap-2">
      <div
        v-for="label in filters"
        :key="label"
        class="flex h-5 items-center rounded-md bg-gray-200 p-1 text-2xs leading-none text-gray-600"
      >
        {{ label }}
      </div>
    </div>
  </SearchResultItem>
</template>

<script setup lang="ts">
import type { CategorySearchSuggestion } from '@scayle/storefront-core'
import { computed } from 'vue'
import SearchResultItem from '../SearchResultItem.vue'
import { useBreadcrumbs, useRouteHelpers } from '~/composables'
import { getSearchFilterLabels } from '~/utils'

type Props = {
  categorySuggestion: CategorySearchSuggestion
}
const { categorySuggestion: category } = defineProps<Props>()
const emit = defineEmits<{
  (e: 'click:result', suggestion: CategorySearchSuggestion): void
}>()

const filters = computed(() => {
  return getSearchFilterLabels(category.categorySuggestion.filters)
})

const { buildCategorySuggestionRoute } = useRouteHelpers()
const to = computed(() => buildCategorySuggestionRoute(category))

const { getBreadcrumbsFromCategory } = useBreadcrumbs()
const breadcrumbs = getBreadcrumbsFromCategory(
  category.categorySuggestion.category,
)
</script>
