// Modules
import { Page } from "puppeteer";
// Utils
import { delay } from "../utils/helpers/delay.js";
// Type
import { CheckoutDetails } from "../types/checkoutType.js";

export const simulateCheckoutProcess = async (
  page: Page,
  checkoutDetails: CheckoutDetails
) => {
  // Navigate to cart
  await page.click("span[data-header-cart-button] a");
  await delay(10000, true);
  console.log("Navigated to cart");

  // Click button for procesed checkout
  await page.click("button.proceed-to-checkout");
  await delay(10000, true);

  // Click continue as guest
  await page.click("button[data-join-neu-button]");
  await delay(10000, true);

  // Fill the form
  await page.type("#shipping-form-email-input", checkoutDetails.email);
  await delay(10000, false);
  await page.type("#shipping-form-email-confirmation", checkoutDetails.email);
  await delay(10000, false);
  await page.type("#name11-input", checkoutDetails.fullName);
  await delay(10000, false);
  await page.type("#first_line12-input", checkoutDetails.addressLine1);
  await delay(10000, false);
  await page.type("#zip14-input", checkoutDetails.postalCode);
  await delay(10000, false);
  await page.type("#city15-input", checkoutDetails.city);
  await delay(10000, false);

  // Click continue to payment
  await page.click("button[data-selector-save-btn]");

  await delay(10000, true);
};
