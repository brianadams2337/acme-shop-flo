<template>
  <SFLink
    v-if="pathParams && pathParams.path"
    :to="pathParams.path"
    :type="type"
    :raw="raw"
    :open-in-new-tab="pathParams.openInNew"
    @mouseenter="emit('mouseenter:navigation-item')"
  >
    {{ displayName }}
  </SFLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { NavigationTreeItem } from '@scayle/storefront-nuxt'
import type { LinkVariant } from '#storefront-ui'
import { useRouteHelpers } from '~/composables'
import { SFLink } from '#storefront-ui/components'

type Props = {
  navigationItem: NavigationTreeItem | null
  type?: LinkVariant
  raw?: boolean
}

const { navigationItem = null, type, raw = false } = defineProps<Props>()

const { buildCategoryPath, getLocalizedRoute } = useRouteHelpers()

const emit = defineEmits<{ 'mouseenter:navigation-item': [] }>()

const pathParams = computed(() => {
  if (!navigationItem) {
    return
  }
  if (navigationItem.type === 'category' && navigationItem.category) {
    return {
      path: buildCategoryPath(navigationItem.category),
      openInNew: false,
    }
  }
  if (navigationItem.type === 'page') {
    return {
      path: getLocalizedRoute(navigationItem.page),
      openInNew: true,
    }
  }

  if (
    navigationItem.type === 'external' ||
    navigationItem.type === 'individual-link'
  ) {
    return {
      path: getLocalizedRoute(navigationItem.options?.url ?? ''),
      openInNew: navigationItem.options?.isOpenInNewWindows ?? false,
    }
  }
  return null
})
const displayName = computed(() => navigationItem?.name)
</script>
