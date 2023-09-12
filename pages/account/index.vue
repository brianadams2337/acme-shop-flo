<template>
  <AuthGuard>
    <div>Account area</div>
  </AuthGuard>
</template>

<script lang="ts">
export default {
  name: 'AccountOverview',
  meta: {
    pageType: 'account_area',
  },
}
</script>
