import { test, expect } from '@playwright/test';

// Define constants for better readability and maintainability
const BASE_URL = 'https://nftt-market-admin.beniten.net/login';
const VALID_EMAIL = 'admin@nftt-market-admin.beniten.net';
const VALID_PASSWORD = 'pW232@#!$$#';

const login = async (page, email, password) => {
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
};


test.describe('Features: NFT Collection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('Invalid UI', async ({ page }) => {

    await login(page, VALID_EMAIL, VALID_PASSWORD);
    await page.getByRole('button', { name: 'NFT Collection' }).click();
    await page.getByRole('button', { name: 'New Collection' }).click();
    await page.getByRole('button', { name: 'Create' }).click();
    await expect(page.getByText('English name is required')).toBeVisible();
    await page.getByText('Blockchain is required').click();
    await page.getByText('Contract address is required').click();

  })
});