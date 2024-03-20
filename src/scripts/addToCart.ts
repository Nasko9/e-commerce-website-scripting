// Modules
import { Page } from "puppeteer";
// Utils
import { delay } from "../utils/delay.js";

export const addToCart = async (page: Page) => {
  // Add to cart
  if ((await page.$("#variation-selector-0")) !== null) {
    await page.click("div[data-add-to-cart-button] button");
    await delay(10000 + Math.random() * 500);
  }

  // Select color
  if ((await page.$("#variation-selector-0")) !== null) {
    const valueOfColorSelector = await page.evaluate(() => {
      const selector = document.querySelector("#variation-selector-0");
      if (
        selector instanceof HTMLSelectElement &&
        selector.options.length > 1
      ) {
        return selector.options[1].value;
      }
      return null;
    });

    // await page.click("#variation-selector-0");
    // await page.click(`option[value=${valueOfColorSelector}]`);

    if (valueOfColorSelector) {
      await page.select("#variation-selector-0", valueOfColorSelector);
    }
  }

  await delay(10000 + Math.random() * 500);

  // Select size
  if ((await page.$("#variation-selector-1")) !== null) {
    const valueOfSizeSelector = await page.evaluate(() => {
      const selector = document.querySelector("#variation-selector-1");
      if (
        selector instanceof HTMLSelectElement &&
        selector.options.length > 1
      ) {
        return selector.options[1].value;
      }
      return null;
    });
    if (valueOfSizeSelector) {
      await page.select("#variation-selector-1", valueOfSizeSelector);
    }

    // await page.click("#variation-selector-1");
    // await page.click(`option[value="${valueOfSizeSelector}"]`);
  }

  await delay(10000 + Math.random() * 500);

  // Add to cart
  await page.click("div[data-add-to-cart-button] button");

  console.log("Added item to shopping cart");
};
