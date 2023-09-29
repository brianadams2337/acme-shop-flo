<template>
  <SignInForm></SignInForm>
</template>

<script setup lang="ts">
import SignInForm from '~/components/SignInForm.vue'

definePageMeta({ pageType: 'signin_page' })
</script>

<script lang="ts">
export default {
  name: 'SigninPage',
}
</script>
