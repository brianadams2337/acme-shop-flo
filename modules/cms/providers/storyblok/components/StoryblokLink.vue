<template>
  <SFLink
    v-if="!isInEditorMode"
    :raw="raw"
    :to="getLocalizedRoute(to)"
    :target="target"
    :open-in-new-tab="openInNewTab"
  >
    <slot />
  </SFLink>
  <div v-else :to="to">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { defineOptions } from 'vue'
import type { CMSStoryblokLink } from '../types'
import { useStoryblokHelpers } from '../composables/useStoryblokHelpers'
import { useLocalizedRoute } from '../../../composables/storefront/useLocalizedRoute'
import { SFLink } from '#storefront-ui/components'

const {
  to,
  target = '_self',
  openInNewTab = false,
  raw = true,
} = defineProps<CMSStoryblokLink>()

const { isInEditorMode } = useStoryblokHelpers()

const { getLocalizedRoute } = useLocalizedRoute()

defineOptions({ name: 'CMSStoryblokLink' })
</script>
