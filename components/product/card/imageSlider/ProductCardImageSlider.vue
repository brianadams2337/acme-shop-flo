<template>
  <SFHorizontalItemsSlider class="size-full" :with-arrows="areArrowsShown">
    <template #prev-button="{ prev, isPrevEnabled }">
      <ProductCardImageSliderButton
        :disabled="!isPrevEnabled"
        direction="left"
        @click="prev()"
      />
    </template>
    <template #next-button="{ next, isNextEnabled }">
      <ProductCardImageSliderButton
        :disabled="!isNextEnabled"
        direction="right"
        @click="next()"
      />
    </template>
    <Intersect
      v-for="(item, imageIndex) in productImages"
      :key="item.hash"
      :threshold="[0.5]"
      class="relative min-w-full snap-start snap-always"
    >
      <SFLink :to="link" raw>
        <ProductImage
          v-if="item"
          :image="item"
          :alt="alt"
          :image-loading="getImageLoading(imageIndex)"
          :class="{ 'opacity-20': !isAvailable }"
          sizes="xs:50vw sm:50vw md:40vw lg:33vw xl:320px"
          class="absolute inset-0"
        />
      </SFLink>
    </Intersect>
  </SFHorizontalItemsSlider>
</template>

<script setup lang="ts">
import type { ProductImage } from '@scayle/storefront-nuxt'
import { computed } from 'vue'
import { PRODUCT_CARD_IMAGE_EAGER_LOAD_SIZE } from '~/constants'

type Props = {
  link: string
  isAvailable: boolean
  isProductHovered: boolean
  image: ProductImage
  alt: string
  images: ProductImage[]
  productIndex: number
}

const props = defineProps<Props>()

const productImages = computed(() => {
  const images = props.images.filter(({ hash }) => hash !== props.image.hash)
  return [props.image, ...images]
})

const areArrowsShown = computed(() => {
  return props.isProductHovered && productImages.value.length > 1
})

const getImageLoading = (index: number) => {
  const shouldEagerLoad =
    props.productIndex < PRODUCT_CARD_IMAGE_EAGER_LOAD_SIZE

  return shouldEagerLoad && index === 0 ? 'eager' : 'lazy'
}
</script>
