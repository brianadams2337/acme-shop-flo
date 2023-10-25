<template>
  <Transition
    v-bind="activeClasses"
    :appear="appear"
    enter-from-class="-translate-y-full"
    enter-to-class="translate-y-0"
    leave-from-class="translate-y-0"
    leave-to-class="-translate-y-full">
    <slot />
  </Transition>
</template>

<script setup lang="ts">
const props = defineProps({
  appear: {
    type: Boolean,
    default: false,
  },
  duration: {
    type: Number,
    default: 500,
  },
})

const activeClasses = computed(() => ({
  enterActiveClass: `transform transition duration-${props.duration} ease-in-out`,
  leaveActiveClass: `transform transition duration-${props.duration} ease-in-out`,
}))
</script>
