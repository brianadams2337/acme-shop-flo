const WAIT_TIME = 1000

export default defineNuxtPlugin(() => {
  const gtm = useGtm()

  if (!gtm) {
    return
  }

  type Push = typeof gtm.push

  let lastIndex = -1
  const queue: Array<{ data: any; index: number }> = []

  const tracking: { push: Push } = {
    /**
     * Push data to GTM considering the "trackingEventOrder"
     */
    push: (data) => {
      const { trackingEventOrder } = useRuntimeConfig().public
      const index = data.event
        ? trackingEventOrder.indexOf(data.event) ?? -1
        : -1
      if (index === -1) {
        return queue.push({ data, index: lastIndex })
      }
      queue.push({ data, index })
      lastIndex = index
      flushDebounced()
    },
  }

  const flush = () => {
    const sorted = queue.sort((a, b) => a.index - b.index)
    sorted.forEach((item) => {
      if ('ecommerce' in item.data) {
        gtm.push({ ecommerce: null }) // Clear the previous ecommerce object.
      }

      gtm.push(item.data)
    })
    queue.length = 0
  }

  const flushDebounced = useDebounce({ delay: WAIT_TIME }, flush)

  useEventListener('beforeunload', flush)

  return {
    provide: { tracking },
  }
})
