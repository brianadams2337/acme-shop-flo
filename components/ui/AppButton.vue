<template>
  <component
    :is="component"
    v-bind="{ to, disabled }"
    class="group inline-flex items-center justify-center gap-2 truncate whitespace-nowrap rounded-md text-sm transition duration-100 ease-linear disabled:cursor-not-allowed disabled:opacity-30"
    :class="{
      'p-3': !noPadding && isSize('md'),
      'px-3 py-1': !noPadding && isSize('sm'),
      'px-0 text-primary-400 hover:text-primary': isGhost,
      'border border-primary bg-primary font-semibold text-white hover:bg-primary-400':
        isPrimary,
      'border bg-secondary-450 font-semibold text-primary hover:bg-secondary-600 hover:text-primary-400':
        isSecondary,
      'border border-gray-400 bg-transparent font-semibold text-primary hover:bg-secondary-300 hover:text-primary-400':
        isTertiary,
      'w-full': isFullWidth,
      'animate-pulse cursor-not-allowed': loading,
      '!rounded': rounded,
    }"
    @click.prevent="emit('click')"
    @click.stop="emit('click:stop')">
    <slot
      name="icon"
      :_class="[
        {
          'w-8 h-8': isSize('md'),
          'w-5 h-5': isSize('sm'),
          'w-4 h-4': isSize('xs'),
          'group-hover:animate-ping-small': animateIcon,
        },
        textColorClasses,
      ]" />

    <slot />
    <slot name="badge" :badge="badge">
      <transition
        enter-to-class="opacity-100"
        enter-active-class="transition ease-linear duration-200"
        leave-active-class="transition ease-linear duration-200"
        leave-to-class="opacity-0">
        <span v-show="badge" :class="textColorClasses"> ({{ badge }}) </span>
      </transition>
    </slot>
  </component>
</template>

<script setup lang="ts">
import { Size } from '~/constants/ui'

const props = defineProps({
  type: {
    type: String as PropType<'primary' | 'secondary' | 'tertiary' | 'ghost'>,
    default: 'primary',
    validator: (val: string) =>
      ['primary', 'secondary', 'tertiary', 'ghost'].includes(val),
  },
  noPadding: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  animateIcon: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  isFullWidth: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  loading: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  badge: {
    type: Number as PropType<number>,
    default: 0,
  },
  to: {
    type: [String, Object] as PropType<string | object>,
    default: undefined,
  },
  rounded: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  size: {
    type: String as PropType<Size>,
    default: Size.MD,
    validator: (val: Size) => Object.values(Size).includes(val),
  },
})

const isPrimary = computed(() => props.type === 'primary')
const isSecondary = computed(() => props.type === 'secondary')
const isTertiary = computed(() => props.type === 'tertiary')
const isGhost = computed(() => props.type === 'ghost')

const { isSize } = useUiSize(props.size)

const textColorClasses = computed(() => ({
  'text-white': isPrimary.value,
  'text-primary-100': isSecondary.value,
  'text-primary': isTertiary.value || isGhost.value,
}))

const component = computed(() => (props.to ? 'NuxtLink' : 'Button'))

const emit = defineEmits<{
  (e: 'click'): void
  (e: 'click:stop'): void
}>()
</script>
