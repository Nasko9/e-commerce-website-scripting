// Modules
import { Page } from "puppeteer";

export const extractProductDetails = async (page: Page, url: string) => {
  await page.goto(url, { waitUntil: "networkidle2" });

  // Extract product details
  const details = await page.evaluate(() => {
    const extractPriceText = (text: string) => {
      const regex = /(USD\s+\d+\.\d+)/;
      const matched = text.match(regex);
      return matched ? matched[0] : null;
    };

    return {
      name: document.querySelector("h1")?.textContent.trim(),
      price: extractPriceText(
        document
          .querySelector("div[data-appears-component-name] p")
          .textContent.trim()
      ),
      description: document
        .querySelector("p[data-product-details-description-text-content]")
        .textContent.trim(),
      sizes: Array.from(
        document.querySelectorAll("#variation-selector-1 option")
      )
        .slice(1)
        .map(el => el.textContent.trim()),
      imageUrl: document
        .querySelector("img[data-src-zoom-image]")
        .getAttribute("src"),
    };
  });

  return details;
};
