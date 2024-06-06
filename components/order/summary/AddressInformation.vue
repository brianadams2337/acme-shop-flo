<template>
  <div>
    <p
      v-for="(formattedAddress, index) in getFormattedLocaleAddresses(address)"
      :key="index"
    >
      {{ formattedAddress }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { getFormattedLocaleAddresses } from '~/utils'

type Props = {
  address: OrderAddress
}

defineProps<Props>()
</script>
