<template>
  <AuthGuard>
    <div>Order history page</div>
  </AuthGuard>
</template>

<script lang="ts">
export default {
  name: 'OrderHistoryPage',
  meta: {
    pageType: 'account_area:OId',
  },
}
</script>
