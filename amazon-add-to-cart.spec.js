const { test, expect } = require('@playwright/test');

test('search iPhone 17 on Amazon.in and add to cart', async ({ page }) => {
  // 1. Open Amazon.in
  await page.goto('https://www.amazon.in');

  // Close location/sign-in popup if it appears
  const continueButton = page.locator('button:has-text("Continue")');
  if (await continueButton.isVisible().catch(() => false)) {
    await continueButton.click();
  }

  // 2. Search for "Iphone 17"
  await page.fill('#twotabsearchtextbox', 'Iphone 17');
  await page.click('#nav-search-submit-button');

  // Amazon.in has continuous background network traffic (ads/analytics), so
  // "networkidle" never fires here — wait for the results grid instead.
  const resultsGrid = page.locator('div[data-component-type="s-search-result"]');
  await resultsGrid.first().waitFor({ state: 'visible', timeout: 20000 });

  // 3. Add the first "iPhone 17" result to cart directly from the search page
  const matchingResult = resultsGrid.filter({ hasText: /iPhone 17/i }).first();
  await matchingResult.scrollIntoViewIfNeeded();
  await matchingResult.getByRole('button', { name: 'Add to cart' }).click();

  // Confirm the cart count updated
  await expect(page.locator('#nav-cart-count')).not.toHaveText('0', { timeout: 15000 });

  // 4. Close the website
  await page.close();
});
