<template>
  <CMSImage
    v-if="hasTeaserImage"
    :blok="content as SbCmsImage"
    is-teaser
    is-cover
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SbListingPage, SbCmsImage } from '../types'
import { useCMSBySlug } from '../composables/useCMS'
import { useStoryblokEditor } from '../composables/useStoryblokEditor'
import CMSImage from './Image.vue'
import { useRoute } from '#app/composables/router'

const { categoryId } = defineProps<{ categoryId: number }>()

const route = useRoute()

const { data } = useCMSBySlug<SbListingPage>(
  `listing-page-${route.path}`,
  // NOTE: We need to pass both the `c/` path, as well as the prefix `c-` plus
  // the selected categoryID to the useCMSBySlug composables.
  // Storyblok requires also to set `c-{selectedCategory} to be set as `Slug`
  // within the related story.
  // This allows the Storyblok Preview functionality to properly work.
  `c/c-${categoryId}`,
)

useStoryblokEditor<SbListingPage>(data)

const content = computed(() => data.value?.data.story.content || {})

const hasTeaserImage = computed(() => {
  return !!data.value?.data.story.content.teaser_image?.filename
})

defineOptions({ name: 'CMSProductListingPageTeaser' })
</script>
