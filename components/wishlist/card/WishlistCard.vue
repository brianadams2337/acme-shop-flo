<template>
  <ProductCard
    v-bind="{ index, isAvailable }"
    :id="item.product.id"
    :product="item.product"
    :loading="isWishlistFetching"
    class="col-span-6 md:col-span-4 2xl:col-span-3"
    wishlist-remove-icon="close"
    is-wishlist-card
    @productimage:mouseover="isAddToBasketButtonShown = true"
    @productimage:mouseleave="isAddToBasketButtonShown = false"
  >
    <template #badge>
      <ProductBadges :product="item.product" class="absolute bottom-2 left-2" />
    </template>
    <template #header-image="{ link, image, imageLoading, name }">
      <DefaultLink :to="link" raw>
        <ProductImage
          v-if="image"
          :image="image"
          :image-loading="imageLoading"
          :alt="name"
          sizes="sm:100vw"
          is-centered
          class="absolute inset-0"
        />
      </DefaultLink>
      <div
        v-if="isAvailable"
        class="absolute bottom-0 left-0 top-auto z-40 hidden h-auto w-full p-3 lg:block"
      >
        <AppButton
          type="secondary"
          class="w-full border-gray-350 bg-white p-3 text-xs font-semibold transition"
          :class="isAddToBasketButtonShown ? 'opacity-1' : 'opacity-0'"
          data-test-id="wishlist-card-add-to-cart"
          @click="addItemToCart(index)"
        >
          {{ $t('pdp.add_label') }}
        </AppButton>
      </div>
      <div
        v-else
        class="absolute inset-y-0 flex w-full items-center justify-center"
      >
        <p class="text-xl font-semibold text-[#424144]">
          {{ $t('global.sold_out') }}
        </p>
      </div>
      <div
        v-if="isAvailable"
        class="absolute bottom-0 right-0 top-auto z-30 flex h-auto justify-end pb-[20px] pr-4 lg:hidden"
      >
        <div
          class="flex size-8 cursor-pointer items-center justify-center rounded-full border border-gray-100 bg-white"
          data-test-id="wishlist-card-add-to-cart-mobile"
          @click="showSizePicker(index)"
        >
          <IconAddToCart class="size-5" />
        </div>
      </div>
    </template>
    <template #description="{ title, name }">
      <div>
        <div>
          <div
            class="mt-2 w-full justify-between py-2 text-xs font-medium text-primary opacity-50"
          >
            <p>{{ title }}</p>
            <p>{{ name }}</p>
          </div>
          <div>
            <ProductPrice
              data-test-id="wishlist-product-price"
              v-bind="{ price, lowestPriorPrice }"
              :product="item.product"
              type="whisper"
              size="sm"
              class="text-primary"
            />
          </div>
          <div v-if="isAvailable" class="hidden lg:block">
            <div
              v-if="!hasOneSizeVariantOnly && isChangingSize"
              :key="item.product.id"
              class="items-center space-x-2 py-4"
            >
              <ProductSizePicker
                :id="item.product.id"
                class="justify-center"
                :variants="item.product?.variants || []"
                :value="selectedSize?.value"
                @select-size="selectPickerSize"
                @click:outside="isChangingSize = false"
              />
            </div>
            <AppButton
              v-if="!hasOneSizeVariantOnly && !isChangingSize"
              data-test-id="wishlist-card-product-size"
              type="secondary"
              class="mr-2 mt-4"
              @click="isChangingSize = !isChangingSize"
            >
              {{ selectedSize?.label || $t('wishlist.change_size_label') }}
            </AppButton>
            <AppButton
              v-if="!isChangingSize"
              :disabled="sizeSavingId === item.product.id"
              data-test-id="wishlist-card-add-to-cart"
              class="mt-4"
              @click="addItemToCart(index)"
            >
              {{ $t('pdp.add_label') }}
            </AppButton>
          </div>
        </div>
      </div>
      <SlideIn
        class="lg:hidden"
        :name="`wishlistcard_${item.product.id}`"
        slide-type="fromBottom"
        slide-class="w-full xl:max-w-none h-auto xl:max-h-none top-auto left-0 p-0 pt-0"
      >
        <template #slide-in-content>
          <div>
            <div
              class="flex cursor-pointer justify-center py-3"
              @click="toggleFilter"
            >
              <IconAngleDown class="size-4" />
            </div>
            <div
              class="flex justify-end border-b border-b-secondary-700 px-5 pb-3"
            >
              <div class="text-right">
                <strong class="block text-sm">
                  {{ formatCurrency(price.withTax) }}
                </strong>
                <div class="text-xs text-secondary">
                  {{ $t('price.including_vat') }}
                </div>
              </div>
            </div>
            <div class="px-5 pt-4">
              <RadioGroup
                :items="sizes"
                @update:model-value="selectRadioSize"
              />
            </div>
          </div>
        </template>
      </SlideIn>
    </template>
  </ProductCard>
</template>

<script setup lang="ts">
import type { Product, WishlistItem } from '@scayle/storefront-nuxt'

type Props = {
  index: number
  item: WishlistItem & { product: Product }
}

const props = defineProps<Props>()

const { formatCurrency } = useFormatHelpers()
const { fetching: isWishlistFetching } = await useWishlist()

const wishlistItem = computed(() => props.item)

const {
  hasOneSizeVariantOnly,
  price,
  isAvailable,
  selectedSize,
  sizes,
  lowestPriorPrice,
} = useWishlistItem(wishlistItem)

const {
  addItemToCart,
  toggleFilter,
  showSizePicker,
  selectRadioSize,
  selectPickerSize,
  isChangingSize,
  sizeSavingId,
} = await useWishlistItemActions(wishlistItem)

const isAddToBasketButtonShown = ref(false)
</script>
