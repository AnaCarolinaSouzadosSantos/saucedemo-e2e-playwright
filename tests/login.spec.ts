import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { USERS } from '../fixtures/testData';

test.describe('Autenticação no SauceDemo', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Deve realizar login com sucesso usando usuário padrão', async ({ page }) => {
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });

  test('Deve exibir erro ao tentar logar com usuário bloqueado', async () => {
    await loginPage.login(USERS.locked.username, USERS.locked.password);
    await loginPage.expectErrorMessage('Sorry, this user has been locked out.');
  });

  test('Deve exibir erro ao inserir usuário ou senha inválidos', async () => {
    await loginPage.login(USERS.invalid.username, USERS.invalid.password);
    await loginPage.expectErrorMessage('Username and password do not match any user in this service');
  });
});
