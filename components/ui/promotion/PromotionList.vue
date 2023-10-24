<template>
  <FadeInFromBottomTransition :duration="500">
    <div
      v-if="isShown"
      class="absolute top-[3.25rem] z-60 h-full w-full bg-black/40">
      <div ref="promotionListRef" class="relative bg-black p-5 text-white">
        <div class="flex w-full items-start justify-center overflow-x-scroll">
          <PromotionItem
            v-for="item in items"
            :key="item.id"
            v-bind="item"
            class="mr-4" />
        </div>
        <AppButton
          type="raw"
          size="xs"
          fab
          no-padding
          class="absolute -bottom-3 right-[50%] z-[200] bg-black !p-1"
          @click="close">
          <template #icon="{ _class }">
            <IconCloseBold :class="_class" class="text-white" />
          </template>
        </AppButton>
      </div>
    </div>
  </FadeInFromBottomTransition>
</template>

<script setup lang="ts">
import { Promotion } from '@scayle/storefront-nuxt'

defineProps({
  isShown: {
    type: Boolean,
    required: true,
  },
  items: {
    type: Array as PropType<Promotion[]>,
    required: true,
  },
})

const emit = defineEmits(['close'])

const close = () => emit('close')

const promotionListRef = ref()
onClickOutside(promotionListRef, close)
</script>
