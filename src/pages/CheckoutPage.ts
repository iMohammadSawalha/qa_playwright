import { Locator, Page } from '@playwright/test';

export class CheckoutPage {
  private checkout_button: Locator;
  private continue_to_step_two_button: Locator;
  private error_container: Locator;
  private complete_header: Locator;
  private finish: Locator;

  private first_name: Locator;
  private last_name: Locator;
  private postal_code: Locator;

  private subtotal: Locator;
  private total: Locator;
  private tax: Locator;

  constructor(private page: Page) {
    this.checkout_button = this.page.locator('button[data-test="checkout"]');
    this.continue_to_step_two_button = this.page.locator('[data-test="continue"]');
    this.error_container = this.page.locator('[data-test="error"]');
    this.complete_header = this.page.locator('[data-test="complete-header"]');
    this.finish = this.page.locator('[data-test="finish"]');

    this.first_name = this.page.locator('[data-test="firstName"]');
    this.last_name = this.page.locator('[data-test="lastName"]');
    this.postal_code = this.page.locator('[data-test="postalCode"]');

    this.subtotal = this.page.locator('[data-test="subtotal-label"]');
    this.total = this.page.locator('[data-test="total-label"]');
    this.tax = this.page.locator('[data-test="tax-label"]');
  }

  async gotoStepOne() {
    await this.page.goto('/checkout-step-one.html');
  }

  async navigateUsingCheckoutButton() {
    await this.checkout_button.click()
  }

  async navigateToStepTwo() {
    await this.continue_to_step_two_button.click()
  }
  
  async finishCheckout() {
    await this.finish.click()
  }

  async getCompleteHeaderText() {
    return await this.complete_header.textContent()
  }

  async getErrorText() {
    return await this.error_container.textContent()
  }

  async fillFirstName(value:string) {
    return await this.first_name.fill(value)
  }

  async fillLastName(value:string) {
    return await this.last_name.fill(value)
  }

  async fillPostalName(value:string) {
    return await this.postal_code.fill(value)
  }

  async getSubtotal() {
    return Number.parseFloat((await this.subtotal.textContent())?.split("$")[1]!)
  }

  async getTotal() {
    return Number.parseFloat((await this.total.textContent())?.split("$")[1]!)
  }
  
  async getTaxAmount() {
    return Number.parseFloat((await this.tax.textContent())?.split("$")[1]!)
  }
  
  

}