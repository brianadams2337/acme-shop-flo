<template>
  <div class="min-h-[9.25rem] max-md:pl-2 md:min-h-[6.375rem]">
    <div class="w-full overflow-hidden md:h-[5.375rem]">
      <div
        class="mt-2 block md:mt-3 md:hidden md:group-hover/product-card:block"
      >
        <ProductCardSiblingsPicker
          :product="product"
          :siblings="siblings"
          :limit="2"
          class="max-md:hidden"
        />
        <ProductCardSiblingsSlider
          :product="product"
          :siblings="siblings"
          class="md:hidden"
        />
      </div>
      <ProductCardDescription
        class="mt-3 block max-md:mb-6 md:mt-5 md:group-hover/product-card:hidden"
        :name="name"
        :brand="brand"
      />
    </div>
    <ProductPrice
      v-if="price"
      :price="price"
      :lowest-prior-price="lowestPriorPrice"
      :product="product"
      show-price-reduction-badge
      show-price-from
      class="absolute bottom-0 left-2 md:left-0"
    />
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@scayle/storefront-nuxt'
import { useProductBaseInfo } from '~/composables'

const props = defineProps<{
  product: Product
}>()

const {
  brand,
  name,
  price,
  lowestPriorPrice,
  nonSoldOutSiblings: siblings,
} = useProductBaseInfo(props.product)
</script>
