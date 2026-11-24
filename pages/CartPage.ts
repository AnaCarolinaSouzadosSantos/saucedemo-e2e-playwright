import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly cartItems: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]');
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  getCartItemByName(productName: string): Locator {
    return this.cartItems.filter({ hasText: productName });
  }

  async removeItemByName(productName: string) {
    const item = this.getCartItemByName(productName);
    await item.getByRole('button', { name: 'Remove' }).click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }
}