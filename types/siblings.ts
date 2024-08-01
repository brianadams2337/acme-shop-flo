import type { ProductImage, Value } from '@scayle/storefront-nuxt'

export type ProductSibling = {
  id: number
  name: string
  image: ProductImage | null
  colors: Value[]
}
