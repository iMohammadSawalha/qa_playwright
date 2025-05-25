import { Locator, Page } from '@playwright/test';

export class CheckoutPage {
  private checkout_button: Locator;
  private continue_to_step_two_button: Locator;
  private error_container: Locator;

  private first_name: Locator;
  private last_name: Locator;
  private postal_code: Locator;

  private subtotal: Locator;

  constructor(private page: Page) {
    this.checkout_button = this.page.locator('button[data-test="checkout"]');
    this.continue_to_step_two_button = this.page.locator('[data-test="continue"]');
    this.error_container = this.page.locator('[data-test="error"]');

    this.first_name = this.page.locator('[data-test="firstName"]');
    this.last_name = this.page.locator('[data-test="lastName"]');
    this.postal_code = this.page.locator('[data-test="postalCode"]');

    this.subtotal = this.page.locator('[data-test="subtotal-label"]');
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
  
  

}