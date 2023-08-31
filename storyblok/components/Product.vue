<template>
  <div class="grid grid-cols-8">
    <ProductCard :id="product.id" class="col-span-full">
      <template #description="{ name, price, lowestPriorPrice, link }">
        <RawLink
          :to="link"
          class="flex grow flex-col px-[10px] py-[6px] sm:p-[10px]">
          <div
            class="text-2xs text-primary grow leading-4 opacity-50 sm:text-xs sm:leading-[18px]">
            {{ name }}
          </div>
          <div>
            Produce Price
            <!-- <ProductPrice
              :price="price"
              :lowest-prior-price="lowestPriorPrice"
              :applied-reductions="price.appliedReductions"
              type="whisper"
              :size="sm ? 'sm' : 'xs'" /> -->
          </div>
        </RawLink>
      </template>
    </ProductCard>
  </div>
</template>

<script setup lang="ts">
defineProps({
  width: {
    type: String as PropType<string>,
    default: undefined,
  },
  fetching: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  product: {
    type: Object as PropType<any>,
    default: () => ({}),
  },
})
</script>
