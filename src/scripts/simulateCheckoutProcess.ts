// Modules
import { Page } from "puppeteer";
// Utils
import { delay } from "../utils/delay.js";

export const simulateCheckoutProcess = async (page: Page) => {
  // Navigate to cart
  await page.click("span[data-header-cart-button] a");
  await delay(10000 + Math.random() * 500);
  console.log("Navigated to cart");

  // Click button for procesed checkout
  await page.click("button.proceed-to-checkout");
  await delay(10000 + Math.random() * 500);

  // Click continue as guest
  await page.click("button[data-join-neu-button]");
  await delay(10000 + Math.random() * 500);

  // Fill the form
  await page.type("#shipping-form-email-input", "johndoe@gmail.com");
  await delay(10000);
  await page.type("#shipping-form-email-confirmation", "johndoe@gmail.com");
  await delay(10000);
  await page.type("#name11-input", "John Doe");
  await delay(10000);
  await page.type("#first_line12-input", "John Doe Street");
  await delay(10000);
  await page.type("#zip14-input", "11000");
  await delay(10000);
  await page.type("#city15-input", "Belgrade");
  await delay(10000);

  // Click continue to payment
  await page.click("button[data-selector-save-btn]");

  await delay(10000 + Math.random() * 500);
};
