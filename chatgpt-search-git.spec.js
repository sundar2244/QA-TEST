const { test, expect } = require('@playwright/test');

test('search about git on ChatGPT', async ({ page }) => {
  // 1. Open ChatGPT
  await page.goto('https://www.chatgpt.com');

  // 2. Type the question into the chat input and submit
  const chatInput = page.getByPlaceholder('Ask ChatGPT');
  await chatInput.waitFor({ state: 'visible', timeout: 20000 });
  await chatInput.fill('What is git?');

  const sendButton = page.getByRole('button', { name: 'Send message' });
  await sendButton.waitFor({ state: 'visible', timeout: 10000 });
  await sendButton.click();

  // 3. Wait for a response to appear
  const response = page.getByRole('listitem').filter({ hasText: 'ChatGPT said:' }).last();
  await response.waitFor({ state: 'visible', timeout: 30000 });
  await expect(response).not.toHaveText('ChatGPT said:', { timeout: 30000 });

  // 4. Close the website
  await page.close();
});
