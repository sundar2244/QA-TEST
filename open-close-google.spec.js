const { test, chromium } = require('@playwright/test');

test('open and close Google', async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('https://www.google.com');

  await browser.close();
});
