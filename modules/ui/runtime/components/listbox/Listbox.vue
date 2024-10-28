<template>
  <div ref="listbox">
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
import { useTemplateRef } from 'vue'
import { useListbox, useDropdownKeyboardBehavior } from '#storefront-ui'

type Props = {
  name: string
}

const props = defineProps<Props>()

const { isOpen, close, open } = useListbox(props.name)

const rootRef = useTemplateRef('listbox')
const buttonRef = useTemplateRef('button')
const optionsRef = useTemplateRef('options')

useDropdownKeyboardBehavior(
  { rootRef, buttonRef, optionsRef },
  { isOpen, close, open },
)
</script>
