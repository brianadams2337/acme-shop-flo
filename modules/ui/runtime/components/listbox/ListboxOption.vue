<template>
  <li
    role="menuitem"
    tabindex="-1"
    @click.capture="handleClick"
    @keydown.enter="handleClick"
  >
    <slot />
  </li>
</template>

<script setup lang="ts" generic="T extends { disabled?: boolean }">
import { useListbox } from '#storefront-ui'

type Props = {
  listName: string
  value?: T
}
const props = withDefaults(defineProps<Props>(), { value: undefined })

const { toggle } = useListbox(props.listName)

const handleClick = () => {
  if (!props.value || ('disabled' in props.value && props.value?.disabled)) {
    return
  }
  toggle()
}
</script>
