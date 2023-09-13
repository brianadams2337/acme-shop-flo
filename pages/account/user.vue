<template>
  <AuthGuard>
    <div>User page</div>
  </AuthGuard>
</template>

<script lang="ts">
export default {
  name: 'UserAccountDetailsPage',
  meta: {
    pageType: 'account_area:userIndex',
  },
}
</script>
