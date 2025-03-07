<template>
  <ScaylePicture
    :alt="alt"
    :quality="quality"
    :sizes="sizes"
    :height="height"
    :width="width"
    :should-trim="shouldTrim"
    densities="x1"
    :src="image.hash"
    :loading="imageLoading"
    :preload="preload"
    :aspect-ratio="aspectRatio"
    :class="{
      'picture-contain': fit === 'contain',
      'picture-cover': fit === 'cover',
      'm-auto h-[90%]': isCentered,
      'mix-blend-darken': withMixBlendDarken,
    }"
    data-testid="product-image"
    class="picture block"
    @load="load"
  />
</template>

<script setup lang="ts">
import type { ProductImage } from '@scayle/storefront-nuxt'
import { ScaylePicture } from '#components'

const {
  sizes = '',
  shouldTrim = false,
  isCentered = false,
  withMixBlendDarken = true,
  fit = 'contain',
  imageLoading = 'eager',
  preload = false,
  quality = 75,
  aspectRatio = [3, 4],
  load = () => {},
} = defineProps<{
  image: ProductImage
  sizes?: string
  fit?: 'contain' | 'cover'
  alt: string
  imageLoading?: 'lazy' | 'eager'
  preload?: boolean
  quality?: number
  load?: () => void
  shouldTrim?: boolean
  isCentered?: boolean
  withMixBlendDarken?: boolean
  height?: number | string
  width?: number | string
  aspectRatio?: [number, number]
}>()
</script>

<style>
.picture img {
  height: 100%;
  width: 100%;
}

.picture-contain img {
  object-fit: contain;
}

.picture-cover img {
  object-fit: cover;
  object-position: center top;
}
</style>
