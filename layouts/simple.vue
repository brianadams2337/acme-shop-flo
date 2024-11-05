<template>
  <div
    class="flex min-h-screen flex-col text-primary antialiased anchor-scrolling-none"
  >
    <header
      class="relative flex h-[60px] items-center justify-between border-b px-7 text-md font-medium text-gray-900"
    >
      <SFLink
        :to="routeList.home"
        raw
        class="flex items-center gap-2 text-md font-medium text-primary"
      >
        <IconBack aria-hidden="true" class="size-3" />
        <div class="mr-auto hidden pt-0.5 md:block">
          {{ $t('global.back-to-shop') }}
        </div>
        <div class="mr-auto block pt-0.5 md:hidden">
          {{ $t('global.to-shop') }}
        </div>
      </SFLink>

      <SFLink
        :to="routeList.home"
        raw
        class="absolute left-1/2 -translate-x-1/2"
        :aria-label="shopName"
      >
        <IconNewLogo class="size-7" aria-hidden="true" />
      </SFLink>

      <div class="hidden flex-row gap-4 md:flex">
        <NavigationTreeItem
          v-for="navItem in headerTree?.items"
          :key="`footer-link-${navItem.id}`"
          raw
          :navigation-item="navItem"
        />
        <span class="ml-auto" />
      </div>
    </header>
    <main class="grow">
      <NuxtPage />
    </main>
    <footer
      class="flex flex-col gap-4 border-t bg-gray-50 px-10 py-5 text-[13px] text-gray-600 md:flex-row md:gap-8 md:py-7 md:text-gray-900"
    >
      <div class="mx-auto text-gray-900 md:ml-0 md:mr-auto md:text-gray-600">
        {{ $t('footer.copyright', { current_year: new Date().getFullYear() }) }}
      </div>
      <div class="mx-auto flex flex-row gap-4 md:contents">
        <NavigationTreeItem
          v-for="navItem in footerTree?.items"
          :key="`footer-link-${navItem.id}`"
          raw
          :navigation-item="navItem"
        />
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { defineOptions } from 'vue'
import { useHead } from '@unhead/vue'
import { useNuxtApp } from '#app/nuxt'
import {
  useCurrentShop,
  useNavigationTreeByName,
} from '#storefront/composables'
import { SFLink } from '#storefront-ui/components'
import { NuxtPage } from '#components'
import NavigationTreeItem from '~/components/NavigationTreeItem.vue'
import { routeList } from '~/utils/route'

const currentShop = useCurrentShop()

const { data: footerTree } = useNavigationTreeByName({
  params: { treeName: 'Simplified Footer' },
  key: 'footer-tree',
})

const { data: headerTree } = useNavigationTreeByName({
  params: { treeName: 'Simplified Header' },
  key: 'header-tree',
})

const {
  $config: {
    public: { shopName },
  },
} = useNuxtApp()
// Meta tags
useHead({
  bodyAttrs: () => ({
    class: ['relative'],
  }),
  htmlAttrs: () => ({
    lang: new Intl.Locale(currentShop.value.locale).language,
  }),
  script: [
    {
      // Add loaded class to body after DOMContentLoaded
      children: `document.addEventListener('DOMContentLoaded', () => { document.body.classList.add('loaded'); });`,
    },
  ],
  titleTemplate: (title) => (title ? `${title} - ${shopName}` : `${shopName}`),
})
defineOptions({ name: 'AppSimple' })
</script>
