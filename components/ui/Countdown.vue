<template>
  <div class="flex pl-1.5 text-xs">
    <div
      v-for="(value, key) in countdown"
      :key="key"
      class="flex text-center font-semibold"
    >
      <span v-if="value !== undefined" class="min-w-4">
        {{ formatValue(value) }}
      </span>
      <span class="mx-1">
        <template v-if="showUnits">{{ $t(`global.${key}`) }}</template>
        <template v-else-if="!isSeconds(key)">:</template>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
type CountdownUnit = 'days' | 'hours' | 'minutes' | 'seconds'

type Props = {
  until: string
  showUnits?: boolean
}

const props = withDefaults(defineProps<Props>(), { showUnits: false })

const emit = defineEmits(['finished'])

const until = computed(() => Date.parse(props.until))
const countdown = ref<{ [k in CountdownUnit]?: number }>({})

const formatValue = (value: number) => {
  return value <= 9 && value >= 0 ? `0${value}` : value
}

const isSeconds = (key: string) => key === useLast(Object.keys(countdown.value))

const start = () => {
  const remaining = until.value - Date.now()

  countdown.value = {
    days: Math.floor(remaining / (1000 * 60 * 60 * 24)),
    hours: Math.floor((remaining / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((remaining / 1000 / 60) % 60),
    seconds: Math.floor((remaining / 1000) % 60),
  }

  if (remaining <= 0) {
    emit('finished')
  }
}

useIntervalFn(start, 1000, { immediateCallback: true })

defineOptions({ name: 'AppCountdown' })
</script>
