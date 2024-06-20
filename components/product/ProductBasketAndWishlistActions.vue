<template>
  <div class="flex h-12">
    <ClientOnly>
      <template #fallback>
        <SFSkeletonLoader type="custom" class="size-full rounded-md" />
      </template>
      <SFButton
        data-test-id="add-item-to-basket-button"
        is-full-width
        type="primary"
        :disabled="product.isSoldOut"
        :title="product.isSoldOut ? $t('badge_labels.sold_out') : ''"
        :loading="basketIdle"
        class="text-sm !normal-case"
        @click="addItemToBasket()"
      >
        {{ $t('pdp.add_label') }}
      </SFButton>
    </ClientOnly>
    <ClientOnly>
      <template #fallback>
        <SFSkeletonLoader type="custom" class="ml-2 h-full w-14 rounded-md" />
      </template>
      <WishlistToggle
        class="ml-2 box-border h-full border border-gray-350 !px-2"
        :product="product"
      />
    </ClientOnly>
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
)
</script>
