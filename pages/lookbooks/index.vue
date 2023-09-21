<template>
  <div class="mb-24">
    <div v-for="story in lookbooksData" :key="story.uuid">
      <DefaultLink
        v-if="routeList.lookbooks.parameter"
        raw
        :to="{
          name: routeList.lookbooks.name,
          params: {
            [routeList.lookbooks.parameter]: prepareForUrl(story.name),
          },
        }">
        <NuxtPicture
          class="picture picture-contain hidden w-full sm:block"
          height="800px"
          provider="storyblok"
          :src="story.content.teaser_image.filename"
          :alt="story.content.teaser_image.alt" />
        <NuxtPicture
          v-if="story.content.teaser_image_mobile"
          class="picture picture-contain w-full sm:hidden"
          provider="storyblok"
          :src="story.content.teaser_image_mobile.filename"
          :alt="story.content.teaser_image_mobile.alt" />
      </DefaultLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { slugify } from '@scayle/storefront-nuxt'

// Limitation of useStoryblokAsync not being able to fetch multiple stories, thus as a work around using storyblokApi
// https://github.com/storyblok/storyblok-nuxt/issues/547#issuecomment-1697844103
const storyApi = useStoryblokApi()
const {
  data: { stories: lookbooksData },
} = await storyApi.getStories({ starts_with: 'lookbooks' })

const prepareForUrl = (path: string) => slugify(path)
</script>
