import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.describe('Vitrine e Carrinho de Compras - SauceDemo', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/.*inventory\.html/);
  });

  test('Cenário 1 — Ordenação de produtos por preço (menor para maior) e nome (Z-A)', async () => {
    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.getAllProductPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);

    await inventoryPage.sortBy('za');
    const names = await inventoryPage.getAllProductNames();
    const sortedNames = [...names].sort().reverse();
    expect(names).toEqual(sortedNames);
  });

  test('Cenário 2 — Adicionar produtos pela vitrine e validar badge do carrinho', async () => {
    await expect(inventoryPage.cartBadge).toBeHidden();

    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await expect(inventoryPage.cartBadge).toHaveText('1');

    await inventoryPage.addProductToCart('Sauce Labs Bike Light');
    await expect(inventoryPage.cartBadge).toHaveText('2');
  });

  test('Cenário 3 — Remover produto diretamente pela vitrine', async () => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.addProductToCart('Sauce Labs Bolt T-Shirt');
    await expect(inventoryPage.cartBadge).toHaveText('2');

    await inventoryPage.removeProductFromCart('Sauce Labs Backpack');
    await expect(inventoryPage.cartBadge).toHaveText('1');

    await inventoryPage.removeProductFromCart('Sauce Labs Bolt T-Shirt');
    await expect(inventoryPage.cartBadge).toBeHidden();
  });

  test('Cenário 4 — Validar itens e remover produto dentro da tela do carrinho', async ({ page }) => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.addProductToCart('Sauce Labs Fleece Jacket');

    await inventoryPage.goToCart();
    await expect(page).toHaveURL(/.*cart\.html/);
    await expect(cartPage.pageTitle).toHaveText('Your Cart');
    await expect(cartPage.cartItems).toHaveCount(2);

    await cartPage.removeItemByName('Sauce Labs Backpack');
    await expect(cartPage.cartItems).toHaveCount(1);
    await expect(cartPage.getCartItemByName('Sauce Labs Fleece Jacket')).toBeVisible();
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });

  test('Cenário 5 — Persistência dos itens no carrinho ao recarregar e navegar', async ({ page }) => {
    await inventoryPage.addProductToCart('Sauce Labs Onesie');
    await expect(inventoryPage.cartBadge).toHaveText('1');

    await page.reload();
    await expect(inventoryPage.cartBadge).toHaveText('1');

    await inventoryPage.goToCart();
    await expect(cartPage.getCartItemByName('Sauce Labs Onesie')).toBeVisible();

    await cartPage.continueShopping();
    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });
});