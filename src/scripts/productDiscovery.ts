// Modules
import * as fs from "fs";
import { Page } from "puppeteer";
// Utils
import { delay } from "../utils/delay.js";
// Scripts
import { navigateToProduct } from "./navigateToProduct.js";

export const productDisovery = async (page: Page) => {
  // Navigate to product
  await navigateToProduct(page);
  await delay(10000 + Math.random() * 500);
  // Navigate to homepage
  await page.click("div[data-header-logo-container] a");
  await delay(10000 + Math.random() * 500);

  // Extract 10 product from homepage
  await page.waitForSelector(".wt-body-max-width.homepage-row-container");
  const productData = await page.evaluate(() => {
    const list = Array.from(
      document.querySelectorAll(
        "li.wt-block-grid__item.wt-pt-xs-0.wt-pb-xs-1.wt-pb-md-0"
      )
    );
    const data = list.map(product => ({
      title: product.querySelector("a").getAttribute("title"),
      url: product.querySelector("a").getAttribute("href"),
      image: product.querySelector("img").getAttribute("src"),
      price: product.querySelector("span.currency-value").textContent,
    }));
    return data;
  });

  // Set extracted data to JSON filte
  // Todo: Create the functionality to save the file in the data folder
  fs.writeFile("productDiscovery.json", JSON.stringify(productData), err => {
    if (err) {
      throw err;
    }
    console.log("Successfully saved JSON");
  });
};
