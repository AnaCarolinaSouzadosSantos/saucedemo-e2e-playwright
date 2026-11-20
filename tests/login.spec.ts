import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { USERS } from '../fixtures/testData';

test.describe('Autenticação e Sessão no SauceDemo', () => {
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

  test('Deve exigir preenchimento de usuário e senha quando campos estão vazios', async () => {
    await loginPage.login('', '');
    await loginPage.expectErrorMessage('Username is required');

    await loginPage.login(USERS.standard.username, '');
    await loginPage.expectErrorMessage('Password is required');
  });

  test('Deve bloquear acesso direto ao inventário sem autenticação', async ({ page }) => {
    await page.goto('/inventory.html');
    await expect(page).toHaveURL('/');
    await loginPage.expectErrorMessage("You can only access '/inventory.html' when you are logged in.");
  });

  test('Deve realizar logout com sucesso pelo menu lateral', async ({ page }) => {
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await expect(page).toHaveURL(/inventory\.html/);

    await loginPage.logout();
    await expect(page).toHaveURL('/');
    await expect(loginPage.loginButton).toBeVisible();
  });
});