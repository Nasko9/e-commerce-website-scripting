// Modules
import { Page } from "puppeteer";
// Utils
import { delay } from "../utils/helpers/delay.js";
import { handlePuppeteerError } from "../utils/helpers/errorHandler.js";
import { productSelectors } from "../utils/selectors/product.js";

export const navigateToProduct = async (page: Page) => {
  // Navigate to next page
  try {
    await page.waitForSelector(productSelectors.nextCategoryButton, {
      timeout: 10000,
    });
  } catch (error) {
    handlePuppeteerError(error);
  }

  const categoryLinks = await page.$$(productSelectors.nextCategoryButton);

  if (categoryLinks.length >= 2) {
    await categoryLinks[2].click();
  } else {
    console.log("Less than two buttons found.");
    await categoryLinks[0].click();
    return;
  }
  await delay(10000, true);

  // Navigate to first product
  try {
    await page.waitForSelector(productSelectors.shoppingWindow, {
      timeout: 10000,
    });
  } catch (error) {
    handlePuppeteerError(error);
  }
  await page.click(`${productSelectors.shoppingWindow} a`);
  await delay(10000, true);

  // Navigate to single product
  await page.click(productSelectors.singleProductButton);

  console.log("Successfully navigate to product");
};
