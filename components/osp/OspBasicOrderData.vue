<template>
  <div>
    <Headline size="sm" tag="h2" type="loud" class="mb-3">
      {{ $t('osp.order_data') }}
    </Headline>
    <p>
      <b>{{ $t('osp.order_date') }}:</b>
      {{ orderConfirmedAt }}
    </p>
    <p>
      <b>{{ $t('osp.order_nr') }}:</b> {{ id }}
    </p>
    <p v-if="customer">
      <b>{{ $t('osp.customer_id') }}:</b>
      {{ customer.id }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { Order } from '~/types/osp'

const props = defineProps({
  id: {
    type: Number as PropType<Order['id']>,
    required: true,
  },
  customer: {
    type: Object as PropType<Order['customer']>,
    required: true,
  },
  confirmedAt: {
    type: String as PropType<Order['confirmedAt']>,
    default: undefined,
  },
})

const currentShop = useCurrentShop()

const orderConfirmedAt = computed(() => {
  const locale = currentShop.value?.locale?.replace('_', '-')
  return props.confirmedAt
    ? new Date(props.confirmedAt).toLocaleDateString(locale)
    : null
})
</script>
