<template>
  <div>
    <Headline size="sm" tag="h2" is-uppercase class="mb-3">
      {{ $t('osp.deliver_address') }}
    </Headline>
    <p
      v-for="(formattedAddress, index) in getFormattedLocaleAddresses(address)"
      :key="index"
    >
      {{ formattedAddress }}
    </p>
  </div>
</template>

<script setup lang="ts">
type Props = {
  address: OrderAddress
}

defineProps<Props>()
</script>
