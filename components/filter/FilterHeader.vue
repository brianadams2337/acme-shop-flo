<template>
  <div class="flex w-full items-center justify-between">
    <SFHeadline size="xl" tag="p">{{ $t('filter.title') }}</SFHeadline>
    <SFButton
      type="ghost"
      size="xs"
      data-test-id="closeCross"
      @click="toggleItem"
    >
      <template #icon="{ _class }">
        <IconClose :class="_class" />
      </template>
    </SFButton>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{ toggleItem: () => void }>()
</script>
