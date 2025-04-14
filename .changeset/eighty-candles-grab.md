---
'@scayle/storefront-boilerplate-nuxt': minor
---

**\[Promotions\]** Added the `@scayle/storefront-promotions` module.
Developers can now leverage the `useApplyPromotions` composable to integrate logic that automatically updates promotions on basket items during any basket change event (add, remove, update quantity).

- Example Usage

      ```ts
      import { useApplyPromotions } from '#storefront-promotions/composables/useApplyPromotions'

      const { data: basket, addItem  } = await useBasket()
      const { applyPromotions } = useApplyPromotions()

      await applyPromotions(basket)

      await addItem({...})
      await applyPromotions(basket)
      ```
