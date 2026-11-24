import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Fluxo de Checkout', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // Adiciona um item e avança para o checkout utilizando o módulo da Gaby
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
  });

  test('deve finalizar uma compra com sucesso', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.fillInformation('Ana', 'Silva', '50000-000');
    await checkoutPage.continueToOverview();

    await expect(page).toHaveURL(/.*checkout-step-two.html/);
    await checkoutPage.finishOrder();

    await expect(page).toHaveURL(/.*checkout-complete.html/);
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });

  test('deve exibir erro ao tentar continuar sem preencher o primeiro nome', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.fillInformation('', 'Silva', '50000-000');
    await checkoutPage.continueToOverview();

    await expect(checkoutPage.errorMessage).toContainText('Error: First Name is required');
  });

  test('deve exibir erro ao tentar continuar sem preencher o apelido', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.fillInformation('Ana', '', '50000-000');
    await checkoutPage.continueToOverview();

    await expect(checkoutPage.errorMessage).toContainText('Error: Last Name is required');
  });

  test('deve exibir erro ao tentar continuar sem preencher o código postal', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.fillInformation('Ana', 'Silva', '');
    await checkoutPage.continueToOverview();

    await expect(checkoutPage.errorMessage).toContainText('Error: Postal Code is required');
  });
});