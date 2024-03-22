// Modules
import dotenv from "dotenv";
import puppeteer, { Browser, Page } from "puppeteer";
// Utils
import { delay } from "./utils/helpers/delay.js";
import { getUserAgent } from "./utils/helpers/userAgent.js";
import { handlePuppeteerError } from "./utils/helpers/errorHandler.js";
// Scripts
import { extractProductsData } from "./scripts/extractProductsData.js";
import { navigateToProduct } from "./scripts/navigateToProduct.js";
import { addToCart } from "./scripts/addToCart.js";
import { simulateCheckoutProcess } from "./scripts/simulateCheckoutProcess.js";

// Configurations
dotenv.config();

// Variables
const url = process.env.URL;
const userAgent = getUserAgent();

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

    // Navigate to product
    await navigateToProduct(page);
    await delay(10000, true);

    // Add product to cart
    await addToCart(page);
    await delay(10000, true);

    // Do checkout processs
    await simulateCheckoutProcess(page);
  } catch (error) {
    handlePuppeteerError(error);
  } finally {
    // Close browser
    await browser.close();
  }
})();
