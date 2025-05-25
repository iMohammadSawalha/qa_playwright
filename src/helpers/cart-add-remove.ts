import test, { Page, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';


/**
 * Performs the remove from the Inventory Page
 */
export async function testCartAddRemoveFromInventory({
  page,
  toAddItemsIndexes,
  toRemoveItemsIndexes,
 }: {
  page: Page;
  toAddItemsIndexes: number[];
  toRemoveItemsIndexes: number[];
}) {
    // we start from the biggest index to the lowest, because if we removed the index 0, then the one with index 1 becomes index 0
    const sortedToRemoveItemsIndexes = toRemoveItemsIndexes.sort((a, b) => b - a);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    const toAddItemsNames: string[] = [];
    const toRemoveItemsNames: string[] = [];

    
    await inventoryPage.goto();
    
    for (const index of toAddItemsIndexes) {
      const name = await inventoryPage.getItemName(index);
      toAddItemsNames.push(name!);
      await inventoryPage.toggleItemInCart(index);
    }

    for (const index of sortedToRemoveItemsIndexes) {
      const name = await inventoryPage.getItemName(index);
      toRemoveItemsNames.push(name!);
      await inventoryPage.toggleItemInCart(index);
    }
    
    await test.step('Verify the button text changes to "Add to cart"', async () => {
      for (const index of sortedToRemoveItemsIndexes) {
        const buttonText = await inventoryPage.getItemCartButtonText(index);
        expect(buttonText).toContain('Add to cart');
      }
    });
    
    await cartPage.goto();
    const inCartItemsNames = await cartPage.getItemsNames();
    
    await test.step('Check that the number of items in the cart is correct', async () => {
      expect(inCartItemsNames.length).toBe(toAddItemsNames.length - toRemoveItemsNames.length);
    });
    
    await test.step('Check that the removed items are NOT in the cart', async () => {
      for (const name of toRemoveItemsNames) {
        expect(inCartItemsNames).not.toContain(name);
      }
    });
}

/**
 * Performs the remove from the Cart Page
 */
export async function testCartAddRemoveFromCart({
  page,
  toAddItemsIndexes,
  toRemoveItemsIndexes,
 }: {
  page: Page;
  toAddItemsIndexes: number[];
  toRemoveItemsIndexes: number[];
}) {
    // we start from the biggest index to the lowest, because if we removed the index 0, then the one with index 1 becomes index 0
    const sortedToRemoveItemsIndexes = toRemoveItemsIndexes.sort((a, b) => b - a);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    const toAddItemsNames: string[] = [];
    const toRemoveItemsNames: string[] = [];

    
    await inventoryPage.goto();
    
    for (const index of toAddItemsIndexes) {
      const name = await inventoryPage.getItemName(index);
      toAddItemsNames.push(name!);
      await inventoryPage.toggleItemInCart(index);
    }

    await cartPage.goto();
    
    for (const index of sortedToRemoveItemsIndexes) {
      const name = await cartPage.getItemName(index);
      toRemoveItemsNames.push(name!);
      await cartPage.toggleItemInCart(index);
    }
    
    const inCartItemsNames = await cartPage.getItemsNames();
    
    await test.step('Check that the number of items in the cart is correct', async () => {
      expect(inCartItemsNames.length).toBe(toAddItemsNames.length - toRemoveItemsNames.length);
    });
    
    await test.step('Check that the removed items are NOT in the cart', async () => {
      for (const name of toRemoveItemsNames) {
        expect(inCartItemsNames).not.toContain(name);
      }
    });
}