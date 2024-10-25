<template>
  <SFListbox
    v-slot="{ isOpen, list, close }"
    :value="currentShop?.path"
    name="language-switch"
    class="shrink-0"
  >
    <SFListboxButton
      ref="button"
      :aria-label="
        $t('shop_selector.aria_label', { selectedCountry, selectedLanguage })
      "
      class="h-full gap-1.5 px-2 -outline-offset-4"
      :list-name="list"
      data-testid="language-listbox"
    >
      <IconNewGlobe class="size-3.5" />
      <div class="text-sm text-white">
        <span v-if="selectedCountry">{{ selectedCountry }}</span>
        <span v-if="selectedCountry" class="mx-1">|</span>
        <span>{{ selectedLanguage }}</span>
      </div>
      <IconChevronDown
        class="size-3.5 text-white transition-all"
        :class="{ 'rotate-180': isOpen }"
      />
    </SFListboxButton>
    <div class="relative">
      <Transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <SFListboxOptions
          v-if="isOpen"
          class="absolute right-0 top-0 z-60 max-h-32 overflow-y-auto bg-white shadow-md"
          @close="
            (direction) => {
              close()
              focus(direction)
            }
          "
        >
          <SFListboxOption
            v-for="{ shopId, path, locale } in availableShops"
            :key="shopId"
            class="px-2 py-1 text-xs"
            :list-name="list"
          >
            <SFButton
              :key="`${locale}-locale`"
              type="raw"
              is-full-width
              class="!justify-start rounded-xl px-4 py-2 text-sm hover:bg-gray-200"
              :class="{ 'font-bold': locale === currentShop?.locale }"
              @click="changeShop(path)"
            >
              {{ getShopName(locale) }}
            </SFButton>
          </SFListboxOption>
        </SFListboxOptions>
      </Transition>
    </div>
  </SFListbox>
</template>

<script setup lang="ts">
import { useTemplateRef, computed } from 'vue'
import { tabbable } from 'tabbable'
import { useSwitchLocalePath } from '#i18n'
import { useTrackingEvents } from '~/composables/useTrackingEvents'
import { useAvailableShops, useCurrentShop } from '#storefront/composables'
import {
  SFButton,
  SFListbox,
  SFListboxOption,
  SFListboxOptions,
  SFListboxButton,
} from '#storefront-ui/components'

const currentShop = useCurrentShop()
const availableShops = useAvailableShops()
const switchLocalePath = useSwitchLocalePath()

const { trackShopChange } = useTrackingEvents()

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

const buttonRef = useTemplateRef('button')

const focus = (direction: 'next' | 'previous' | undefined) => {
  setTimeout(() => {
    const button: HTMLButtonElement = buttonRef.value?.$el
    const tabbables = tabbable(document.body).filter(
      (el) => el === button || !button.parentNode?.contains(el),
    )
    if (!button) {
      return
    }
    const index = tabbables.indexOf(button)

    if (direction === undefined || index === -1) {
      button.focus()
    } else if (direction === 'next' && tabbables[index + 1]) {
      tabbables[index + 1].focus()
    } else if (direction === 'previous' && tabbables[index - 1]) {
      tabbables[index - 1].focus()
    }
  })
}

const getShopName = (locale: string) => {
  const [languageCode, regionCode] = locale.split('-')

  const language = new Intl.DisplayNames([locale], {
    type: 'language',
  }).of(languageCode)
  const region = new Intl.DisplayNames([locale], {
    type: 'region',
  }).of(regionCode)

  return `${region} | ${language}`
}

const changeShop = (value?: string) => {
  if (!value) {
    throw new Error('Shop has no path configured')
  }
  trackShopChange()
  const newLocalePath = switchLocalePath(value).split('?')[0]
  window.location.replace(newLocalePath)
}
</script>
