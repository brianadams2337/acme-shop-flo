<template>
  <div
    v-if="item?.children?.length"
    class="flex h-80 w-full gap-x-14 border-t border-gray-200 bg-white px-20 py-10 drop-shadow-md"
  >
    <ul
      v-for="columnItem in item.children"
      :key="columnItem.id"
      class="flex flex-col space-y-2.5"
    >
      <li>
        <NavigationTreeItem
          :navigation-item="columnItem"
          class="mb-2.5 !font-semi-bold-variable"
          @click="$emit('close')"
        />

        <ul
          v-if="columnItem.children.length > 0"
          class="grid w-fit grid-flow-col grid-rows-7 flex-col flex-wrap gap-x-5 gap-y-2.5"
        >
          <li v-for="rowItem in columnItem.children" :key="rowItem.id">
            <NavigationTreeItem
              :navigation-item="rowItem"
              @click="$emit('close')"
            />
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { NavigationTreeItem as NavigationTreeItemType } from '@scayle/storefront-core'
import NavigationTreeItem from '~/components/NavigationTreeItem.vue'

defineEmits(['close'])
defineProps<{
  item: NavigationTreeItemType
}>()
</script>
