<template>
  <ul id="scayle-listbox-options" ref="target" role="menu" @keydown="keydown">
    <slot />
  </ul>
</template>
<script setup lang="ts">
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import { ref } from 'vue'

const target = ref()
const { deactivate } = useFocusTrap(target, {
  immediate: true,
  isKeyBackward: (keyEvent) =>
    keyEvent.code === 'ArrowLeft' || keyEvent.code === 'ArrowUp',
  isKeyForward: (keyEvent) =>
    keyEvent.code === 'ArrowRight' || keyEvent.code === 'ArrowDown',
  allowOutsideClick: true,
})

const emit = defineEmits<{
  (e: 'close', direction?: 'next' | 'previous'): void
}>()

const ARROW_KEYS = new Set(['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'])
const keydown = (event: KeyboardEvent) => {
  // Prevent scrolling the page on arrow keys
  if (ARROW_KEYS.has(event.code)) {
    event.preventDefault()
    return
  }
  // On tab, prevent the default behavior of tabbing to the next/previous menu item
  // Instead we emit the close event and tab to the next/previous of the button
  if (event.code === 'Tab') {
    event.preventDefault()
    deactivate()
    emit('close', event.shiftKey ? 'previous' : 'next')
  }
}
</script>
