import { expect, test } from '../fixtures/fixtures'

test.beforeEach(async ({ homePage, countryDetector }) => {
  await homePage.visitPage()
  await countryDetector.closeModal()
})

test('C2140757 Verify Promotion bar shown and hidden state', async ({
  promotions,
}) => {
  await test.step('Verify open state', async () => {
    await expect(async () => {
      await promotions.assertPromoBarOpen()
    }).toPass()
  })
  await test.step('Verify closed state', async () => {
    await expect(async () => {
      await promotions.assertPromoBarClosed()
    }).toPass()
  })
})

test('C2140759 C2140758 Verify Promotion bar expanded state features', async ({
  promotions,
  page,
}) => {
  await test.step('Expand the promotion bar', async () => {
    await promotions.expandPromotionBar()
    await promotions.assertPromotionBarExpanded()
  })
  await test.step('Close promotion bar', async () => {
    await promotions.closePromotionBar()
  })
  await test.step('Scroll to bottom and check sticky behavior', async () => {
    await expect(async () => {
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight)
      })
      await promotions.assertScrollBehavior()
    }).toPass()
  })
})
