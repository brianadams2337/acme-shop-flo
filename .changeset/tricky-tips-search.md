---
'@scayle/storefront-application-nuxt': minor
---

**\[Promotions\]** Integrated newly introduced campaigns into the `SFDealRibbon` and `SFPromotionSlideIn` for `SFDealBanner` components.

In the process the components were refactored to simply display the related data and to avoid handling the specific promotion logic.
For that we introduced the `getCampaignDisplayData` and `getPromotionDisplayData` utilities which are used to get the display data for the promotion or campaign.
This reduces the complexity of the components and allows campaigns to be displayed within the same components.

Additionally we renamed the `SFProductPromotionBanner` to `SFDealBanner`, `SFPromotionRibbon` to `SFDealRibbon` and `SFPromotionTimer` to `SFDealTimer` to better reflect the purpose of the components.

Before:

```html
<SFProductPromotionBanner :promotion="promotion" show-condition />

<SFPromotionRibbon :promotion="promotion" />
```

After:

```html
<script setup lang="ts">
  import {
    getPromotionDisplayData,
    getCampaignDisplayData,
  } from '~/utils/promotion'
</script>

<SFDealBanner
  :display-data="getPromotionDisplayData(promotion)"
  show-condition
  track-event="select_promotion"
/>

<SFDealRibbon
  :display-data="getCampaignDisplayData(campaign)"
  track-event="view_campaign"
/>
```
