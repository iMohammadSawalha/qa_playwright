import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';


test.describe('Checkout Feature', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.LOGIN_USERNAME!, process.env.LOGIN_PASSWORD!);
  });

  test('Checkout button should navigate to checkout step one page', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    const cartPage = new CartPage(page);
    await cartPage.goto()
    await checkoutPage.navigateUsingCheckoutButton()
    await expect(page).toHaveURL("/checkout-step-one.html")
  })

  test('Checkout continue to step two with empty form gives error', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.gotoStepOne()
    await expect(page).toHaveURL("/checkout-step-one.html")
    await checkoutPage.navigateToStepTwo()
    await expect(page).toHaveURL("/checkout-step-one.html")

    const errorText = await checkoutPage.getErrorText()

    expect(errorText).toContain("Error: First Name is required")
  })

  test('Checkout continue to step two with filled form goes to step two', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.gotoStepOne()
    await expect(page).toHaveURL("/checkout-step-one.html")
    await checkoutPage.fillFirstName("a")
    await checkoutPage.fillLastName("a")
    await checkoutPage.fillPostalName("a")
    await checkoutPage.navigateToStepTwo()
    await expect(page).toHaveURL("/checkout-step-two.html")
  })
  
  test('Checkout continue to step two with only firstName filled gives lastName error', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.gotoStepOne()
    await expect(page).toHaveURL("/checkout-step-one.html")
    await checkoutPage.fillFirstName("a")
    await checkoutPage.navigateToStepTwo()

    const errorText = await checkoutPage.getErrorText()

    expect(errorText).toContain("Error: Last Name is required")
  })

  test('Checkout continue to step two with only firstName & lastName filled gives postalCode error', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.gotoStepOne()
    await expect(page).toHaveURL("/checkout-step-one.html")
    await checkoutPage.fillFirstName("a")
    await checkoutPage.fillLastName("a")
    await checkoutPage.navigateToStepTwo()

    const errorText = await checkoutPage.getErrorText()

    expect(errorText).toContain("Error: Postal Code is required")
  })

  test('Checkout continue to step two with only firstName & postalCode filled gives lastName error', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.gotoStepOne()
    await expect(page).toHaveURL("/checkout-step-one.html")
    await checkoutPage.fillFirstName("a")
    await checkoutPage.fillPostalName("a")
    await checkoutPage.navigateToStepTwo()

    const errorText = await checkoutPage.getErrorText()

    expect(errorText).toContain("Error: Last Name is required")
  })

  test('Checkout continue to step two with only lastName & postalCode filled gives firstName error', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.gotoStepOne()
    await expect(page).toHaveURL("/checkout-step-one.html")
    await checkoutPage.fillLastName("a")
    await checkoutPage.fillPostalName("a")
    await checkoutPage.navigateToStepTwo()

    const errorText = await checkoutPage.getErrorText()

    expect(errorText).toContain("Error: First Name is required")
  })

  test('Checkout step two, items subtotal price should be correct', async ({ page }) => {

    const inventoryPage = new InventoryPage(page);

    const itemsIndexes = [0, 1];
    const itemsPrices: number[] = [];

    await inventoryPage.goto();

    for (const index of itemsIndexes) {
      const price = await inventoryPage.getItemPrice(index);
      itemsPrices.push(price);
      await inventoryPage.toggleItemInCart(index);
    }

    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.gotoStepOne()
    await checkoutPage.fillFirstName("a")
    await checkoutPage.fillLastName("a")
    await checkoutPage.fillPostalName("a")
    await checkoutPage.navigateToStepTwo()
    await expect(page).toHaveURL("/checkout-step-two.html")

    const itemsSubtotalCalc = itemsPrices.reduce((sum, n)=> sum + n,0)

    const subtotal = await checkoutPage.getSubtotal()

    expect(subtotal).toBe(itemsSubtotalCalc)
  })

  test('Checkout step two, items total price should be correct', async ({ page }) => {

    const inventoryPage = new InventoryPage(page);

    const itemsIndexes = [0, 1];

    await inventoryPage.goto();

    for (const index of itemsIndexes) {
      await inventoryPage.toggleItemInCart(index);
    }

    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.gotoStepOne()
    await checkoutPage.fillFirstName("a")
    await checkoutPage.fillLastName("a")
    await checkoutPage.fillPostalName("a")
    await checkoutPage.navigateToStepTwo()
    await expect(page).toHaveURL("/checkout-step-two.html")

    const subtotal = await checkoutPage.getSubtotal()
    const total = await checkoutPage.getTotal()
    const tax = await checkoutPage.getTaxAmount()

    expect(subtotal + tax).toBe(total)
  })

  test('Checkout step two, finish should give success message', async ({ page }) => {

    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.gotoStepOne()
    await checkoutPage.fillFirstName("a")
    await checkoutPage.fillLastName("a")
    await checkoutPage.fillPostalName("a")
    await checkoutPage.navigateToStepTwo()
    await expect(page).toHaveURL("/checkout-step-two.html")
    await checkoutPage.finishCheckout()
    await expect(page).toHaveURL("/checkout-complete.html")
    const completeText = await checkoutPage.getCompleteHeaderText()
    expect(completeText).toContain("Thank you for your order!")

  })

});