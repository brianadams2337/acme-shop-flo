<template>
  <div class="flex flex-wrap">
    <SFLocalizedLink
      v-for="sort in sortLinks"
      :key="sort.key"
      :to="sort.to"
      raw
      class="mb-2 mr-2 flex h-10 w-fit items-center justify-center whitespace-pre rounded-full border-2 border-transparent bg-gray-100 px-4 text-md font-semibold text-secondary transition-none"
      :class="{
        '!border-accent bg-white !text-accent': sort.key === selectedSort?.key,
      }"
      @click="trackFilterApply('sort', sort.key)"
    >
      {{ $t(sort.label) }}
    </SFLocalizedLink>
  </div>
</template>

<script setup lang="ts">
import SFLocalizedLink from '../SFLocalizedLink.vue'
import { useTrackingEvents } from '~/composables'
import { useProductListSort } from '#storefront-product-listing'
import { useRoute } from '#app/composables/router'

const { selectedSort, sortLinks } = useProductListSort(useRoute())
const { trackFilterApply } = useTrackingEvents()
</script>
