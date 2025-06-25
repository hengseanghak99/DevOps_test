
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

export {
  BASE_URL,
  VALID_EMAIL,
  VALID_PASSWORD,
  EXPECTED_BLOCKCHAINS,
  login,
};
