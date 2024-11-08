<template>
  <SFLink
    v-if="pathParams && pathParams.path"
    :to="pathParams.path"
    :type="type"
    :target="pathParams.openInNew ? '_blank' : '_self'"
    :class="{ '!p-0': iconUrl }"
    @mouseenter="emit('mouseenter:navigation-item')"
  >
    <div v-if="iconUrl" class="flex size-9 rounded-md border bg-gray-50">
      <object
        :data="iconUrl"
        type="image/svg+xml"
        :aria-label="displayName"
        class="pointer-events-none m-auto size-4"
        tabindex="-1"
      ></object>
    </div>
    <span v-else>
      {{ displayName }}
    </span>
  </SFLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { NavigationTreeItem } from '@scayle/storefront-nuxt'
import { useRuntimeConfig } from '#imports'
import type { LinkVariant } from '#storefront-ui'
import { useRouteHelpers } from '~/composables'
import { SFLink } from '#storefront-ui/components'

type Props = {
  navigationItem: NavigationTreeItem | null
  type?: LinkVariant
}

const { navigationItem = null, type } = defineProps<Props>()

const { buildCategoryPath, getLocalizedRoute } = useRouteHelpers()

const {
  public: { cdnUrl },
} = useRuntimeConfig()

const iconUrl = computed(() => {
  const assets = Object.values(navigationItem?.assets ?? {})
  if (!cdnUrl || !assets.length || !assets[0].endsWith('svg')) {
    return
  }
  return cdnUrl + assets[0]
})

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
