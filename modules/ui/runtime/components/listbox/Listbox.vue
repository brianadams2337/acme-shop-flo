<template>
  <div ref="listbox" @keydown="keydown">
    <div ref="button" class="contents">
      <slot :is-open="isOpen" :list="name" :close="close" :open="open" />
    </div>
    <div ref="options" class="relative">
      <Transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <slot
          v-if="isOpen"
          name="options"
          :is-open="isOpen"
          :list="name"
          :close="close"
          :open="open"
        />
      </Transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, useTemplateRef, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { tabbable } from 'tabbable'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import { useListbox } from '#storefront-ui'

type Props = {
  name: string
}

const props = defineProps<Props>()

const { isOpen, close, open } = useListbox(props.name)

const listboxRef = useTemplateRef('listbox')
const buttonRef = useTemplateRef('button')
const optionsRef = useTemplateRef('options')

onClickOutside(listboxRef, () => {
  if (isOpen.value) {
    close()
  }
})

const { activate, deactivate } = useFocusTrap(optionsRef, {
  immediate: isOpen.value,
  isKeyBackward: (keyEvent) =>
    keyEvent.code === 'ArrowLeft' || keyEvent.code === 'ArrowUp',
  isKeyForward: (keyEvent) =>
    keyEvent.code === 'ArrowRight' || keyEvent.code === 'ArrowDown',
  allowOutsideClick: true,
})

watch(isOpen, async (open) => {
  await nextTick()
  if (open) {
    activate()
  } else {
    deactivate()
  }
})

// Focus the element that is next or previous to the button ref
const tabOut = (direction: 'next' | 'previous' | undefined) => {
  setTimeout(() => {
    const button = buttonRef.value?.querySelector('button')
    if (!button) {
      return
    }

    const tabbables = tabbable(document.body).filter(
      (el) => el === button || !listboxRef.value?.contains(el),
    )
    const index = tabbables.indexOf(button)

    if (direction === undefined || index === -1) {
      button.focus()
    } else if (direction === 'next' && tabbables[index + 1]) {
      tabbables[index + 1].focus()
    } else if (direction === 'previous' && tabbables[index - 1]) {
      tabbables[index - 1].focus()
    }
  }, 0)
}

const ARROW_KEYS = new Set(['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'])
const keydown = (event: KeyboardEvent) => {
  // Prevent scrolling the page on arrow keys
  if (ARROW_KEYS.has(event.code)) {
    event.preventDefault()
    return
  }

  // Close on escape press
  if (event.code === 'Escape') {
    close()
    return
  }

  // On tab, prevent the default behavior of tabbing to the next/previous menu item
  // Instead we close and tab to the next/previous of the button
  if (event.code === 'Tab' && isOpen) {
    event.preventDefault()
    deactivate()
    close()
    tabOut(event.shiftKey ? 'previous' : 'next')
  }
}
</script>
