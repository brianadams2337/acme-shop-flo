<template>
  <div>
    <StoryblokComponent :blok="story.content" />
  </div>
</template>

<script setup lang="ts">
defineProps({
  story: {
    type: Object as PropType<{ [key: string]: any }>,
    required: true,
  },
})
</script>
