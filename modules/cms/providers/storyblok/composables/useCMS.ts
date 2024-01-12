import type { ISbStoriesParams } from 'storyblok-js-client'

export default function useCMS<_T = unknown>(key: string) {
  const storyblokApi = useStoryblokApi()
  const storyblokOptions = useDefaultStoryblokOptions()

  async function fetchBySlug(slug: string) {
    return await useAsyncData(
      key,
      () => storyblokApi.get(`cdn/stories/${slug}`, storyblokOptions),
      {
        immediate: false,
      },
    )
  }

  async function fetchByFolder(folder: string, options?: ISbStoriesParams) {
    return await useAsyncData(
      key,
      () =>
        storyblokApi.getStories({
          ...storyblokOptions,
          starts_with: folder,
          ...options,
        }),
      {
        immediate: false,
      },
    )
  }

  return { fetchBySlug, fetchByFolder }
}
