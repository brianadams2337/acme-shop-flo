<template>
  <SFLink
    v-if="!isInEditorMode"
    v-bind="$attrs"
    :raw="raw"
    :to="getLocalizedRoute(to)"
    :target="target ? target : '_self'"
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
import type { CMSContentfulLink } from '../types'
import { useContentfulHelpers } from '../composables/useContentfulHelpers'
import { useLocalizedRoute } from '../../../composables/storefront/useLocalizedRoute'
import { SFLink } from '#storefront-ui/components'

const {
  to,
  target = '',
  openInNewTab = false,
  raw = true,
} = defineProps<CMSContentfulLink>()

const { isInEditorMode } = useContentfulHelpers()

const { getLocalizedRoute } = useLocalizedRoute()

defineOptions({ name: 'CMSContentfulLink' })
</script>
