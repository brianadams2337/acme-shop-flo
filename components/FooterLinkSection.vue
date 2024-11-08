<template>
  <div class="flex flex-col gap-5">
    <div
      class="cursor-pointer items-center p-1 text-lg font-semibold text-gray-900 md:cursor-default md:text-sm"
      :class="horizontal ? 'hidden md:flex' : 'flex'"
      @click="expanded = !expanded"
    >
      <h2>{{ section.name }}</h2>
      <div class="ml-auto flex md:hidden">
        <IconPlus v-if="!expanded" class="size-6 text-black" />
        <IconMinus v-else class="size-6 text-black" />
      </div>
    </div>
    <ul
      ref="content"
      class="gap-x-2 gap-y-5 transition-all md:flex"
      :class="{
        'flex-col': !horizontal,
        'flex-row': horizontal,
        flex: expanded || horizontal,
        hidden: !expanded && !horizontal,
      }"
    >
      <li v-for="item in section.children" :key="item.id">
        <NavigationTreeItem
          :navigation-item="item"
          raw
          class="rounded-md p-1 text-gray-600 hover:bg-gray-100"
        />
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { NavigationItems } from '@scayle/storefront-nuxt'
import NavigationTreeItem from '~/components/NavigationTreeItem.vue'

const { horizontal = false } = defineProps<{
  section: NavigationItems[0]
  horizontal: boolean
}>()

const expanded = ref(false)
</script>
