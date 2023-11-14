<template>
  <div class="grid grid-cols-2 gap-2">
    <AppButton
      data-test-id="reset-filter-button"
      type="tertiary"
      class="text-sm !capitalize"
      @click="resetFilters"
      >{{ $t('filter.reset_all') }}
    </AppButton>
    <AppButton
      data-test-id="apply-filter-button"
      is-full-width
      type="primary"
      class="text-sm !capitalize"
      @click="applyFilters()"
    >
      {{
        filteredCount !== unfilteredCount
          ? $t('filter.show_results_count', { count: filteredCount })
          : $t('filter.show_results')
      }}
    </AppButton>
  </div>
</template>

<script setup lang="ts">
const { resetFilters, applyFilters, unfilteredCount, filteredCount } =
  await useFilter()
</script>
