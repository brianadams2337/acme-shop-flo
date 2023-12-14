<template>
  <div
    ref="promotionListRef"
    class="fixed right-0 top-[3.25rem] z-60 hidden w-full lg:block"
  >
    <div class="relative bg-primary p-5 text-white">
      <div
        class="flex w-full items-start justify-center overflow-x-scroll scrollbar-hide"
      >
        <PromotionItem
          v-for="item in items"
          :key="item.id"
          v-bind="item"
          class="mr-4"
        />
      </div>
      <ClosePromotionListButton />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MaybeElementRef } from '@vueuse/core'

defineProps<{ items: Promotion[] }>()

const promotionListRef = ref()

const viewport = useViewport()

const { togglePromotionList: toggle, topBannerRef } = usePromotionActions()

onClickOutside(
  promotionListRef,
  () => viewport.isGreaterOrEquals('lg') && toggle(),
  { ignore: [topBannerRef as MaybeElementRef] },
)
</script>
