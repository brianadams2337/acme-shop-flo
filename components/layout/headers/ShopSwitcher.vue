<template>
  <Listbox
    v-slot="{ isOpen, list }"
    :value="currentShop?.path"
    name="language-switch"
    class="shrink-0">
    <ListboxButton
      class="h-full"
      :list-name="list"
      data-test-id="language-listbox">
      <div class="text-gray-350 text-xs uppercase">
        <span v-if="selectedCountry">{{ selectedCountry }}</span>
        <span v-if="selectedCountry" class="mx-1">|</span>
        <span class="opacity-60">{{ selectedLanguage }}</span>
      </div>
    </ListboxButton>
    <div class="relative">
      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0">
        <ListboxOptions
          v-if="isOpen"
          class="z-60 absolute right-0 top-0 max-h-32 w-32 overflow-y-auto bg-white shadow-md">
          <ListboxOption
            v-for="{ shopId, path, locale, domain } in availableShops"
            :key="shopId"
            class="text-xs"
            :list-name="list">
            <a
              :key="`${locale}-locale`"
              class="block cursor-pointer px-4 py-2 uppercase text-black hover:bg-gray-200"
              :class="{ 'font-bold': locale === currentShop?.locale }"
              @click="changeShop($i18n.differentDomains ? domain : path)">
              {{ locale }}
            </a>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup lang="ts">
const currentShop = useCurrentShop()
const availableShops = useAvailableShops()
const switchLocalePath = useSwitchLocalePath()

const languageTranslator = computed(() => {
  if (!currentShop.value) {
    return
  }
  return new Intl.DisplayNames([currentShop.value.locale], { type: 'language' })
})
const regionTranslator = computed(() => {
  if (!currentShop.value) {
    return
  }
  return new Intl.DisplayNames([currentShop.value.locale], { type: 'region' })
})

const selectedLanguage = computed(() => {
  if (!currentShop.value) {
    return
  }
  const [language] = currentShop.value.locale.split('-')
  return languageTranslator.value?.of(language)
})

const selectedCountry = computed(() => {
  if (!currentShop.value) {
    return
  }
  const [_, region] = currentShop.value.locale.split('-')

  return region ? regionTranslator.value?.of(region) : null
})

const changeShop = (value?: string) => {
  // Track shop change
  window.location.replace(switchLocalePath(value))
}
</script>
