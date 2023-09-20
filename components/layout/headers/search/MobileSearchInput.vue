<template>
  <div class="relative w-full">
    <label class="relative flex w-full items-center">
      <span class="absolute left-3 top-[50%] flex translate-y-[-50%]">
        <IconSearch class="h-5 w-5" />
      </span>
      <input
        id="search"
        ref="inputRef"
        v-model="content"
        autocomplete="off"
        data-test-id="search-input"
        class="w-full appearance-none rounded border border-transparent bg-gray-100 px-2 pl-10 text-sm outline-0 ring-0 transition-colors duration-200 ease-linear placeholder:text-gray-800 focus:border-black focus:bg-white focus:outline-none focus:ring-0 md:border-none"
        :placeholder="$t('search.placeholder')"
        type="search"
        @focus="emit('focus')"
        @blur="!content.length ? emit('cancel') : emit('blur')"
        @keydown.exact.enter="emit('keydown:enter')" />
    </label>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  value: {
    type: String,
    default: '',
  },
})

const emit = defineEmits<{
  (e: 'input', value: string): void
  (e: 'cancel'): void
  (e: 'focus'): void
  (e: 'blur'): void
  (e: 'keydown:enter'): void
}>()

const content = computed({
  get: () => props.value,
  set: (newValue: string) => emit('input', newValue),
})
</script>
