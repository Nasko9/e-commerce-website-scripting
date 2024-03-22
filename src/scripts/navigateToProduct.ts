// Modules
import { Page } from "puppeteer";
// Utils
import { delay } from "../utils/helpers/delay.js";
import { handlePuppeteerError } from "../utils/helpers/errorHandler.js";
import { productSelectors } from "../utils/selectors/product.js";

export const navigateToProduct = async (page: Page) => {
  // Check if Category button exist
  try {
    await page.waitForSelector(productSelectors.nextCategoryButton, {
      timeout: 10000,
    });
  } catch (error) {
    handlePuppeteerError(error);
  }

  // Gorup all category links
  const categoryLinks = await page.$$(productSelectors.nextCategoryButton);

  // If exist click to second category in menu
  if (categoryLinks.length >= 2) {
    await categoryLinks[2].click();
  } else {
    console.log("Less than two buttons found.");
    await categoryLinks[0].click();
    return;
  }
  await delay(10000, true);

  // Check if shoping window exist
  try {
    await page.waitForSelector(productSelectors.shoppingWindow, {
      timeout: 10000,
    });
  } catch (error) {
    handlePuppeteerError(error);
  }

  // Navigate to first product
  await page.click(`${productSelectors.shoppingWindow} a`);
  await delay(10000, true);

  // Navigate to product
  await page.click(productSelectors.singleProductButton);

  console.log("Successfully navigate to product");
};
