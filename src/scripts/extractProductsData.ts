// Modules
import { Page } from "puppeteer";
// Utils
import { delay } from "../utils/helpers/delay.js";
// Scripts
import { navigateToProduct } from "./navigateToProduct.js";
import { extractProductDetails } from "./extractProductDetails.js";
// Utils
import { handlePuppeteerError } from "../utils/helpers/errorHandler.js";
import { writeJSONToFile } from "../utils/data/writeToJSON.js";

export const extractProductsData = async (page: Page) => {
  // Navigate to product
  await navigateToProduct(page);
  await delay(10000, true);

  // Check if header logo exist
  try {
    await page.waitForSelector("div[data-header-logo-container] a", {
      timeout: 10000,
    });
  } catch (error) {
    handlePuppeteerError(error);
  }

  // Navigate to homepage
  await page.click("div[data-header-logo-container] a");
  await delay(10000, true);

  // Check if product exist on home page
  try {
    await page.waitForSelector(".wt-body-max-width.homepage-row-container");
  } catch (error) {
    handlePuppeteerError(error);
  }

  // Extract 10 product from homepage
  const productData = await page.evaluate(() => {
    const list = Array.from(
      document.querySelectorAll(
        "li.wt-block-grid__item.wt-pt-xs-0.wt-pb-xs-1.wt-pb-md-0"
      )
    );
    const data = list.map(product => ({
      title: product.querySelector("a").getAttribute("title"),
      url: product.querySelector("a").getAttribute("href"),
    }));

    return data;
  });

  // Extract details for each product
  for (const product of productData) {
    console.log(`Extracting details for: ${product.title}`);
    await delay(1000, false);
    const details = await extractProductDetails(page, product.url);
    Object.assign(product, { details });
  }

  // Set extracted data to JSON file
  writeJSONToFile("productsData.json", productData);
};
