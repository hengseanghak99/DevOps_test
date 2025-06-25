import { test, expect } from '@playwright/test';
import {BASE_URL,VALID_EMAIL,VALID_PASSWORD,EXPECTED_BLOCKCHAINS,login} from './Helpers.js';

test.describe('Login Functionality', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('should display all login UI elements', async ({ page }) => {
    await expect(page.locator('div').filter({ hasText: /^Login$/ })).toBeVisible();
    await expect(page.getByText('Enter your email and password')).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  test('should allow a user to log in with valid credentials', async ({ page }) => {
    await login(page, VALID_EMAIL, VALID_PASSWORD);
    await expect(page.getByText('NFTT')).toBeVisible();
  });

  test('should display validation errors for invalid email and missing password', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Email' }).fill('test');
    await page.getByRole('textbox', { name: 'Password' }).fill('');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Invalid email address')).toBeVisible();
    await expect(page.getByText('Password is required')).toBeVisible();
  });

  test('should display an error for incorrect credentials', async ({ page }) => {
    await login(page, 'admin@nftt-market-admin.beniten.net1', 'pW232@#!$$#1');
    await expect(page.getByText('The provided credentials are incorrect.')).toBeVisible();
  });
});

test.describe('Admin Site Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('should navigate to the dashboard after login', async ({ page }) => {
    await login(page, VALID_EMAIL, VALID_PASSWORD);
    await expect(page.getByRole('button', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'NFT Collection' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Site Management' })).toBeVisible();
    await expect(page.getByRole('button').nth(3)).toBeVisible();
    await expect(page.getByText('A', { exact: true })).toBeVisible();
    await expect(page.getByRole('button').nth(4)).toBeVisible();
  });

  test('should allow navigation to NFT Collection', async ({ page }) => {
    await login(page, VALID_EMAIL, VALID_PASSWORD);
    await page.getByRole('button', { name: 'NFT Collection' }).click();
    await expect(page.getByText('NFT Collection')).toBeVisible();
  });

});

test.describe('Features: NFT Collection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('UI checking', async ({ page }) => {
    await login(page, VALID_EMAIL, VALID_PASSWORD);
    await page.getByRole('button', { name: 'NFT Collection' }).click();
    await expect(page.getByText('NFT Collection')).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Search Name, Contract Address' })).toBeVisible();
    await expect(page.getByRole('combobox').filter({ hasText: 'Filter by site' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'New Collection' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'ID' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Blockchain' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Name (English)' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Name (Japanese)' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Contract Address' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Properties' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Filters' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Action' })).toBeVisible();
    await page.getByRole('button', { name: 'New Collection' }).click();
    await expect(page.getByRole('heading', { name: 'Create New NFT Collection' })).toBeVisible();
    await expect(page.getByText('Add a new NFT collection to')).toBeVisible();
    await expect(page.getByText('Name (English) *')).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Name (English) *' })).toBeVisible();
    await expect(page.getByLabel('Create New NFT Collection').getByText('Name (Japanese)')).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Name (Japanese)' })).toBeVisible();
    await expect(page.getByText('Name SP (English)')).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Name SP (English)' })).toBeVisible();
    await expect(page.getByText('Name SP (Japanese)')).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Name SP (Japanese)' })).toBeVisible();
    await expect(page.getByText('Testnet (Enable testnet')).toBeVisible();
    await expect(page.getByText('Blockchain *')).toBeVisible();
    await expect(page.getByRole('combobox').filter({ hasText: 'Select a blockchain' })).toBeVisible();
    await expect(page.getByText('Contract Address *')).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Contract Address *' })).toBeVisible();
    await expect(page.getByText('Property API *')).toBeVisible();
    await expect(page.getByRole('combobox').filter({ hasText: 'Rarible' })).toBeVisible();
    await expect(page.getByText('※Support ChainRarible:')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Create' })).toBeVisible();
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

  test('should display all expected blockchain blockChain_Names in the dropdown', async ({ page }) => {
    await login(page, VALID_EMAIL, VALID_PASSWORD);
    await page.getByRole('button', { name: 'NFT Collection' }).click();
    await page.getByRole('button', { name: 'New Collection' }).click();
    await page.getByRole('combobox').filter({ hasText: 'Select a blockchain' }).click();
  
    for (const option of EXPECTED_BLOCKCHAINS) {
      await expect(page.getByRole('option', { name: option })).toBeVisible();
    }
  });

})

