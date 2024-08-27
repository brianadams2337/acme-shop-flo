<template>
  <div>
    <slot :data="data?.data.story" :pending="status === 'pending'" />
  </div>
</template>

<script setup lang="ts">
import type { SbContentPage } from '../../types'
import { useCMS } from '../../composables/useCMS'
import { useStoryblokEditor } from '../../composables/useStoryblokEditor'

const props = defineProps<{
  slug: string
}>()

const { fetchBySlug } = useCMS(`content-page-${props.slug}`)

const { data, status } = await fetchBySlug<SbContentPage>(
  `content/${props.slug}`,
)

useStoryblokEditor<SbContentPage>(data)
</script>
