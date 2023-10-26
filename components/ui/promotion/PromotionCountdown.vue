<template>
  <ClientOnly>
    <template #fallback>
      <SkeletonLoader class="h-6 !w-[8.875rem]" />
    </template>
    <FadeInTransition>
      <div class="inline-flex items-center rounded border p-[1px]">
        <IconClockOutline class="ml-1.5 h-5 w-5 text-white" />
        <Countdown :until="until" />
      </div>
    </FadeInTransition>
  </ClientOnly>
</template>

<script setup lang="ts">
defineProps({
  until: {
    type: String,
    required: true,
  },
})
</script>
