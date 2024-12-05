<template>
  <NuxtPage
    :root-categories="rootCategories"
    :fetching-categories="status === 'pending'"
    :all-categories="allCategories"
  />
</template>

<script setup lang="ts">
import { NuxtPage } from '#components'
import { useRootCategories } from '~/composables/useRootCategories'

const { rootCategories, status, allCategories } = useRootCategories({
  key: 'category-navigation-tree',
  children: 5,
})
</script>
