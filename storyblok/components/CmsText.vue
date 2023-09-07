<template>
  <div v-editable="blok" class="prose-sm fill-current">
    <div
      :class="{
        '[&>p:first-child]:!mt-0': noMarginTop,
      }"
      v-html="content" />
  </div>
</template>

<script lang="ts" setup>
import { CmsTextStoryblok } from '../types/component-types-sb'

const props = defineProps({
  blok: {
    type: Object as PropType<CmsTextStoryblok>,
    required: true,
  },
  noMarginTop: {
    type: Boolean,
    default: false,
  },
})

const content = computed(() =>
  props.blok.body ? renderRichText(props.blok.body) : null,
)
</script>
