<template>
  <NuxtPicture
    data-test-id="product-image"
    v-bind="{ alt, quality, background, sizes }"
    :src="image.hash"
    :modifiers="{ ...(shouldTrim && { trim: 1 }), brightness }"
    :loading="imageLoading"
    provider="default"
    class="picture block mix-blend-darken"
    :class="{
      'picture-contain': fit === 'contain',
      'picture-cover': fit === 'cover',
      'm-auto h-[90%]': isCentered,
    }"
    @load="load" />
</template>

<script setup lang="ts">
import { ProductImage, getAttributeValue } from '@scayle/storefront-nuxt'

const props = defineProps({
  sizes: {
    type: String,
    default: '',
  },
  image: {
    type: Object as PropType<ProductImage>,
    required: true,
  },
  shouldTrim: {
    type: Boolean,
    default: false,
  },
  fit: {
    type: String,
    default: 'contain',
  },
  isCentered: {
    type: Boolean,
    default: false,
  },
  alt: {
    type: String,
    default: undefined,
  },
  quality: {
    type: Number,
    default: 75,
  },
  load: {
    type: Function as PropType<() => void>,
    default: () => {},
  },
  imageLoading: {
    type: String as PropType<'lazy' | 'eager'>,
    default: 'lazy',
  },
})

const imageBackground = computed(() => {
  return getAttributeValue(props.image.attributes, 'imageBackground')
})

const brightness = computed(() => {
  const background = getAttributeValue(
    props.image.attributes,
    'imageBackground',
  )
  if (background === 'white') {
    return 0.96
  }
  if (background === 'grey') {
    return 1.06
  }
  return 1
})

const background = computed(() => {
  const bg = getAttributeValue(props.image.attributes, 'imageBackground')

  return bg === 'transparent' ? 'F4F4F4' : 'FFFFFF'
})
</script>

<style>
.picture img {
  width: 100%;
  height: 100%;
}

.picture-contain img {
  object-fit: contain;
}

.picture-cover img {
  object-fit: cover;
  object-position: center top;
}

.cursor-zoom-in {
  cursor: zoom-in;
}

.cursor-zoom-out {
  cursor: zoom-out;
}
</style>
