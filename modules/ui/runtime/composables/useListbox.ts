import { useState } from '#app/composables/state'

export function useListbox(name: string) {
  const isOpen = useState<boolean>(`${name}-open`, () => false)

  const toggle = () => {
    isOpen.value = !isOpen.value
  }

  const close = () => {
    isOpen.value = false
  }

  const open = () => {
    isOpen.value = true
  }

  return { isOpen, toggle, close, open }
}
