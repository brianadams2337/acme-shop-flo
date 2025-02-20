<template>
  <div class="contents">
    <SFOspDetailBox
      :title="
        isSingleAddress
          ? $t('osp.delivery_and_billing_address')
          : $t('osp.delivery_address')
      "
      :class="{ 'col-span-full': isSingleAddress }"
    >
      <p
        v-for="(formattedAddress, index) in getFormattedLocaleAddresses(
          address.shipping,
        )"
        :key="`${formattedAddress}-${index}`"
        class="text-gray-600"
      >
        {{ formattedAddress }}
      </p>
    </SFOspDetailBox>
    <SFOspDetailBox
      v-if="address.billing && !isSingleAddress"
      :title="$t('osp.billing_address')"
    >
      <p
        v-for="(formattedAddress, index) in getFormattedLocaleAddresses(
          address.billing,
        )"
        :key="`${formattedAddress}-${index}`"
        class="text-gray-600"
      >
        {{ formattedAddress }}
      </p>
    </SFOspDetailBox>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import SFOspDetailBox from './SFOspDetailBox.vue'
import { getFormattedLocaleAddresses } from '~/utils'
import type { OrderAddress } from '~/types/order'

const { address } = defineProps<{
  address: { shipping: OrderAddress; billing?: OrderAddress }
}>()

const isSingleAddress = computed(() => {
  return !address.billing || address.billing.id === address.shipping.id
})
</script>
