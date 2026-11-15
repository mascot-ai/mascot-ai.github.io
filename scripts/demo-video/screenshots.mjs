// Captures the themed counselor screenshots used on /counselors/: node scripts/demo-video/screenshots.mjs
// Same demo stack as record.mjs. Writes public/screenshots/counselors-<name>-{light,dark}.jpg (1440x748).
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ACCOUNTS } from './tours.mjs';

const APP = process.env.DEMO_APP_URL || 'http://localhost:5174';
const API = process.env.DEMO_API_URL || 'http://localhost:8001/api/v1';
const PASSWORD = process.env.DEMO_PASSWORD || 'DemoPass123!';
const out = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'public', 'screenshots');
mkdirSync(out, { recursive: true });

const call = async (path, token, init = {}) => (await fetch(`${API}${path}`, { ...init, headers: { 'Content-Type': 'application/json', ...(token && { Authorization: `Bearer ${token}` }) } })).json();
const { token } = await call('/auth/login/', null, { method: 'POST', body: JSON.stringify({ email: ACCOUNTS.counselor, password: PASSWORD }) });
const org = (await call('/organizations/', token)).results[0].organization_id;
const round = (await call(`/organizations/${org}/review-requests/?status=returned`, token)).results[0].round_id;
const maya = (await call(`/organizations/${org}/students/`, token)).results?.find((s) => s.student_name === 'Maya Chen')?.student_user_id;

const SHOTS = {
  today: (p) => p.goto(`${APP}/app`),
  student: (p) => p.goto(`${APP}/app/students/${maya}`),
  review: (p) => p.goto(`${APP}/app/reviews/${round}`),
  team: (p) => p.goto(`${APP}/app/team`),
  colleges: async (p) => {
    await p.goto(`${APP}/app/universities`);
    await p.getByPlaceholder(/Search by university/i).fill('Stanford');
    await p.keyboard.press('Enter');
    await p.getByRole('button', { name: /View School Details/i }).first().click();
    await p.getByText('Saved by', { exact: true }).first().click();
  },
};

const browser = await chromium.launch();
const login = await browser.newContext({ viewport: { width: 1440, height: 748 } });
const lp = await login.newPage();
await lp.goto(`${APP}/login`);
await lp.fill('input[type=email]', ACCOUNTS.counselor);
await lp.fill('input[type=password]', PASSWORD);
await lp.click('button[type=submit]');
await lp.waitForURL('**/app**');
const state = await login.storageState();
await login.close();

for (const theme of ['light', 'dark']) {
  // The app follows the system theme unless the user picked one, so emulate it.
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 748 }, storageState: state, colorScheme: theme });
  const page = await ctx.newPage();
  for (const [name, go] of Object.entries(SHOTS)) {
    await go(page);
    await page.waitForTimeout(1800);
    await page.screenshot({ path: join(out, `counselors-${name}-${theme}.jpg`), type: 'jpeg', quality: 82 });
    console.log(theme, name);
  }
  await ctx.close();
}
await browser.close();
