<template>
  <IDPCallback v-if="idpCode" :code="idpCode" />
</template>

<script setup lang="ts">
import { isString as _isString } from 'radash'

const route = useRoute()

const idpCode = computed(() => {
  const code = route.query.code
  return _isString(code) ? code : undefined
})

defineOptions({ name: 'CallbackPage' })
</script>
