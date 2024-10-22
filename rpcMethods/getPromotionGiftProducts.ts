import {
  type RpcHandler,
  type RpcContext,
  rpcMethods,
  type Product,
} from '@scayle/storefront-core'

export const getPromotionGiftProducts: RpcHandler<
  { variantIds: number[] },
  Product[]
> = async function getPromotionGiftProducts(
  { variantIds },
  context: RpcContext,
) {
  const variantDetails = await rpcMethods.getVariantById(
    { ids: variantIds },
    context,
  )

  const uniqueProducts = await rpcMethods.getProductsByIds(
    {
      ids: variantDetails.map(({ productId }) => productId),
    },
    context,
  )

  return uniqueProducts
    .filter(({ isActive }) => isActive)
    .map((product) => {
      return {
        ...product,
        variants: product.variants?.filter(({ id }) => {
          return variantIds.includes(id)
        }),
      }
    })
}
