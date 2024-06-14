<template>
  <div v-if="fetching" class="mt-8">
    <SideNavigationSkeleton
      v-for="index in 5"
      :key="`category-loading-${index}`"
      :index="index"
    />
  </div>
  <div v-else class="mr-4 overflow-auto" :class="{ 'animate-pulse': fetching }">
    <ul v-if="categories?.length" class="my-4 md:mt-0">
      <li
        v-for="category in categories"
        :key="`side_navigation_list_item_${category.id}`"
        class="mb-3 ml-0 px-5 last:mb-0 md:ml-3 md:px-12"
        :class="{ 'text-pink-neon': category.path === '/sale' }"
      >
        <details v-if="category.children?.length">
          <summary>
            <SFLink
              class="text-base"
              :to="category.path"
              @click="emit('click:navigationItem')"
            >
              {{ category.name }}
            </SFLink>
          </summary>
          <ul class="my-4">
            <li
              v-for="child in category.children"
              :key="`side_navigation_list_item_mb_${child.id}`"
              class="mb-3 ml-0 px-5 last:mb-0"
              @click="emit('click:navigationItem')"
            >
              <SFLink :to="child.path" @click="emit('click:navigationItem')">
                {{ child.name }}</SFLink
              >
            </li>
          </ul>
        </details>
        <SFLink
          v-else
          class="text-base"
          :to="category.path"
          @click="emit('click:navigationItem')"
        >
          {{ category.name }}
        </SFLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Category } from '@scayle/storefront-nuxt'

type Props = {
  categories?: Category[]
  fetching: boolean
}

withDefaults(defineProps<Props>(), {
  categories: () => [],
})

const emit = defineEmits<{ (e: 'click:navigationItem'): void }>()
</script>
