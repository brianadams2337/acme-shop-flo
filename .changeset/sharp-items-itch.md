---
'@scayle/storefront-application-nuxt': minor
---

**\[Promotions\]** Revised the data structure for custom data associated with promotions.
Refer to the `PromotionCustomData` TypeScript interface for the new schema details (including fields like `headline`, `product`, `color`, `link`, etc.).
The `SFBasketSummaryPromotions.vue` component has been updated to work with this new structure.

- New `PromotionCustomData` Interface:
  `ts
interface PromotionCustomData {
  product?: {
    attributeId: number
    badgeLabel: string
  }
  headline?: string
  subline?: string
  conditions?: string
  minimumOrderValue?: CentAmount
  color?: {
    background: string
    text: string
  }
  hideCountdown?: boolean
  link?: string
}
`
