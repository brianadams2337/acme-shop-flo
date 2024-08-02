<template>
  <div class="w-full space-y-6">
    <SFSkeletonLoader />
    <SFSkeletonLoader v-for="i in formElementCount" :key="i" full-width />
    <div class="flex w-full justify-center pt-4">
      <SFSkeletonLoader />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  formElementCount: number
}>()
</script>
