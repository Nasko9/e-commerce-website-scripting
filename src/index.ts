// Modules
import dotenv from "dotenv";
import puppeteer, { Browser } from "puppeteer";
import * as fs from "fs";

// Configurations
dotenv.config();

// Variables
const url = process.env.URL;

// Delay function
function delay(time: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

const userAgents = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Safari/605.1.15",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.106 Safari/537.36",
  "Mozilla/5.0 (iPad; CPU OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:78.0) Gecko/20100101 Firefox/78.0",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1",
  "Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36",
  "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:89.0) Gecko/20100101 Firefox/89.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_16) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 13_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1",
  "Mozilla/5.0 (Linux; Android 10; SM-A505FN) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36",
  "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15",
  "Mozilla/5.0 (Linux; Android 9; SM-G960F Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36",
  "Mozilla/5.0 (iPad; CPU OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.2 Mobile/15E148 Safari/604.1",
  "Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:89.0) Gecko/20100101 Firefox/89.0",
];

// Function for scraping
(async () => {
  const browser: Browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.setViewport({ width: 1280, height: 900 });

  const userAgent = userAgents[Math.floor(Math.random() * userAgents.length)];
  await page.setUserAgent(userAgent);

  await page.goto(url, { waitUntil: "networkidle2" });
  await delay(10000 + Math.random() * 500);

  // Simulate human behavior to avoid site blocking
  // await page.waitForSelector(".wt-bg-beeswax-tint", { visible: true });
  // await page.hover(
  //   ".wt-pb-xs-1.wt-pb-lg-0.wt-pt-sm-1.wt-pt-lg-0.wt-pr-xs-0.wt-pr-sm-1"
  // );
  // await page.click(
  //   ".wt-pb-xs-1.wt-pb-lg-0.wt-pt-sm-1.wt-pt-lg-0.wt-pr-xs-0.wt-pr-sm-1",
  //   {
  //     delay: 100 + Math.random() * 30,
  //   }
  // );
  // await delay(10000 + Math.random() * 500);
  // await page.hover("#content");
  // await delay(10000 + Math.random() * 500);
  // await page.hover("#wt-portals");
  // await delay(10000 + Math.random() * 500);
  // await page.click(".wt-bg-beeswax-tint", {
  //   delay: 100 + Math.random() * 30,
  // });
  // Todo: create a mechanism for accepting cookies

  // Product Discovery
  await page.waitForSelector("a.wt-btn.wt-btn--transparent.wt-btn--small"); // He chose first url
  await page.click("a.wt-btn.wt-btn--transparent.wt-btn--small");
  console.log("uspeo navigiranje");
  await delay(10000 + Math.random() * 500);

  await page.waitForSelector(".shopping-window");
  console.log("selektor postoji");
  await page.click(".shopping-window a");
  console.log("uspeo navigiranje do proizvoda");
  await delay(10000 + Math.random() * 500);

  await page.click("a.wt-btn.wt-btn--outline.wt-pl-xs-7.wt-pr-xs-7.wt-mt-xs-4");
  console.log("usao u shop this item");
  await delay(10000 + Math.random() * 500);

  await page.click("div[data-header-logo-container] a");
  console.log("uspesno se vratio nazad");
  await delay(10000 + Math.random() * 500);

  // await page.goBack({ waitUntil: "networkidle0" });

  // wt-body-max-width homepage-row-container

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

  console.log(productData, "random data");

  // Set Data to JSON filte
  fs.writeFile("data.json", JSON.stringify(productData), err => {
    if (err) {
      throw err;
    }
    console.log("Successfully saved JSON");
  });

  // Close browser
  await browser.close();
})().catch(console.error);
