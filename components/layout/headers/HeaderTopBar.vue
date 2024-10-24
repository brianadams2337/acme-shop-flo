<template>
  <div class="hidden h-9 w-full bg-accent font-medium md:flex">
    <div class="container flex">
      <div class="flex gap-8 text-xs text-white">
        <p class="inline-flex items-center gap-1.5">
          <IconNewPayment class="size-3.5" />
          {{ $t('promises.flexible_payment') }}
        </p>
        <p class="inline-flex items-center gap-1.5">
          <IconNewDelivery class="size-3.5" />
          {{ $t('promises.free_shipping', { currency: currentShop.currency }) }}
        </p>
        <p class="inline-flex items-center gap-1.5">
          <IconNewFreeShipping class="size-3.5" />
          {{ $t('promises.return_policy') }}
        </p>
      </div>
      <div class="ml-auto flex gap-5 text-sm">
        <LocalizedLink
          data-testid="store-location-link"
          :to="routeList.location"
          raw
          class="flex shrink-0 items-center gap-1.5 whitespace-nowrap px-2 text-white -outline-offset-4"
        >
          <IconLocationMenu class="size-3.5" />
          {{ $t('navigation.location') }}
        </LocalizedLink>
        <ShopSwitcher />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ShopSwitcher from './ShopSwitcher.vue'
import { useCurrentShop } from '#storefront/composables'
import LocalizedLink from '~/components/LocalizedLink.vue'
import { routeList } from '~/utils/route'

const currentShop = useCurrentShop()
</script>
