<template>
  <AccountWrapper
    :title="$t('my_account.profile_menu')"
    is-account-page
    class="mb-6">
    <Headline
      class="mt-8 hidden md:block"
      :is-uppercase="false"
      size="xl"
      tag="h3">
      {{ $t('my_account.profile_menu') }}
    </Headline>
    <UserPersonalInfoForm />
    <UpdatePasswordForm />
  </AccountWrapper>
</template>

<script setup lang="ts">
await useUser()
</script>

<script lang="ts">
export default {
  name: 'UserAccountDetailsPage',
  meta: {
    pageType: 'account_area:userIndex',
  },
}
</script>
