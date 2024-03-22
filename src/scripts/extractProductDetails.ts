// Modules
import { Page } from "puppeteer";

export const extractProductDetails = async (page: Page, url: string) => {
  // Go to url
  await page.goto(url, { waitUntil: "networkidle2" });

  // Extract product details
  const details = await page.evaluate(() => {
    const extractPriceText = (text: string) => {
      const startIndex = text.indexOf("Price:\n");
      if (startIndex !== -1) {
        const start = startIndex + "Price:\n".length;
        const endIndex = text.indexOf("\n", start);
        if (endIndex !== -1) {
          return text.slice(start, endIndex).trim();
        }
      }
      return null;
    };

    return {
      name: document.querySelector("h1")?.textContent.trim(),
      price: extractPriceText(
        document
          .querySelector("div[data-buy-box-region='price'] p")
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

  // Return details
  return details;
};
