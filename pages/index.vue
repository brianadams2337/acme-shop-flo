<template>
  <CMSContentPage slug="homepage" data-testid="home-page-content">
    <template #loading>
      <SFContentPageSkeletonLoader />
    </template>
  </CMSContentPage>
</template>

<script setup lang="ts">
import { defineOptions } from 'vue'
import { sanitizeCanonicalURL } from '@scayle/storefront-nuxt'
import { useAvailableShops } from '@scayle/storefront-nuxt/composables'
import type { OnlineStore, WithContext } from 'schema-dts'
import {
  useHead,
  useSeoMeta,
  definePageMeta,
  useSwitchLocalePath,
} from '#imports'
import { useNuxtApp, useRuntimeConfig } from '#app'
import { useRoute } from '#app/composables/router'
import CMSContentPage from '#storefront-cms/components/ContentPage.vue'
import { useJsonld } from '~/composables/useJsonld'
import SFContentPageSkeletonLoader from '~/components/SFContentPageSkeletonLoader.vue'
import { type Locale, useI18n } from '#i18n'
import { useRouteHelpers } from '~/composables'

const config = useRuntimeConfig()
const route = useRoute()
const availableShops = useAvailableShops()
const i18n = useI18n()
const switchLocalePath = useSwitchLocalePath()
const { getLocalizedHref } = useRouteHelpers()

useSeoMeta({ robots: 'index,follow' })

useHead({
  link: [
    {
      rel: 'canonical',
      key: 'canonical',
      href: sanitizeCanonicalURL(`${config.public.baseUrl}${route?.fullPath}`),
    },
    ...availableShops.value.flatMap((shop) => {
      const href = getLocalizedHref(
        shop.path as Locale,
        switchLocalePath(shop.path as Locale),
      )

      const links = [
        {
          rel: 'alternate',
          hreflang: shop.locale,
          href,
        },
      ]
      if (shop.path === i18n.defaultLocale) {
        links.push({
          rel: 'alternate',
          hreflang: 'x-default',
          href,
        })
      }
      return links
    }),
  ],
})

defineOptions({ name: 'HomePage' })
definePageMeta({ pageType: 'homepage' })

const {
  $config: {
    public: { baseUrl, shopName },
  },
} = useNuxtApp()

useJsonld(
  () =>
    ({
      '@context': 'https://schema.org',
      '@type': 'OnlineStore',
      name: shopName,
      url: baseUrl,
      logo: `${baseUrl}/logo.svg`,
    }) as WithContext<OnlineStore>,
)
</script>
