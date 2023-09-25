<template>
  <div>
    <CmsImage v-if="hasTeaserImage" :blok="content" is-teaser />
    <component
      :is="preContent.component"
      v-for="preContent in preListingContent"
      :key="preContent._uid"
      :blok="preContent" />

    <component
      :is="postContent.component"
      v-for="postContent in postListingContent"
      :key="postContent._uid"
      :blok="postContent" />
    <!-- <keep-alive>
    </keep-alive>


    <PageContent>
      <div class="relative">
        <Intersect @enter="trackViewListing">
          <ProductList
            class="mt-4 grid w-auto grid-cols-12 gap-1"
            :refreshing="fetchingProducts"
            :loading="fetchingProducts"
            :products="products" />
        </Intersect>
      </div>
      <Lazy>
        <Pagination
          v-if="pagination"
          :current-page="pagination.page"
          :first-page="pagination.first"
          :last-page="pagination.last" />
      </Lazy>
    </PageContent>

 -->
  </div>
</template>
<script setup lang="ts">
const route = useRoute()
const slug = computed(() => route.params.slug)
console.log({ route: route.fullPath })
// const { products, fetchProducts } = await useFacet({
//   key: 'lookbooks-plp-1',
//   params: {
//     with: {
//       product: {
//         attributes: {
//           withKey: ['brand', 'name'],
//         },
//         variants: {
//           attributes: {
//             withKey: ['price'],
//           },
//           lowestPriorPrice: true,
//         },
//         images: {
//           attributes: {
//             withKey: ['imageType', 'imageView', 'imageBackground'],
//           },
//         },
//       },
//     },
//   },
// })

// fetchProducts({ path: '/lookbooks/winter-wonderland' })

const { fetchBySlug, data: cmsData } = useCms(`lookbooks-plp-${slug.value}`)
await fetchBySlug('lookbooks/3026')
const { content, hasTeaserImage, preListingContent, postListingContent } =
  useCmsListingContent(cmsData)
</script>

<script lang="ts">
export default {
  name: 'LookbookPLP',
}
</script>
