// Modules
import { Page } from "puppeteer";
// Utils
import { delay } from "../utils/delay.js";

export const navigateToProduct = async (page: Page) => {
  // Navigate to next page
  await page.waitForSelector("a.wt-btn.wt-btn--transparent.wt-btn--small");
  await page.click("a.wt-btn.wt-btn--transparent.wt-btn--small");
  await delay(10000 + Math.random() * 500);

  // Navigate to first product
  await page.waitForSelector(".shopping-window");
  await page.click(".shopping-window a");
  await delay(10000 + Math.random() * 500);

  // Navigate to single product
  await page.click("a.wt-btn.wt-btn--outline.wt-pl-xs-7.wt-pr-xs-7.wt-mt-xs-4");

  console.log("Successfully navigate to product");
};
