<template>
  <div v-if="isLoggedIn">
    <slot />
  </div>
  <div v-else>
    <NuxtPage name="signin" />
  </div>
</template>

<script setup lang="ts">
const { isLoggedIn } = await useUser()
</script>
