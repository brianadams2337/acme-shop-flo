<template>
  <div>
    <!-- TODO add intersect component -->
    <slot>
      <article :id="`product-${id}`" class="flex h-full flex-col">
        <!-- Slot Header -->
        <slot name="header">
          <div
            class="group aspect-h-4 aspect-w-3 relative flex max-h-md items-center justify-center bg-gray-200"
            @mouseover="
              () => {
                loadHoverImage = true
                imageHover = true
                emit('productimage:mouseover')
              }
            "
            @mouseleave="
              () => {
                imageHover = false
                emit('productimage:mouseleave')
              }
            ">
            <slot v-if="product" name="header-actions">
              <ProductCardHeaderActions
                :product="product"
                :wishlist-remove-icon="wishlistRemoveIcon"
                :listing-meta-data="listingMetaData"
                class="opacity-100 transition"
                :class="{
                  'lg:opacity-0': isWishlistCard && !imageHover && isAvailable,
                }" />
            </slot>
            <slot name="header-image" :image="image">
              <slot name="button"> </slot>
              <RawLink :to="link" @click.capture="$emit('click:product')">
                <ProductImage
                  v-if="image"
                  fit="contain"
                  :image="image"
                  :alt="name"
                  sizes="sm:100vw"
                  :should-trim="false"
                  :image-loading="imageLoading"
                  is-centered
                  class="absolute inset-0 transition duration-200"
                  :class="{
                    'group-hover:opacity-0': hoverImage && isAvailable,
                    'opacity-20': !isAvailable,
                  }" />
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
              </RawLink>
            </slot>
            <slot name="header-badge" :label="badgeLabel">
              <RawLink
                v-if="badgeLabel"
                :to="link"
                @click.capture="$emit('click:product')">
                <ProductBadge
                  :badge-label="badgeLabel"
                  class="absolute left-0 top-0" />
              </RawLink>
            </slot>
          </div>
        </slot>

        <!-- slot description -->
        <slot name="description" v-bind="props">
          <div class="my-2 px-2.5 md:my-2.5">
            <RawLink :to="link" @click.capture="emit('click:product')">
              <p
                class="text-2xs font-medium uppercase leading-tight text-primary opacity-50 md:text-xs">
                {{ title }}
              </p>
              <p
                class="mb-1 text-2xs font-medium leading-tight text-primary opacity-50 md:text-xs"
                data-test-id="product-card-product-name">
                {{ name }}
              </p>
              <slot name="description-price" :price="price">
                <ProductPrice
                  :price="price"
                  :lowest-prior-price="lowestPriorPrice"
                  :applied-reductions="price.appliedReductions"
                  type="whisper"
                  :size="true ? 'sm' : 'xs'" />
              </slot>
            </RawLink>
            <div class="mt-2">
              <slot name="description-action" :colors="colors">
                <p>Sibling picker slot</p>
                <ProductSiblingPicker
                  :items="siblings"
                  class="flex pb-1"
                  :spacing="siblingSpacing">
                  <template #item="{ item }">
                    <RawLink
                      :to="
                        $helpers.route.getProductDetailRoute(product, item.id)
                      ">
                      <ColorChip
                        v-if="item.colors.length"
                        data-test-id="product-card-color-circle"
                        :color="item.colors[0] as ProductColor"
                        :size="colorChipSize"
                        :rounded="colorChipRoundedSize" />
                    </RawLink>
                  </template>
                </ProductSiblingPicker>
              </slot>
            </div>
          </div>
        </slot>
      </article>
    </slot>
  </div>
</template>

<script setup lang="ts">
import {
  ProductColor,
  Product as BapiProduct,
  Price,
  Value,
} from '@scayle/storefront-nuxt'
interface ListItem {
  name: string
  id: string
  index?: number | undefined
}
const props = defineProps({
  id: {
    type: Number as PropType<number>,
    required: true,
  },
  link: {
    type: [Object, String] as PropType<any>,
    default: () => ({}),
  },
  product: {
    type: Object as PropType<BapiProduct>,
    default: () => ({}),
  },
  loading: {
    type: Boolean as PropType<boolean>,
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
    type: Object as PropType<any>,
    default: () => ({
      withTax: null,
      relativeDifferenceToPrice: null,
    }),
  },
  image: {
    type: Object as PropType<any | null>,
    default: () => ({}),
  },
  hoverImage: {
    type: Object as PropType<any>,
    default: null,
  },
  badgeLabel: {
    type: String as PropType<string>,
    default: null,
  },
  colors: {
    type: Array as PropType<Value[]>,
    default: () => [],
  },
  siblings: {
    type: Array as PropType<any>,
    default: () => [],
  },
  isAvailable: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  isWishlistCard: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  wishlistRemoveIcon: {
    type: String as PropType<'heart' | 'close'>,
    default: undefined,
  },
  listingMetaData: {
    type: Object as PropType<ListItem>,
    default: () => ({}),
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
const emit = defineEmits<{
  (e: 'intersect:product', value: number): void
  (e: 'productimage:mouseover'): void
  (e: 'productimage:mouseleave'): void
  (e: 'click:product'): void
}>()

const { $helpers } = useNuxtApp()
</script>
