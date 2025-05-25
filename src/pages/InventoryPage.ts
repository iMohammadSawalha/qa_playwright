import { Locator, Page } from '@playwright/test';

export class InventoryPage {
  private product_sort: Locator;
  private items_list: Locator;

  constructor(private page: Page) {
    this.product_sort = this.page.locator('[data-test="product-sort-container"]');
    this.items_list = this.page.locator('[data-test="inventory-list"]');
  }

  async goto() {
    await this.page.goto('/inventory.html');
  }

  async sortItems(option: "az" | "za" | "lohi" | "hilo") {
    this.product_sort.selectOption({value: option})
  }

  async getItemsNames(){
    const items = this.items_list.locator(':scope > *');
    const count = await items.count();

    const names: string[] = []

    for (let i = 0; i < count; ++i) {
      const item = items.nth(i);
      const nameLocator = item.locator('[data-test="inventory-item-name"]');
      await nameLocator.waitFor({ state: 'visible' });
      const nameText = await nameLocator.textContent();
      names.push(nameText!)
    }

    return names
  }

  async getItemsPrices(){
    const items = this.items_list.locator(':scope > *');
    const count = await items.count();

    const prices: number[] = []

    for (let i = 0; i < count; ++i) {
      const item = items.nth(i);
      const priceLocator = item.locator('[data-test="inventory-item-price"]');
      await priceLocator.waitFor({ state: 'visible' });
      const priceText = await priceLocator.textContent();
      prices.push(Number.parseFloat(priceText?.replace("$", "")!))
    }
    
    return prices
  }

  async getItemPrice(itemNumber: number){
    const items = this.items_list.locator(':scope > *');
    const item = items.nth(itemNumber)
    const priceLocator = item.locator('[data-test="inventory-item-price"]');
    await priceLocator.waitFor({ state: 'visible' });
    const priceText = await priceLocator.textContent();
    return Number.parseFloat(priceText?.replace("$", "")!)
  }

  async getItemName(itemNumber: number){
    const items = this.items_list.locator(':scope > *');
    const item = items.nth(itemNumber)
    const nameLocator = item.locator('[data-test="inventory-item-name"]');
    await nameLocator.waitFor({ state: 'visible' });
    const nameText = await nameLocator.textContent();
    return nameText
  }
  
  async toggleItemInCart(itemNumber: number){
    const items = this.items_list.locator(':scope > *');
    const item = items.nth(itemNumber)
    await item.waitFor({state: "visible"})
    const addToCartButton = item.locator('button')
    await addToCartButton.click()
  }

  async getItemCartButtonText(itemNumber: number){
    const items = this.items_list.locator(':scope > *');
    const item = items.nth(itemNumber)
    const addToCartButton = item.locator("button")
    return await addToCartButton.textContent()
  }
  

}