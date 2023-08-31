<template>
  <div class="relative w-64">
    <div class="p-3">
      <AppButton
        type="secondary"
        class="w-full"
        :to="{ name: route.routes.signin.name }"
        @click="closeUserFlyout">
        {{ $t('global.sign_in') }}
      </AppButton>
    </div>
    <div class="bg-secondary-450 flex h-10 items-center justify-center">
      <span class="text-secondary mr-1 text-xs">
        {{ $t('global.not_registered') }}
      </span>
      <AppButton
        type="ghost"
        :to="{ name: route.routes.signin.name }"
        class="text-xs font-semibold leading-5 !tracking-wide">
        {{ $t('global.register') }}
      </AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const { closeUserFlyout } = useUiState()
</script>
