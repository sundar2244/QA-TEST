const { test, expect } = require('@playwright/test');

test('Amazon login page should open', async ({ page }) => {
  await page.goto('https://www.amazon.in/');

  await page.getByRole('link', { name: /sign in/i }).first().click();

  await expect(page.locator('#ap_email')).toBeVisible();
});