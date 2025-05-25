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

  test('Cart should have added items (adding 1 item)', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    const itemIndex = 0

    await inventoryPage.goto();
    const itemNameToAdd = await inventoryPage.getItemName(itemIndex);
    await inventoryPage.toggleItemInCart(itemIndex);

    await test.step('Verify the button text changes to "Remove"', async () => {
      const buttonText = await inventoryPage.getItemCartButtonText(itemIndex);
      expect(buttonText).toContain('Remove');
    });

    await cartPage.goto();
    const itemsNames = await cartPage.getItemsNames();

    await test.step('Check that the cart has exactly 1 item', async () => {
      expect(itemsNames.length).toBe(1);
    });

    await test.step('Check that the added item is in the cart', async () => {
      expect(itemsNames).toContain(itemNameToAdd);
    });
  });

  test('Cart should have added items (adding 2 items)', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    const itemIndexes = [0, 1];
    const itemsNames: string[] = [];

    await inventoryPage.goto();

    for (const index of itemIndexes) {
      const name = await inventoryPage.getItemName(index);
      itemsNames.push(name!);
      await inventoryPage.toggleItemInCart(index);
    }

    await test.step('Verify the button text changes to "Remove"', async () => {
      for (const index of itemIndexes) {
        const buttonText = await inventoryPage.getItemCartButtonText(index);
        expect(buttonText).toContain('Remove');
      }
    });

    await cartPage.goto();
    const inCartItemsNames = await cartPage.getItemsNames();

    await test.step('Check that the cart has exactly 2 items', async () => {
      expect(inCartItemsNames.length).toBe(itemIndexes.length);
    });

    await test.step('Check that the added items are in the cart', async () => {
      for (const name of itemsNames) {
        expect(inCartItemsNames).toContain(name);
      }
    });
  });

});