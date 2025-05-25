import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';
import { InventoryPage } from '../pages/InventoryPage';


test.describe('Add to Cart Feature', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.LOGIN_USERNAME!, process.env.LOGIN_PASSWORD!);
  });

  test('Cart button should navigate to cart page', async ({ page }) => {
    const inventoryPage = new InventoryPage(page)
    await inventoryPage.goto()
    const cartPage = new CartPage(page);
    await cartPage.navigateUsingCartButton();
    await expect(page).toHaveURL("/cart.html");
  });

  test('Cart should be empty be default', async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.goto();
    const itemsNames = await cartPage.getItemsNames()
    expect(itemsNames.length).toBe(0)
  });
});