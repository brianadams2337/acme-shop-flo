<template>
  <div class="flex flex-col py-4 md:flex-row md:py-10">
    <details
      ref="details"
      class="group peer open:max-md:mb-4 md:w-1/2"
      :aria-details="id"
    >
      <summary class="list-none">
        <div
          class="flex w-full cursor-pointer gap-4 max-md:justify-between md:h-min md:flex-row-reverse md:justify-end"
        >
          {{ title }}
          <IconPlus class="size-6 text-black group-open:hidden" />
          <IconMinus class="hidden size-6 text-black group-open:block" />
        </div>
      </summary>
    </details>
    <div
      :id="id"
      ref="content"
      class="overflow-hidden text-md transition-all md:w-1/2"
      :style="dynamicHeight"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useId } from 'vue'
import { useEventListener } from '@vueuse/core'

defineProps<{ title: string }>()

const id = useId()
const open = ref(false)
const details = ref<HTMLDetailsElement>()
useEventListener(details, 'toggle', (event: ToggleEvent) => {
  open.value = event.newState === 'open'
})

const content = ref<HTMLDivElement>()
const dynamicHeight = computed(() =>
  open.value ? `height: ${content.value?.scrollHeight}px` : `height: 0px`,
)
</script>
