import {
  type Variant,
  type Value,
  getCategoriesByRoute,
  getBreadcrumbs,
  getAttributeValue,
  getPrice,
  getProductSiblings,
  getVariantBySize,
} from '@scayle/storefront-nuxt'

const listingMetaData = {
  name: 'PDP',
  id: 'PDP',
}

export default async () => {
  const route = useRoute()

  const productId = computed(() => {
    return String(route.params.slug)?.substring(
      route.params.slug.lastIndexOf('-') + 1,
    )
  })

  const {
    data: product,
    error,
    fetching,
  } = await useProduct({
    params: {
      id: parseInt(productId.value),
      with: PRODUCT_WITH_PARAMS,
    },
    options: {
      lazy: true,
    },
    key: `useProduct-${productId.value}`,
  })

  if (error.value) {
    throw error.value
  }

  const { id, brand, name, variantWithLowestPrice } =
    useProductBaseInfo(product)

  const activeVariant = useState<Variant | undefined>('active-variant')
  const quantity = useState<number>('product-quantity', () => 1)

  const lowestPriorPrice = computed(
    () =>
      activeVariant.value?.lowestPriorPrice ||
      variantWithLowestPrice.value?.lowestPriorPrice ||
      product.value?.lowestPriorPrice,
  )

  const price = computed(() =>
    activeVariant.value
      ? getPrice(activeVariant.value)
      : variantWithLowestPrice.value?.price,
  )

  const handleSelectedSize = (value: Value) => {
    if (product.value?.variants) {
      activeVariant.value = getVariantBySize(
        product.value?.variants,
        value,
        'size',
      )
    }
  }

  const hasOneSizeVariantOnly = computed(() => {
    const variants = product.value?.variants
    return (
      variants?.length === 1 &&
      getAttributeValue(variants[0].attributes, 'size') === ONE_SIZE_KEY
    )
  })

  const hasSpecial = computed(() => {
    return Boolean(
      !activeVariant.value && price.value?.appliedReductions.length,
    )
  })

  const img = useImage()
  const imageOptions = {
    sizes: 'sm:100vw md:100vw',
    modifiers: { quality: '75' },
    provider: 'default',
  }

  const images = computed(() => {
    const images = product.value?.images
    return images.map(({ hash }) => img?.getImage(hash, imageOptions).url) || []
  })

  const siblings = computed(() => {
    return getProductSiblings(product.value, 'color') || []
  })

  const availableQuantity = computed(() => {
    return getQuantitySelectionList(activeVariant.value?.stock.quantity, true)
  })

  const categories = computed(() => {
    return product.value ? getCategoriesByRoute(product.value, null) : []
  })

  const breadcrumbs = computed(() => getBreadcrumbs(categories.value))

  return {
    id,
    brand,
    name,
    price,
    lowestPriorPrice,
    siblings,
    activeVariant,
    hasOneSizeVariantOnly,
    images,
    hasSpecial,
    handleSelectedSize,
    availableQuantity,
    quantity,
    categories,
    breadcrumbs,
    fetching,
    product,
    listingMetaData,
  }
}
