import { test, expect } from '@playwright/test';

test.skip('test', async ({ page }) => {
  await page.goto('https://www.selenium.dev/selenium/web/web-form.html');
  await page.getByRole('textbox', { name: 'Text input' }).click();
  await page.getByRole('textbox', { name: 'Text input' }).fill('test');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('12233456');
  await page.getByRole('textbox', { name: 'Textarea' }).click();
  await page.getByRole('textbox', { name: 'Textarea' }).fill('terster');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Received!')).toBeVisible();
});