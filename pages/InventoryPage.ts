import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly sortDropdown: Locator;
  readonly inventoryItems: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.itemPrices = page.locator('[data-test="inventory-item-price"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }

  async addProductToCart(productName: string) {
    const productCard = this.inventoryItems.filter({ hasText: productName });
    await productCard.getByRole('button', { name: 'Add to cart' }).click();
  }

  async removeProductFromCart(productName: string) {
    const productCard = this.inventoryItems.filter({ hasText: productName });
    await productCard.getByRole('button', { name: 'Remove' }).click();
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async getAllProductNames(): Promise<string[]> {
    return await this.itemNames.allInnerTexts();
  }

  async getAllProductPrices(): Promise<number[]> {
    const priceTexts = await this.itemPrices.allInnerTexts();
    return priceTexts.map((price) => parseFloat(price.replace('$', '')));
  }
}