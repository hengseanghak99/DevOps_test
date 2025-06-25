import { test, expect } from '@playwright/test';
import path from 'path';
import {
    BASE_URL,
    VALID_EMAIL,
    VALID_PASSWORD,
    EXPECTED_BLOCKCHAINS,
    login
} from './Helpers.js';

test.describe('Site Management', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(BASE_URL);
        await login(page, VALID_EMAIL, VALID_PASSWORD);
        await page.getByRole('button', { name: 'Site Management' }).click();
    });

    test('should display all UI elements', async ({ page }) => {
        await expect(page.getByRole('textbox', { name: 'Search domain...' })).toBeVisible();
        await expect(page.getByRole('cell', { name: 'ID' })).toBeVisible();
        await expect(page.getByRole('cell', { name: 'Domain' })).toBeVisible();
        await expect(page.getByRole('cell', { name: 'Blockchain' })).toBeVisible();
        await expect(page.getByRole('cell', { name: 'Logo', exact: true })).toBeVisible();
        await expect(page.getByRole('cell', { name: 'Published' })).toBeVisible();
        await expect(page.getByRole('cell', { name: 'Status' })).toBeVisible();
        await expect(page.getByRole('cell', { name: 'Action' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Add New Site' })).toBeVisible();
    });

    test.describe('CRUD Data', () => {
        test('Create Site', async ({ page }) => {
            await page.getByRole('button', { name: 'Add New Site' }).click();
            await page.getByRole('textbox', { name: 'Domain *' }).fill('nftt-market-test04.beniten.net');
            await page.getByRole('checkbox', { name: 'Testnet (Enable testnet' }).click();
            await page.getByLabel('Blockchain *').selectOption('84532');
            //Configure language
            await page.getByRole('checkbox', { name: 'Japanese' }).click();
            await page.locator("#header_logo").setInputFiles(path.join("/Users/seanghak/Desktop/DevOps_Playwright/utils/Marvel/Naruto_logo.svg"));
            await page.locator("#favicon").setInputFiles(path.join("/Users/seanghak/Desktop/DevOps_Playwright/utils/favicon/favicon.ico"));
            await page.locator("#android_icon").setInputFiles(path.join("/Users/seanghak/Desktop/DevOps_Playwright/utils/favicon/android-chrome-512x512.png"));
            await page.locator("#apple_touch_icon").setInputFiles(path.join("/Users/seanghak/Desktop/DevOps_Playwright/utils/favicon/apple-touch-icon.png"));
            //SEO Metadata
            await page.getByRole('textbox', { name: 'Title (English) *' }).fill('Test Site');
            await page.getByRole('textbox', { name: 'Meta Description (English)' }).fill('This is a test site for NFTT Market');
            await page.getByRole('textbox', { name: 'Meta Keywords (English)' }).fill('NFTT, Market, Test');
            //Japanese Metadata     
            await page.getByRole('textbox', { name: 'Title (Japanese) *' }).fill('Test Japanese Site');;
            await page.getByRole('textbox', { name: 'Meta Description (Japanese)' }).fill('これはNFTT Marketのテストサイトです');
            await page.getByRole('textbox', { name: 'Meta Keywords (Japanese)' }).fill('NFTT, マーケット, テスト');
            //Open Graph Metadata
            await page.getByRole('textbox', { name: 'OG Title (English)' }).fill('Test Site OG Title');
            await page.getByRole('textbox', { name: 'OG Description (English)' }).fill('This is a test site for NFTT Market Open Graph');
            await page.getByRole('textbox', { name: 'OG URL' }).fill('https://nftt-market-test07.beniten.net');
            await page.locator("#og_image").setInputFiles("/Users/seanghak/Desktop/DevOps_Playwright/utils/Marvel/Naruto_logo.svg");
            await page.getByRole('textbox', { name: 'OG Site Name (English)' }).fill('Test Site Name');
            //Japanese Open Graph Metadata
            await page.getByRole('textbox', { name: 'OG Title (Japanese)' }).fill('OGタイトル（日本語）');
            await page.getByRole('textbox', { name: 'OG Description (Japanese)' }).fill('OG説明（日本語）');
            await page.getByRole('textbox', { name: 'OG Site Name (Japanese)' }).fill('OGサイト名（日本語）');
            //Twitter Card Metada
            await page.getByRole('textbox', { name: 'Twitter URL', exact: true }).fill('https://nftt-market-test07.beniten.net');
            await page.locator("#twitter_image").setInputFiles("/Users/seanghak/Desktop/DevOps_Playwright/utils/Marvel/Naruto_logo.svg");
            await page.getByRole('textbox', { name: 'Twitter Title (English)' }).fill('Test Site Twitter Title');
            await page.getByRole('textbox', { name: 'Twitter Description (English)' }).fill('   This is a test site for NFTT Market Twitter');
            //Japanese Twitter Card Metadata
            await page.getByRole('textbox', { name: 'Twitter Title (Japanese)' }).fill('Twiter Japan metadata');;
            await page.getByRole('textbox', { name: 'Twitter Description (Japanese)' }).fill('これはNFTT Marketのテストサイトです');
            //Footer Configuration
            await page.locator("#collection_logo").setInputFiles("/Users/seanghak/Desktop/DevOps_Playwright/utils/Marvel/Naruto_logo.svg");
            await page.locator("#marketplace_logo").setInputFiles("/Users/seanghak/Desktop/DevOps_Playwright/utils/Marvel/Naruto_logo.svg");
            await page.getByRole('textbox', { name: 'Collection URL' }).fill('https://testnet.rarible.com/collection/base/0xab1efe19a9e9c74718d2c7fde03fcd14f1d0ae9a/items');
            await page.getByRole('textbox', { name: 'Marketplace URL' }).fill('https://testnet.rarible.com/collection/base/0xab1efe19a9e9c74718d2c7fde03fcd14f1d0ae9a/items');
            await page.getByRole('textbox', { name: 'Twitter URL (English)' }).fill('https://mobile-legends.fandom.com/wiki/Benedetta');
            await page.getByRole('textbox', { name: 'Twitter URL (Japanese)' }).fill('https://mobile-legends.fandom.com/wiki/Benedetta');
            //Add Site
            await page.getByRole('button', { name: 'Add Site' }).click();
            await page.waitForTimeout(5000);
        })
        test('Seach New Domain', async ({ page }) => {
            await page.waitForTimeout(3000);
            await page.getByRole('textbox', { name: 'Search domain...' }).fill('nftt-market-test04.beniten.net');
            await page.waitForTimeout(3000);
            await expect(page.getByRole('link', { name: 'nftt-market-test04.beniten.net' })).toBeVisible();
            await expect(page.getByRole('cell', { name: 'Base Sepolia' })).toBeVisible();
            await expect(page.getByText('Off')).toBeVisible();
            await expect(page.getByText('Pending')).toBeVisible();
            await expect(page.getByText('Not yet configure API key')).toBeVisible();
        });
        test('Delete site', async ({ page }) => {
            await page.getByRole('textbox', { name: 'Search domain...' }).fill('nftt-market-test04.beniten.net');
            await page.waitForTimeout(3000);
            await page.getByRole('button', { name: 'Delete Site' }).click();
            await expect(page.getByRole('heading', { name: 'Delete Site' })).toBeVisible();
            await expect(page.getByText('Are you sure you want to')).toBeVisible();
            await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
            await expect(page.getByRole('button', { name: 'Delete' })).toBeVisible();
            // Cancel Delete Site
            await page.getByRole('button', { name: 'Cancel' }).click();
            await page.getByRole('button', { name: 'Delete Site' }).click();
            // Confirm Delete Site
            await page.getByRole('button', { name: 'Delete' }).click();
            await expect(page.getByRole('cell', { name: 'No data found' })).toBeVisible();
            await page.getByRole('textbox', { name: 'Search domain...' }).fill('');

        })
    });

    test.describe('Create Site and cofigure API Key', () => {
        test('Create Site', async ({ page }) => {
            await page.getByRole('button', { name: 'Add New Site' }).click();
            await page.getByRole('textbox', { name: 'Domain *' }).fill('nftt-market-test04.beniten.net');
            await page.getByRole('checkbox', { name: 'Testnet (Enable testnet' }).click();
            await page.getByLabel('Blockchain *').selectOption('84532');
            //Configure language
            await page.getByRole('checkbox', { name: 'Japanese' }).click();
            await page.locator("#header_logo").setInputFiles(path.join("/Users/seanghak/Desktop/DevOps_Playwright/utils/Marvel/Naruto_logo.svg"));
            await page.locator("#favicon").setInputFiles(path.join("/Users/seanghak/Desktop/DevOps_Playwright/utils/favicon/favicon.ico"));
            await page.locator("#android_icon").setInputFiles(path.join("/Users/seanghak/Desktop/DevOps_Playwright/utils/favicon/android-chrome-512x512.png"));
            await page.locator("#apple_touch_icon").setInputFiles(path.join("/Users/seanghak/Desktop/DevOps_Playwright/utils/favicon/apple-touch-icon.png"));
            //SEO Metadata
            await page.getByRole('textbox', { name: 'Title (English) *' }).fill('Test Site');
            await page.getByRole('textbox', { name: 'Meta Description (English)' }).fill('This is a test site for NFTT Market');
            await page.getByRole('textbox', { name: 'Meta Keywords (English)' }).fill('NFTT, Market, Test');
            //Japanese Metadata     
            await page.getByRole('textbox', { name: 'Title (Japanese) *' }).fill('Test Japanese Site');;
            await page.getByRole('textbox', { name: 'Meta Description (Japanese)' }).fill('これはNFTT Marketのテストサイトです');
            await page.getByRole('textbox', { name: 'Meta Keywords (Japanese)' }).fill('NFTT, マーケット, テスト');
            //Open Graph Metadata
            await page.getByRole('textbox', { name: 'OG Title (English)' }).fill('Test Site OG Title');
            await page.getByRole('textbox', { name: 'OG Description (English)' }).fill('This is a test site for NFTT Market Open Graph');
            await page.getByRole('textbox', { name: 'OG URL' }).fill('https://nftt-market-test07.beniten.net');
            await page.locator("#og_image").setInputFiles("/Users/seanghak/Desktop/DevOps_Playwright/utils/Marvel/Naruto_logo.svg");
            await page.getByRole('textbox', { name: 'OG Site Name (English)' }).fill('Test Site Name');
            //Japanese Open Graph Metadata
            await page.getByRole('textbox', { name: 'OG Title (Japanese)' }).fill('OGタイトル（日本語）');
            await page.getByRole('textbox', { name: 'OG Description (Japanese)' }).fill('OG説明（日本語）');
            await page.getByRole('textbox', { name: 'OG Site Name (Japanese)' }).fill('OGサイト名（日本語）');
            //Twitter Card Metada
            await page.getByRole('textbox', { name: 'Twitter URL', exact: true }).fill('https://nftt-market-test07.beniten.net');
            await page.locator("#twitter_image").setInputFiles("/Users/seanghak/Desktop/DevOps_Playwright/utils/Marvel/Naruto_logo.svg");
            await page.getByRole('textbox', { name: 'Twitter Title (English)' }).fill('Test Site Twitter Title');
            await page.getByRole('textbox', { name: 'Twitter Description (English)' }).fill('   This is a test site for NFTT Market Twitter');
            //Japanese Twitter Card Metadata
            await page.getByRole('textbox', { name: 'Twitter Title (Japanese)' }).fill('Twiter Japan metadata');;
            await page.getByRole('textbox', { name: 'Twitter Description (Japanese)' }).fill('これはNFTT Marketのテストサイトです');
            //Footer Configuration
            await page.locator("#collection_logo").setInputFiles("/Users/seanghak/Desktop/DevOps_Playwright/utils/Marvel/Naruto_logo.svg");
            await page.locator("#marketplace_logo").setInputFiles("/Users/seanghak/Desktop/DevOps_Playwright/utils/Marvel/Naruto_logo.svg");
            await page.getByRole('textbox', { name: 'Collection URL' }).fill('https://testnet.rarible.com/collection/base/0xab1efe19a9e9c74718d2c7fde03fcd14f1d0ae9a/items');
            await page.getByRole('textbox', { name: 'Marketplace URL' }).fill('https://testnet.rarible.com/collection/base/0xab1efe19a9e9c74718d2c7fde03fcd14f1d0ae9a/items');
            await page.getByRole('textbox', { name: 'Twitter URL (English)' }).fill('https://mobile-legends.fandom.com/wiki/Benedetta');
            await page.getByRole('textbox', { name: 'Twitter URL (Japanese)' }).fill('https://mobile-legends.fandom.com/wiki/Benedetta');
            //Add Site
            await page.getByRole('button', { name: 'Add Site' }).click();
            await page.waitForTimeout(5000);
        });
        test('Add API key', async ({ page }) => {
            await page.getByRole('textbox', { name: 'Search domain...' }).fill('nftt-market-test04.beniten.net');
            await page.waitForTimeout(3000);
            await page.getByRole('button', { name: 'Configure API Keys' }).click();
            await page.getByRole('textbox', { name: 'Rarible API Key' }).fill('15197885-fe79-4eed-b3f6-f8481d8a5c2d');
            await page.getByRole('textbox', { name: 'OpenSea API Key' }).fill('5c557859170f434e811e80b114bf9105');
            await page.getByRole('textbox', { name: 'Reservoir API Key (for Magic' }).fill('');
            await page.getByRole('textbox', { name: 'Alchemy API Key *' }).fill('dNTUVUVP0wsnsVMN-kXOF');
            await page.getByRole('button', { name: 'Save API Keys' }).click();
            await page.waitForTimeout(3000);
            await expect(page.getByText('API keys updated successfully')).toBeVisible();
            await page.waitForTimeout(3000);
            await page.getByRole('button', { name: '← Back' }).click();
            await page.getByRole('textbox', { name: 'Search domain...' }).fill('nftt-market-test04.beniten.net');
            await page.waitForTimeout(3000);
            await expect(page.getByRole('link', { name: 'nftt-market-test04.beniten.net' })).toBeVisible();
            await expect(page.getByRole('cell', { name: 'Base Sepolia' })).toBeVisible();
            await expect(page.getByText('Off')).toBeVisible();
        });
    });

});

