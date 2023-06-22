const puppeteer = require("puppeteer");

const CURRENCIES = ["EUR", "INR", "CHF", "GBP"];

(async () => {
  CURRENCIES.forEach(async (currency) => {
    const browser = await puppeteer.launch({
      headless: "new",
    });

    const page = await browser.newPage();
    const CURRENCY_CONVERTER_URL = `https://duckduckgo.com/?q=1+${currency}+to+usd&va=v&t=ha&ia=currency`;
    await page.goto(CURRENCY_CONVERTER_URL);
    const CurrencyScraper = await page.evaluate(
      () => document.querySelector(".CqOmdpkrykiJbhJe1GMt").innerText
    );
    const value = CurrencyScraper.split(" ");
    console.log(`${value[0]} ${currency} = ${value[3]} USD`);
    console.log(
      `Last Updated from XE: ${value[6]} ${value[7]} ${value[8]} (${value[9]})`
    );
    console.log("--------------------------------------------------");
    await browser.close();
  });
})();
