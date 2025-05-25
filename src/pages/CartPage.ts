import { Locator, Page } from '@playwright/test';

export class CartPage {
  private cart_link: Locator;
  private items_list: Locator;

  constructor(private page: Page) {
    this.cart_link = this.page.locator('[data-test="shopping-cart-link"]');
    this.items_list = this.page.locator('[data-test="cart-list"]');
  }

  async goto() {
    await this.page.goto('/cart.html');
  }

  async navigateUsingCartButton() {
    await this.cart_link.click()
  }
  
  async getItemsNames(){
    const items = this.items_list.locator(':scope > [data-test="inventory-item"]');
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

  async getItemName(itemNumber: number){
    const items = this.items_list.locator(':scope > [data-test="inventory-item"]');
    const item = items.nth(itemNumber)
    const nameLocator = item.locator('[data-test="inventory-item-name"]');
    await nameLocator.waitFor({ state: 'visible' });
    const nameText = await nameLocator.textContent();
    return nameText
  }
  
  async toggleItemInCart(itemNumber: number){
    const items = this.items_list.locator(':scope > [data-test="inventory-item"]');
    const item = items.nth(itemNumber)
    await item.waitFor({state: "visible"})
    const addToCartButton = item.locator('button')
    await addToCartButton.click()
  }

  async getItemCartButtonText(itemNumber: number){
    const items = this.items_list.locator(':scope > [data-test="inventory-item"]');
    const item = items.nth(itemNumber)
    const addToCartButton = item.locator("button")
    return await addToCartButton.textContent()
  }


}