<template>
  <SFHorizontalItemsSlider class="w-full snap-x snap-mandatory scrollbar-hide">
    <SFLink
      v-for="{ id, image, colors, name } in siblings"
      :key="id"
      :to="getProductDetailRoute(product, id)"
      class="mr-2 flex size-12 shrink-0 items-center justify-center rounded-md bg-gray-200"
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
  </SFHorizontalItemsSlider>
</template>

<script setup lang="ts">
import type { Product } from '@scayle/storefront-nuxt'
import type { ProductSibling } from '~/types/siblings'
import { useRouteHelpers } from '~/composables'
import { formatColors } from '~/utils'

defineProps<{ product: Product; siblings: ProductSibling[] }>()

const { getProductDetailRoute } = useRouteHelpers()
</script>
