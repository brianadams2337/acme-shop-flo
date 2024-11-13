<template>
  <footer class="bg-white">
    <div class="flex flex-col gap-4 border-t px-10 py-5 md:gap-8 md:py-7">
      <div>
        <LocalizedLink :to="routeList.home" raw :aria-label="shopName">
          <IconNewLogo class="size-7" aria-hidden="true" />
        </LocalizedLink>
      </div>

      <div class="grid grid-cols-1 gap-y-5 text-base md:grid-cols-4">
        <FooterLinkSection
          v-for="section in footerLinks?.items"
          :key="section.id"
          :section="section"
        />
      </div>
    </div>

    <div
      class="flex flex-col gap-4 border-t px-10 py-5 text-md md:flex-row md:gap-8 md:py-7"
    >
      <div class="mr-auto text-gray-900">
        {{ $t('footer.copyright', { current_year: new Date().getFullYear() }) }}
      </div>
      <ul class="flex flex-row gap-4 text-gray-600 md:contents">
        <li
          v-for="navItem in footerTree?.items"
          :key="`footer-link-${navItem.id}`"
        >
          <NavigationTreeItem
            class="rounded-md p-1 hover:bg-gray-100"
            raw
            :navigation-item="navItem"
          />
        </li>
      </ul>
    </div>
  </footer>
</template>

<script setup lang="ts">
import FooterLinkSection from './FooterLinkSection.vue'
import LocalizedLink from './LocalizedLink.vue'
import { useNuxtApp } from '#app/nuxt'
import { useNavigationTreeByName } from '#storefront/composables'
import NavigationTreeItem from '~/components/NavigationTreeItem.vue'
import { routeList } from '~/utils/route'

const {
  $config: {
    public: { shopName },
  },
} = useNuxtApp()

const { data: footerTree } = useNavigationTreeByName(
  {
    params: { treeName: 'Simplified Footer' },
  },
  'footer-tree',
)

const { data: footerLinks } = useNavigationTreeByName(
  {
    params: { treeName: 'Footer' },
  },
  'footer-tree',
)
</script>
