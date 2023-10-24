<template>
  <div class="rounded border p-1">
    <!-- <IconClock /> -->
    <Countdown :until="until" />
  </div>
</template>

<script setup lang="ts">
defineProps({
  until: {
    type: String,
    required: true,
  },
})
</script>
