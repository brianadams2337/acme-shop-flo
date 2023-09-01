<template>
  <div :test="r">
    <slot />
  </div>
</template>

<script setup lang="ts">
const r = ref('a')
console.log(r.value)
</script>
