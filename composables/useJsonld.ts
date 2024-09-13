import { toValue, type MaybeRefOrGetter } from 'vue'
import { useHead } from '@unhead/vue'
import type { WithContext, Thing, Graph } from 'schema-dts'

export function useJsonld(
  json: MaybeRefOrGetter<
    WithContext<Thing> | WithContext<Thing>[] | Graph | undefined
  >,
) {
  useHead(() => {
    const value = toValue(json)
    if (!value) {
      return {}
    }
    return {
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(value, null, ''),
        },
      ],
    }
  })
}
