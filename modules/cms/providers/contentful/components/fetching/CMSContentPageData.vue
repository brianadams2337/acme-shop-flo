<template>
  <div>
    <slot :data="resData" :pending="status === 'pending'" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type {
  TypeContentPageSkeleton,
  TypeContentPageWithoutUnresolvableLinksResponse,
} from '../../types'
import { useCMS } from '../../composables/useCMS'
import { useContentfulEditor } from '../../composables/useContentfulEditor'

const props = defineProps<{
  slug: string
}>()

const { fetchBySlug } = useCMS(`content-page-${props.slug}`)

const { data, status } = await fetchBySlug<TypeContentPageSkeleton>({
  content_type: 'contentPage',
  'fields.slug[match]': `content/${props.slug}`,
})

const resData = computed(() => {
  const res = data.value as TypeContentPageWithoutUnresolvableLinksResponse

  return {
    ...res,
    uuid: res.fields.uid ?? '',
    _uid: res.fields.uid ?? '',
    slug: res.fields.slug ?? '',
    teaser_image: res.fields.teaserImage ?? '',
    teaser_image_mobile: res.fields.teaserImageMobile ?? '',
    headline: res.fields.headline ?? '',
    subline: res.fields.subline ?? '',
    content: res.fields.content ?? [],
    name: res.fields.headline ?? '',
    seo: res.fields.seo ?? {},
  }
})

useContentfulEditor<TypeContentPageSkeleton>(data)
</script>
