import { StoryblokStory } from '@aboutyou/storyblok-generate-ts'
import { SbListingPage } from '~/storyblok/types/storyblok.gen'

export default (key: string) => {
  const cmsData = useState<StoryblokStory<SbListingPage>>(key)
  async function fetchBySlug(slug: string) {
    if (!slug) {
      return cmsData
    }
    try {
      const storyData = await useAsyncStoryblok(slug, {
        version: getStoryblokContentVersion(),
      })
      cmsData.value = storyData.value
    } catch (e) {
      console.error(`CMS Error :: `, e)
    }
  }
  return { fetchBySlug, cmsData }
}
