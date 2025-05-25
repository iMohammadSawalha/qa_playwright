import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { testCartAddRemoveFromCart, testCartAddRemoveFromInventory } from '../helpers/cart-add-remove';


test.describe('Remove from Cart Feature (Using Inventory Buttons)', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.LOGIN_USERNAME!, process.env.LOGIN_PASSWORD!);
  });

  test('Should remove using remove button in inventory page (removing items 2 of 2)', async ({ page }) => {
    const toAddItemsIndexes = [0,1];

    const toRemoveItemsIndexes = [0,1];

    await testCartAddRemoveFromInventory({page, toAddItemsIndexes, toRemoveItemsIndexes})
  });

  test('Should remove using remove button in inventory page (removing items 1(first) of 2)', async ({ page }) => {
    const toAddItemsIndexes = [0,1];

    const toRemoveItemsIndexes = [0];

    await testCartAddRemoveFromInventory({page, toAddItemsIndexes, toRemoveItemsIndexes})
  });

  test('Should remove using remove button in inventory page (removing items 1(second) of 2)', async ({ page }) => {
    const toAddItemsIndexes = [0,1];

    const toRemoveItemsIndexes = [1];

    await testCartAddRemoveFromInventory({page, toAddItemsIndexes, toRemoveItemsIndexes})
  });
});

test.describe('Remove from Cart Feature (Using Cart Buttons)', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.LOGIN_USERNAME!, process.env.LOGIN_PASSWORD!);
  });

  test('Should remove using remove button in cart page (removing items 2 of 2)', async ({ page }) => {
    const toAddItemsIndexes = [0,1];

    const toRemoveItemsIndexes = [0,1];

    await testCartAddRemoveFromCart({page, toAddItemsIndexes, toRemoveItemsIndexes})
  });

  test('Should remove using remove button in cart page (removing items 1(first) of 2)', async ({ page }) => {
    const toAddItemsIndexes = [0,1];

    const toRemoveItemsIndexes = [0];

    await testCartAddRemoveFromCart({page, toAddItemsIndexes, toRemoveItemsIndexes})
  });

  test('Should remove using remove button in cart page (removing items 1(second) of 2)', async ({ page }) => {
    const toAddItemsIndexes = [0,1];

    const toRemoveItemsIndexes = [1];

    await testCartAddRemoveFromCart({page, toAddItemsIndexes, toRemoveItemsIndexes})
  });
});