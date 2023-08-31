<template>
  <div>
    <StoryblokComponent :blok="story.content" />
    <!-- <StoryblokComponent :blok="story.content.content[7]" />
    <StoryblokComponent :blok="story.content.content[1]" />
    <StoryblokComponent :blok="story.content.content[2]" />
    <StoryblokComponent :blok="story.content.content[3]" />
    <StoryblokComponent :blok="story.content.content[4]" />
    <StoryblokComponent :blok="story.content.content[5]" />
    <StoryblokComponent :blok="story.content.content[6]" /> -->
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  story: {
    type: Object as PropType<{ [key: string]: any }>,
    required: true,
  },
})

console.log({
  component: props.story?.content?.content[7],
})
</script>
