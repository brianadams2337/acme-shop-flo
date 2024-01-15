<template>
  <Transition
    :style="{ 'transition-duration': `${duration}ms` }"
    enter-from-class="-translate-x-full"
    enter-to-class="translate-x-0"
    enter-active-class="transform transition ease-in-out"
    leave-from-class="translate-x-0"
    leave-to-class="-translate-x-full"
    leave-active-class="transform transition ease-in-out"
  >
    <slot />
  </Transition>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ duration?: number }>(), { duration: 500 })
</script>
