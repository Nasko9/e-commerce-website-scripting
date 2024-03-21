// Modules
import dotenv from "dotenv";
import puppeteer, { Browser, Page } from "puppeteer";
// Utils
import { getUserAgent } from "./utils/userAgent.js";
import { delay } from "./utils/delay.js";
// Scripts
import { extractProductsData } from "./scripts/extractProductsData.js";
import { simulateCheckoutProcess } from "./scripts/simulateCheckoutProcess.js";
import { navigateToProduct } from "./scripts/navigateToProduct.js";
import { addToCart } from "./scripts/addToCart.js";

// Configurations
dotenv.config();

// Variables
const url = process.env.URL;
const userAgent = getUserAgent();

// Function for scraping
(async () => {
  // Puppeteer Setup
  const browser: Browser = await puppeteer.launch({ headless: false });
  const page: Page = await browser.newPage();

  await page.setViewport({ width: 1280, height: 900 });
  await page.setUserAgent(userAgent);

  await page.goto(url, { waitUntil: "networkidle2" });
  await delay(10000 + Math.random() * 500);

  await extractProductsData(page);
  await delay(10000 + Math.random() * 500);

  await navigateToProduct(page);
  await delay(10000 + Math.random() * 500);

  await addToCart(page);
  await delay(10000 + Math.random() * 500);

  await simulateCheckoutProcess(page);

  // Close browser
  await browser.close();
})().catch(console.error);
