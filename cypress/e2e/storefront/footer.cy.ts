import { TEST_ITEM_REGULAR } from '../../support/constants'
import Footer from '../../pageObjects/components/footer'
import ProductPage from '../../pageObjects/productPage'
import HomePage from '../../pageObjects/homePage'

describe('Footer', () => {
  beforeEach(() => {
    ProductPage.openProduct(TEST_ITEM_REGULAR.link)
    ProductPage.waitForPageToBeDisplayed()
    HomePage.closePromotionButton()
  })

  afterEach(() => {
    cy.clearSiteData()
  })

  it('click on FAQ', () => {
    Footer.assertFooterIsDisplayed()
    Footer.openFaq()
  })

  it('click on Imprint page', () => {
    Footer.assertFooterIsDisplayed()
    Footer.openImprint()
  })

  it('check Storyblok content', () => {
    Footer.assertFooterIsDisplayed()
    Footer.assertStoryblokContent()
  })
})
