<template>
  <PromotionMobileList v-if="isPromotionListShown" :items="promotions" />
  <div
    v-else
    class="fixed bottom-0 z-[80] flex max-h-32 w-full cursor-pointer flex-col items-center justify-start rounded-tr-lg bg-blue p-4 text-sm text-white lg:hidden translate-0 transition-transform duration-300 ease-in-out"
    :style="backgroundColorStyle"
    :class="{ 'translate-y-full': !isMobilePromotionBannerShown }"
    @click="togglePromotionList()"
  >
    <div class="overflow-hidden">
      <div
        class="flex w-full items-center justify-between gap-1"
        :class="minOrderValue && 'mb-2.5'"
      >
        <div class="text-balance">
          <PromotionFullProgressLabel v-if="isFullProgress" is-small />
          <AutomaticDiscountMobileHeadline
            v-else-if="minOrderValue"
            class="mr-2"
          />
          <PromotionHeadline
            v-else-if="headlineParts"
            :headline-parts="headlineParts"
            size="xs"
            class="mr-4 flex-1"
          />
        </div>
        <div class="flex w-min flex-col items-start justify-stretch gap-y-2">
          <PromotionCountdown
            v-if="expirationDate"
            :until="expirationDate"
            class="self-stretch"
          />
          <ShowDealsButton
            v-if="isDealsButtonShown"
            :category="category"
            class="self-stretch text-balance"
          />
        </div>
      </div>
      <PromotionProgress
        v-if="minOrderValue"
        v-bind="{ minOrderValue, currentPromotion }"
        is-full-width
      />
    </div>

    <SFButton
      type="raw"
      class="absolute min-h-[1.875rem] left-0 -mt-[2.875rem] !w-fit items-center !px-2 !py-1 text-start !rounded-none !rounded-t-lg text-xs font-semibold leading-5 text-white inline-flex"
      size="xs"
      :style="backgroundColorStyle"
      :class="{ '!border-b-[0.5px]': isMobilePromotionBannerShown }"
      @click="togglePromotionBanner"
    >
      <IconGift class="size-3" />
      <span v-if="isMobilePromotionBannerShown">
        {{ $t('promotion.hide_my_promotions') }}</span
      >
      <span v-else> {{ $t('promotion.see_my_promotions') }}</span>
      <template #append-icon="{ _class }">
        <IconChevronDown v-if="isMobilePromotionBannerShown" :class="_class" />
        <IconChevronUp v-else :class="_class" />
      </template>
    </SFButton>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  promotions: Promotion[]
  category?: { ctaLabel: string; to: string }
}>()

const isMobilePromotionBannerShown = ref(true)

const togglePromotionBanner = () => {
  isMobilePromotionBannerShown.value = !isMobilePromotionBannerShown.value
}
const { isFullProgress, isMOVPromotionApplied } = await usePromotionProgress()

const {
  headlineParts,
  minOrderValue,
  currentPromotion,
  backgroundColorStyle,
  expirationDate,
} = useCurrentPromotion()

const { togglePromotionList, isPromotionListShown } = usePromotionActions()

const isDealsButtonShown = computed<boolean>(() => {
  return Boolean(
    props.category &&
      !isMOVPromotionApplied.value &&
      isFullProgress.value &&
      minOrderValue.value,
  )
})
</script>
