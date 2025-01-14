---
'@scayle/storefront-boilerplate-nuxt': minor
---

[E2E] Introduced a `RPC` fixture which allows calling RPCs directly from the test code.

```ts
test('Some description', async ({ rpc }) => {
  const res = await rpc.call('addItemToWishlist', {
    productId: 123,
  })

  expect(res).toMatchObject({ productId: 123 })
})
```

This can be used to prepare some server-side state and improve test efficiency since the state doesn't have to be created through UI interactions anymore.
