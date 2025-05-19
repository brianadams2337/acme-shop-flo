import type { Locator, Page } from '@playwright/test'
import type { RPC } from './components/rpc'

export class WishlistPage {
  private readonly page: Page
  readonly rpc: RPC

  readonly emptyState: Locator
  readonly buttonContinueShopping: Locator
  readonly buttonSignIn: Locator
  readonly emptyStateIcon: Locator
  readonly emptyStateHeadline: Locator
  readonly emptyStateSubheadline: Locator
  readonly wishlistItemsWrapper: Locator
  readonly wishlistCard: Locator
  readonly article: Locator
  readonly productBrand: Locator
  readonly buttonSize: Locator
  readonly buttonRemoveFromWishlist: Locator
  readonly h1: Locator
  readonly pageTitle: Locator

  constructor(page: Page, rpc: RPC) {
    this.page = page
    this.rpc = rpc
    this.emptyState = page.getByTestId('empty-state')
    this.buttonContinueShopping = page.getByTestId('button-continue-shopping')
    this.buttonSignIn = page.getByTestId('button-signin')
    this.emptyStateIcon = this.emptyState.getByTestId('empty-state-icon')
    this.emptyStateHeadline = this.emptyState.getByTestId(
      'empty-state-headline',
    )
    this.emptyStateSubheadline = this.emptyState.getByTestId(
      'empty-state-subheadline',
    )
    this.wishlistItemsWrapper = page.getByTestId('wishlist-items-wrapper')
    this.wishlistCard = this.wishlistItemsWrapper.getByTestId('wishlist-card')
    this.article = this.wishlistCard.getByTestId('article')
    this.productBrand = page.getByTestId('product-card-product-brand')
    this.buttonSize = this.article.getByTestId('wishlist-card-product-size')
    this.buttonRemoveFromWishlist = page.getByTestId(
      'remove-item-from-wishlist-button',
    )
    this.h1 = page.locator('h1')
    this.pageTitle = page.getByTestId('headline')
  }

  radioButtonSize(size: string): Locator {
    return this.page.getByTestId(`radio-button-${size}`)
  }

  async visitWishlistPage(path: string, baseUrl: string) {
    const url = baseUrl + path
    await this.page.goto(url, { waitUntil: 'commit' })
  }

  async addProductToWishlist(productId: number) {
    try {
      await this.rpc.call('addItemToWishlist', {
        productId,
      })
    } catch (error) {
      console.error('Error adding item to wishlist:', error)
      throw error
    }
  }

  async removeItemFromWishlist() {
    await this.wishlistCard.hover()
    await this.buttonRemoveFromWishlist.waitFor()
    await this.buttonRemoveFromWishlist.click()
    await this.page.waitForLoadState('domcontentloaded')
  }
}
