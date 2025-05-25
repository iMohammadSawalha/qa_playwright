import test, { expect, Page } from "@playwright/test";

// export async function testCheckoutStepOne({
//   page,
//  }: {
//   page: Page;
// }) {

//     await test.step('Verify the button text changes to "Add to cart"', async () => {
//       for (const index of sortedToRemoveItemsIndexes) {
//         const buttonText = await inventoryPage.getItemCartButtonText(index);
//         expect(buttonText).toContain('Add to cart');
//       }
//     });
// }