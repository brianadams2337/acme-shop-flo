<template>
  <div class="min-h-[9.25rem] max-md:pl-2 md:min-h-[6.375rem]">
    <div class="relative w-full overflow-hidden md:h-[5.375rem]">
      <div
        class="mt-2 block transition-all delay-0 duration-200 ease-in transition-discrete group-hover/product-card:block group-hover/product-card:translate-y-0 group-hover/product-card:opacity-100 group-hover/product-card:delay-100 group-hover/product-card:starting:translate-y-4 group-hover/product-card:starting:opacity-0 md:mt-3 md:hidden md:translate-y-4 md:opacity-0"
      >
        <ProductCardSiblingsPicker
          :product="product"
          :siblings="siblings"
          :limit="2"
        />
      </div>
      <ProductCardDescription
        class="mt-3 block opacity-100 transition-all delay-100 duration-200 ease-in transition-discrete group-hover/product-card:hidden group-hover/product-card:opacity-0 group-hover/product-card:delay-0 loaded:starting:opacity-0 max-md:mb-6 md:absolute md:inset-0 md:mt-5"
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
