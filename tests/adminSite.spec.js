import { test, expect } from '@playwright/test';

// Define constants for better readability and maintainability
const BASE_URL = 'https://nftt-market-admin.beniten.net/login';
const VALID_EMAIL = 'admin@nftt-market-admin.beniten.net';
const VALID_PASSWORD = 'pW232@#!$$#';

const EXPECTED_BLOCKCHAINS = [
  'Ethereum Mainnet',
  'Polygon Mainnet',
  'Arbitrum Mainnet',
  'Optimism Mainnet',
  'Base Mainnet',
  'ZKSync Mainnet',
  'Abstract Mainnet',
  'Ronin Mainnet',
  'Oasys Mainnet',
];

const login = async (page, email, password) => {
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
};

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

  test('should allow navigation to Site Management', async ({ page }) => {
    await login(page, VALID_EMAIL, VALID_PASSWORD);
    await page.getByRole('button', { name: 'Site Management' }).click();
    await expect(page.getByText('Site Management')).toBeVisible();
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

  test.skip('Invalid UI', async ({ page }) => {
    await login(page, VALID_EMAIL, VALID_PASSWORD);
    await page.getByRole('button', { name: 'NFT Collection' }).click();
    await page.getByRole('button', { name: 'New Collection' }).click();
    await page.getByRole('button', { name: 'Create' }).click();

    await expect(page.getByText('English name is required')).toBeVisible();
    await expect(page.getByText('Blockchain is required')).toBeVisible();
    await expect(page.getByText('Contract address is required')).toBeVisible();  
  })
  test.skip('should display all expected blockchain options in the dropdown', async ({ page }) => {
    await login(page, VALID_EMAIL, VALID_PASSWORD);
    await page.getByRole('button', { name: 'NFT Collection' }).click();
    await page.getByRole('button', { name: 'New Collection' }).click();
 
    await page.getByRole('combobox', { name: 'Select a blockchain' }).click();
    const blockchainOptionLocators = page.locator('.ant-select-item-option-content');
    await expect(blockchainOptionLocators.first()).toBeVisible();
    const actualBlockchains = await blockchainOptionLocators.allTextContents();
    actualBlockchains.sort();
    const sortedExpectedBlockchains = [...EXPECTED_BLOCKCHAINS].sort();
    expect(actualBlockchains).toEqual(sortedExpectedBlockchains);
  });
});