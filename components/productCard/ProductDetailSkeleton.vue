<template>
  <PageContent>
    <div class="flex max-w-6xl justify-between">
      <ProductCardSkeleton class="max-w-xl" />
      <div class="space-y-3">
        <Skeleton type="headline" full-width />

        <div class="w-12">
          <Skeleton type="headline" />
        </div>
        <Skeleton type="headline" full-width />
        <Skeleton type="headline" full-width />

        <Skeleton class="mt-20" type="button" />
      </div>
    </div>
  </PageContent>
</template>
