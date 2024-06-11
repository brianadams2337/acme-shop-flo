<template>
  <div></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthentication } from '~/composables'

const props = defineProps<{
  code: string
}>()

const { loginIDP } = useAuthentication('login')

onMounted(async () => {
  await loginIDP(props.code)
})
</script>
