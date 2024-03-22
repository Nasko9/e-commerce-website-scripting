// Modules
import dotenv from "dotenv";
import puppeteer, { Browser, Page } from "puppeteer";
// Utils
import { delay } from "./utils/helpers/delay.js";
import { getUserAgent } from "./utils/helpers/userAgent.js";
import { handlePuppeteerError } from "./utils/helpers/errorHandler.js";
// Scripts
import { addToCart } from "./scripts/addToCart.js";
import { extractProductsData } from "./scripts/extractProductsData.js";
import { navigateToProduct } from "./scripts/navigateToProduct.js";
import { simulateCheckoutProcess } from "./scripts/simulateCheckoutProcess.js";
// Type
import { CheckoutDetails } from "./types/checkoutType.js";

// Configurations
dotenv.config();

// Variables
const url = process.env.URL;
const userAgent = getUserAgent();
const checkoutDetails: CheckoutDetails = {
  email: process.env.CHECKOUT_EMAIL || "default@email.com",
  fullName: process.env.FULL_NAME || "Default Name",
  addressLine1: process.env.ADDRESS_LINE_1 || "123 Default St",
  postalCode: process.env.POSTAL_CODE || "12345",
  city: process.env.CITY || "Default City",
};

// Function for scraping
(async () => {
  let browser: Browser;

  try {
    // Puppeteer Setup
    browser = await puppeteer.launch({ headless: false });
    const page: Page = await browser.newPage();

    await page.setViewport({ width: 1280, height: 900 });
    await page.setUserAgent(userAgent);

    await page.goto(url, { waitUntil: "networkidle2" });
    await delay(10000, true);

    // Extract product data
    await extractProductsData(page);
    await delay(10000, true);

    // Proces for Checkout
    // Navigate to product
    await navigateToProduct(page);
    await delay(10000, true);

    // Add product to cart
    await addToCart(page);
    await delay(10000, true);

    // Do checkout processs
    await simulateCheckoutProcess(page, checkoutDetails);
  } catch (error) {
    // Handle error
    handlePuppeteerError(error);
  } finally {
    // Close browser
    await browser.close();
  }
})();
