import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { isSorted, isSortedNumbers } from '../utils';
import { LoginPage } from '../pages/LoginPage';


test.describe('Sorting Feature', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.LOGIN_USERNAME!, process.env.LOGIN_PASSWORD!);
  });

  test('Default sorting should be A to Z', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
    const itemsNames = await inventoryPage.getItemsNames()
    expect(isSorted(itemsNames, 'az')).toBe(true);
  });

  test('Should sort A to Z', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
    await inventoryPage.sortItems('az')
    const itemsNames = await inventoryPage.getItemsNames()
    expect(isSorted(itemsNames, 'az')).toBe(true);
  });
  test('Should sort Z to A', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
    await inventoryPage.sortItems('za')
    const itemsNames = await inventoryPage.getItemsNames()
    expect(isSorted(itemsNames, 'za')).toBe(true);
  });

  test('Should sort Low to High', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
    await inventoryPage.sortItems('lohi')
    const itemsPrices = await inventoryPage.getItemsPrices()
    expect(isSortedNumbers(itemsPrices, 'lohi')).toBe(true);
  });

  test('Should sort High to Low', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
    await inventoryPage.sortItems('hilo')
    const itemsPrices = await inventoryPage.getItemsPrices()
    expect(isSortedNumbers(itemsPrices, 'hilo')).toBe(true);
  });
});