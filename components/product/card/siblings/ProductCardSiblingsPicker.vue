<template>
  <div class="flex items-center justify-start">
    <SFLink
      v-for="{ id, name, image, colors } in itemsToShow"
      :key="id"
      :to="getProductDetailRoute(product, id)"
      class="relative mr-2 flex size-12 items-center justify-center overflow-hidden rounded-md bg-gray-200"
      data-testid="product-sibling"
    >
      <ProductImage
        v-if="image"
        :image="image"
        :alt="
          $t('product_image.alt', {
            productName: name,
            colors: formatColors(colors),
          })
        "
        width="36px"
        sizes="xs:40px sm:40px md:40px lg:40px xl:40px"
      />
    </SFLink>
    <SFLink
      v-if="furtherItemsCount"
      :to="getProductDetailRoute(product)"
      raw
      class="text-sm font-medium text-gray-500"
    >
      + {{ furtherItemsCount }}
    </SFLink>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Product } from '@scayle/storefront-nuxt'
import type { ProductSibling } from '~/types/siblings'
import { useRouteHelpers } from '~/composables'
import { PRODUCT_CARD_SIBLINGS_LIMIT } from '~/constants'
import { formatColors } from '~/utils'

type Props = {
  product: Product
  siblings: ProductSibling[]
  limit?: number
}

const props = withDefaults(defineProps<Props>(), {
  limit: PRODUCT_CARD_SIBLINGS_LIMIT,
})

const { getProductDetailRoute } = useRouteHelpers()

const itemsToShow = computed(() => props.siblings.slice(0, props.limit))

const furtherItemsCount = computed(() => {
  const count = props.siblings.length - props.limit
  return count > 0 ? count : 0
})
</script>
