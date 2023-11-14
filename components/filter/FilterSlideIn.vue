<template>
  <SlideIn
    name="FilterSlideIn"
    slide-class="mt-[7rem] border-t border-l border-primary xl:inset-y-0"
    @open="onSlideInOpen"
    @close="trackFilterFlyout('close', 'true')"
  >
    <template #slideInHeader="{ toggle: toggleItem }">
      <FiltersHeader :toggle-item="toggleItem" />
    </template>
    <template #slideInBody>
      <FilterSlideInBody />
    </template>
    <template #slideInActions>
      <FilterActions />
    </template>
  </SlideIn>
</template>

<script setup lang="ts">
const { onSlideInOpen, trackFilterFlyout } = await useFilter()
</script>
