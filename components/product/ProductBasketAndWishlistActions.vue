<template>
  <div class="flex h-12">
    <SFButton
      data-testid="add-item-to-basket-button"
      is-full-width
      :disabled="product.isSoldOut"
      :title="product.isSoldOut ? $t('badge_labels.sold_out') : ''"
      :loading="basketIdle"
      class="text-sm !normal-case"
      @click="addItemToBasket()"
    >
      {{ $t('pdp.add_label') }}
    </SFButton>
    <WishlistToggle
      class="ml-2 box-border h-full border border-gray-350 !px-2"
      :product="product"
    />
  </div>
</template>

<script setup lang="ts">
import { toRef } from 'vue'
import type { Product, Variant } from '@scayle/storefront-nuxt'
import { useProductDetailsBasketActions } from '~/composables'

const props = defineProps<{
  product: Product
  activeVariant: Variant | undefined
  quantity: number
}>()

const { addItemToBasket, basketIdle } = useProductDetailsBasketActions(
  toRef(() => props.product),
  toRef(() => props.activeVariant),
  toRef(() => props.quantity),
  toRef(() => props.product.id),
)
</script>
