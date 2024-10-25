<template>
  <div ref="listboxRef" @keydown.esc="close">
    <slot :is-open="isOpen" :list="name" :close="close" :open="open" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useListbox } from '#storefront-ui'

type Props = {
  name: string
}

const props = defineProps<Props>()

const { isOpen, close, open } = useListbox(props.name)
const listboxRef = ref()

onClickOutside(listboxRef, () => {
  if (isOpen.value) {
    close()
  }
})
</script>
