<template>
  <div class="grid grid-cols-8">
    <ProductCard
      :id="product.id"
      :key="`product-disruptor-${product.id}`"
      :badge-label="
        $helpers.product.getBadgeLabel({
          isNew: product.isNew,
          isSoldOut: product.isSoldOut,
        })
      "
      :class="{
        'col-span-full': width === '1' || width === undefined,
        'col-span-full md:col-span-4 md:col-start-3':
          (width === '2' && listingColumns === 3) || listingColumns === 1,
        'col-span-full md:col-span-8': width === '2' && listingColumns === 2,
      }"
      :colors="getAttributeValueTuples(product.attributes, 'color')"
      :name="getFirstAttributeValue(product.attributes, 'name')?.label"
      :link="$helpers.route.getProductDetailRoute(product)"
      :image="$helpers.image.getFirstModelImage(product.images)"
      :hover-images="$helpers.image.getModelImages(product.images).reverse()"
      :show-add-to-cart="false"
      :loading="fetching"
      :price="$helpers.product.getLowestPrice(product.variants ?? [])"
      :lowest-prior-price="
        $helpers.product.getVariantWithLowestPrice(product.variants)
          ?.lowestPriorPrice
      "
      :product="product"
      :variants="product.variants"
      :title="
        $helpers.attribute.getFirstAttributeValue(product.attributes, 'brand')
          ?.label
      "
      class="col-span-full"
      @intersect:product="emit('intersect:product', product)">
      <template #description="{ name, price, lowestPriorPrice, link }">
        <RawLink
          :to="link"
          class="flex grow flex-col px-[10px] py-[6px] sm:p-[10px]">
          <div
            class="grow text-2xs leading-4 text-primary opacity-50 sm:text-xs sm:leading-[18px]">
            {{ name }}
          </div>
          <div>
            <ProductPrice
              :price="price"
              :lowest-prior-price="lowestPriorPrice"
              :applied-reductions="price.appliedReductions"
              type="whisper"
              :size="sm ? 'sm' : 'xs'" />
          </div>
        </RawLink>
      </template>
    </ProductCard>
  </div>
</template>

<script setup lang="ts">
import {
  getFirstAttributeValue,
  getAttributeValueTuples,
  Product as BapiProduct,
} from '@scayle/storefront-nuxt'

const { $helpers } = useNuxtApp()
const { listingColumns } = useListingUiState()

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
    type: Object as PropType<BapiProduct>,
    default: () => ({}),
  },
})

const emit = defineEmits(['intersect:product'])
const sm = ref(false)
</script>
