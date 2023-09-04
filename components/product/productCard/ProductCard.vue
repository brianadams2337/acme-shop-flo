<template>
  <div
    :data-product-card-id="id"
    :class="{ 'animate-pulse': loading }"
    class="group relative">
    <slot>
      <!-- TODO: Implement intersection observer component: -->
      <!-- https://vueuse.org/core/useIntersectionObserver/ -->
      <!-- <Intersect :threshold="0.5" @enter="emit('intersect:product', id)"> -->
      <article :id="`product-${id}`" class="flex h-full flex-col">
        <slot name="header">
          <div
            class="aspect-h-4 aspect-w-3 max-h-md group relative flex items-center justify-center bg-gray-200"
            @mouseover="onMouseOver"
            @mouseleave="onMouseLeave">
            <slot v-if="product" name="header-actions">
              <ProductCardHeaderActions
                v-bind="{ product, wishlistRemoveIcon }"
                :class="headerActionsClass"
                class="opacity-100 transition" />
            </slot>
            <slot name="header-image" :image="image">
              <slot name="button"> </slot>
              <NuxtLink :to="link" @click.capture="$emit('click:product')">
                <ProductImage
                  v-if="image"
                  v-bind="{ image, imageLoading }"
                  :alt="name"
                  :class="imageClasses"
                  fit="contain"
                  sizes="sm:100vw"
                  is-centered
                  class="absolute inset-0 transition duration-200" />
                <div
                  v-if="hoverImage && loadHoverImage"
                  class="opacity-0 transition duration-300 group-hover:opacity-100">
                  <FadeInTransition :duration="300">
                    <ProductImage
                      :image="hoverImage"
                      :image-loading="imageLoading"
                      :alt="name"
                      sizes="sm:100vw"
                      fit="cover"
                      class="absolute inset-0" />
                  </FadeInTransition>
                </div>
              </NuxtLink>
            </slot>
            <slot name="header-badge" :label="badgeLabel">
              <NuxtLink
                v-if="badgeLabel"
                :to="link"
                @click.capture="$emit('click:product')">
                <ProductBadge
                  :badge-label="badgeLabel"
                  class="absolute left-0 top-0" />
              </NuxtLink>
            </slot>
          </div>
        </slot>
        <slot name="description" v-bind="$props">
          <div class="my-2 px-2.5 md:my-2.5">
            <NuxtLink
              :to="link"
              class="text-2xs text-primary font-medium uppercase leading-tight opacity-50 md:text-xs"
              @click.capture="$emit('click:product')">
              <p class="uppercase">{{ title }}</p>
              <p class="mb-1" data-test-id="product-card-product-name">
                {{ name }}
              </p>
              <slot name="description-price" :price="price">
                <ProductPrice
                  v-bind="{ price, lowestPriorPrice }"
                  :applied-reductions="price.appliedReductions"
                  :size="viewport.isGreaterThan('md') ? 'sm' : 'xs'"
                  type="whisper" />
              </slot>
            </NuxtLink>
            <div class="mt-2">
              <slot name="description-action" :colors="colors">
                <ProductSiblingPicker
                  :items="siblings"
                  :spacing="siblingSpacing"
                  class="flex pb-1">
                  <template #item="{ item }">
                    <NuxtLink
                      :to="route.getProductDetailRoute(product, item.id)">
                      <!-- TODO: Implement color chip component -->
                      <!-- <ColorChip -->
                      <!--   v-if="item.colors.length" -->
                      <!--   data-test-id="product-card-color-circle" -->
                      <!--   :color="item.colors[0]" -->
                      <!--   :size="colorChipSize" -->
                      <!--   :rounded="colorChipRoundedSize" /> -->
                    </NuxtLink>
                  </template>
                </ProductSiblingPicker>
              </slot>
            </div>
          </div>
        </slot>
      </article>
      <!-- </Intersect> -->
    </slot>
  </div>
</template>

<script setup lang="ts">
import {
  Product,
  ProductImage as ProductImageType,
  Price,
  Value,
  getProductSiblings,
  LowestPriorPrice,
} from '@scayle/storefront-nuxt'
import { RouteLocationRaw } from '#vue-router'

type ProductSiblings = ReturnType<typeof getProductSiblings>

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  link: {
    type: [Object, String] as PropType<RouteLocationRaw>,
    default: () => ({}),
  },
  product: {
    type: Object as PropType<Product>,
    default: () => ({}),
  },
  loading: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String as PropType<string | undefined>,
    default: '',
  },
  name: {
    type: String as PropType<string | undefined>,
    default: '',
  },
  price: {
    type: Object as PropType<Price>,
    default: () => ({}),
  },
  lowestPriorPrice: {
    type: Object as PropType<LowestPriorPrice>,
    default: () => ({
      withTax: null,
      relativeDifferenceToPrice: null,
    }),
  },
  image: {
    type: Object as PropType<ProductImageType | null>,
    default: () => ({}),
  },
  hoverImage: {
    type: Object as PropType<ProductImageType>,
    default: null,
  },
  badgeLabel: {
    type: String,
    default: null,
  },
  colors: {
    type: Array as PropType<Value[]>,
    default: () => [],
  },
  siblings: {
    type: Array as PropType<ProductSiblings>,
    default: () => [],
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  isWishlistCard: {
    type: Boolean,
    default: false,
  },
  wishlistRemoveIcon: {
    type: String as PropType<'heart' | 'close'>,
    default: undefined,
  },
  colorChipSize: {
    type: String as PropType<'sm' | 'md'>,
    default: 'md',
  },
  colorChipRoundedSize: {
    type: String as PropType<'sm' | 'md'>,
    default: 'md',
  },
  siblingSpacing: {
    type: String as PropType<'default' | 'narrow'>,
    default: 'default',
  },
  imageLoading: {
    type: String as PropType<'lazy' | 'eager'>,
    default: 'lazy',
  },
})

const loadHoverImage = ref(false)
const imageHover = ref(false)

const viewport = useViewport()

const onMouseOver = () => {
  loadHoverImage.value = true
  imageHover.value = true
  emit('productimage:mouseover')
}

const onMouseLeave = () => {
  imageHover.value = false
  emit('productimage:mouseleave')
}

const imageClasses = computed(() => ({
  'group-hover:opacity-0': props.hoverImage && props.isAvailable,
  'opacity-20': !props.isAvailable,
}))

const headerActionsClass = computed(() => ({
  'lg:opacity-0': props.isWishlistCard && !imageHover && props.isAvailable,
}))

const emit = defineEmits<{
  (e: 'intersect:product', value: number): void
  (e: 'productimage:mouseover'): void
  (e: 'productimage:mouseleave'): void
  (e: 'click:product'): void
}>()
</script>
