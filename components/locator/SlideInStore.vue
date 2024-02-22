<template>
  <div>
    <div class="flex flex-row items-center justify-between">
      <p class="flex-none basis-1/2 font-bold">
        {{ nameWithIndex }}
      </p>
      <div
        class="flex grow basis-1/2 flex-row flex-nowrap items-center justify-between text-xs font-bold"
      >
        <div class="rounded-full bg-secondary-400 px-2 py-1">
          {{ formatDistance(distance) }}
        </div>
        <div
          v-if="quantity !== undefined"
          class="rounded-full px-2 py-1"
          :class="{
            'bg-stock-locator-available': quantity >= 5,
            'bg-stock-locator-unavailable': quantity <= 0,
            'bg-stock-locator-low-stock': quantity < 5,
          }"
        >
          {{
            quantity < 5
              ? $t('store_locator.labels.low_stock')
              : $t('store_locator.labels.available')
          }}
        </div>
        <button
          v-if="isFavoriteStore"
          class="cursor-pointer"
          @click="favoriteStoreId = null"
        >
          <IconSelectionActive class="size-4" />
        </button>
        <button v-else class="cursor-pointer" @click="favoriteStoreId = id">
          <IconSelection class="size-4" />
        </button>
      </div>
    </div>
    <div class="mt-5 flex flex-col space-y-2 text-xs">
      <div class="flex items-center justify-start">
        <div class="mr-2 size-4"><IconLocation /></div>
        <div>
          {{ address.street }} {{ address.houseNumber }} -
          {{ address.zipCode }} {{ address.city }}
        </div>
      </div>
      <div v-if="customData?.phone" class="flex items-center justify-start">
        <div class="mr-2 size-4">
          <IconPhone />
        </div>
        <div>{{ customData.phone }}</div>
      </div>
      <div class="flex items-center justify-start">
        <div class="mr-2 size-4">
          <IconClock />
        </div>
        <div>
          <span class="font-bold">{{
            openingTimes.currentlyOpen
              ? $t('store_locator.labels.store_open')
              : $t('store_locator.labels.store_closed')
          }}</span>
          <span v-if="openingTimes.currentlyOpen">{{
            ' ' +
            $t(
              'store_locator.labels.store_closes_in',
              closesInTime(openingTimes.minutesUntilClosed),
            )
          }}</span>
        </div>
      </div>
    </div>
    <div class="mt-5 rounded bg-secondary-450 px-2">
      <AppButton
        type="ghost"
        class="flex-row-reverse text-xs !normal-case"
        rounded
        @click="openingHoursOpen = !openingHoursOpen"
      >
        <template #icon="{ _class }">
          <IconDropdown :class="_class" class="!h-4 !w-4" />
        </template>
        {{ $t('store_locator.buttons.opening_hours') }}
      </AppButton>
      <div v-if="openingHoursOpen">
        <FadeInTransition>
          <div class="pb-2">
            <div v-for="day in daysOfWeek" :key="day" class="mb-1">
              <div class="flex items-center justify-between">
                <div class="grow">
                  <!-- TODO: add bold for current day -->
                  {{ $t(`store_locator.opening_times.${day}`) }}
                </div>
                <div class="flex w-24 flex-col text-justify">
                  <div v-if="!openingTimes[day].length">Closed</div>
                  <div v-else>
                    <div v-for="(time, idx) in openingTimes[day]" :key="idx">
                      {{ time.timeFrom }} - {{ time.timeUntil }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeInTransition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  index: {
    type: Number,
    default: 0,
  },
  distance: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    default: undefined, // TODO: check whats going on here
  },
  address: {
    type: Object,
    required: true,
  },
  customData: {
    type: Object as PropType<Partial<{ phone: string }>>,
    required: true,
  },
  openingTimes: {
    type: Object,
    required: true,
  },
})

const formatDistance = useFormatDistance()

const currentShop = useCurrentShop()

const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

const daysOfWeek = computed(() => {
  const locale = new Intl.Locale(currentShop.value.locale)
  const result = DAYS.slice()
  const startIndex =
    'getWeekInfo' in locale && typeof locale.getWeekInfo === 'function'
      ? locale.getWeekInfo().firstDay - 1
      : 0
  const begin = result.slice(startIndex)
  result.splice(startIndex)
  result.unshift(...begin)
  return result
})

const favoriteStoreId = useFavoriteStore()
const isFavoriteStore = computed(() => favoriteStoreId.value === props.id)

const nameWithIndex = computed(() =>
  props.index > 0 ? `${props.index}. ${props.name}` : `${props.name}`,
)

const closesInTime = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return { hours, minutes }
}

const openingHoursOpen = ref(false)
</script>
