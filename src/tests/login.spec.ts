import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Feature', () => {
  test('should NOT allow going to the inventory page', async ({ page }) => {
      await page.goto("/inventory.html");
      await expect(page).toHaveURL("/");
  });
  test('should login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.LOGIN_USERNAME!, process.env.LOGIN_PASSWORD!);
    await expect(page).toHaveURL("/inventory.html");
  });
  test('should NOT login with invalid username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("Yaser", process.env.LOGIN_PASSWORD!);
    await expect(page.locator('[data-test="error"]')).toContainText("Username and password do not match any user in this service");
  });
  test('should NOT login with invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.LOGIN_USERNAME!, "VEry good");
    await expect(page.locator('[data-test="error"]')).toContainText("Username and password do not match any user in this service");
  });
    test('should NOT login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("Yaser", "VEry good");
    await expect(page.locator('[data-test="error"]')).toContainText("Username and password do not match any user in this service");
  });
});