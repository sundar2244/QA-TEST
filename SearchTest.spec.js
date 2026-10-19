
const { test, expect } = require('@playwright/test');

test('Search for iPhone 17 on Amazon', async ({ page }) => {
  // Step 1: Open Amazon India
  await page.goto('https://www.amazon.in/');

  // Step 2: Locate the search box
  const searchBox = page.locator('#twotabsearchtextbox');

  // Step 3: Enter the product name
  await searchBox.fill('iPhone 17');

  // Step 4: Click the Search button
  await page.locator('#nav-search-submit-button').click();

  // Step 5: Verify that the search results page is displayed
  await expect(page).toHaveURL(/\/s/);

  // Step 6: Verify that search results are visible
  const results = page.locator('[data-component-type="s-search-results"]');
  await expect(results).toBeVisible();

  // Step 7: Print the result
  console.log('Search for iPhone 17 completed successfully!');
});
//this is the end of the test

