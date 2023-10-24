<template>
  <div
    v-if="data"
    class="sticky flex h-[3.25rem] items-center justify-between gap-1 bg-blue px-4 py-2 text-sm text-white">
    <PromotionCountdown
      :key="firstPromotion.id"
      :until="firstPromotion.schedule.to" />
    <AppButton
      type="raw"
      class="flex items-center text-white"
      @click="toggleList">
      <Headline tag="h1" size="lg">
        {{ firstPromotion.customData.headerText }}
      </Headline>
      <IconInfoOutline class="ml-2 h-5 w-5" />
    </AppButton>
    <PromotionProgressBar />
  </div>
  <PromotionList
    :is-shown="isListShown"
    :items="data.entities"
    @close="isListShown = false" />
</template>

<script setup lang="ts">
const { data, fetching } = await useCurrentPromotions()
console.log({ data })

const isFetched = computed(() => fetching.value)
const firstPromotion = computed(() => data.value.entities[0])

const isListShown = ref(false)

const toggleList = () => {
  isListShown.value = !isListShown.value
}

watch(isFetched, (val) => console.log('trg', val))
</script>
