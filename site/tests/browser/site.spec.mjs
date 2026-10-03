import { expect, test } from '@playwright/test';

for (const width of [320, 390, 1280]) {
  test(`language, tabs and copied command at ${width}px`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setViewportSize({ width, height: 844 });
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'clipboard', { value: { async writeText(text) { window.copiedCommand = text; } } });
    });
    await page.goto('./?lang=en');
    await expect(page.getByRole('heading', { name: 'Current VKUI, matched to your project.' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'From project version to verified interface' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 3, name: 'Resolve', exact: true })).toBeVisible();
    await page.getByText('RU', { exact: true }).click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
    await expect(page).toHaveURL(/lang=ru/);
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
    await page.getByText('EN', { exact: true }).click();
    await page.getByRole('tab', { name: 'Review', exact: true }).click();
    await expect(page.getByText('An evidence-backed review becomes a tested patch, not a generic accessibility checklist.')).toBeVisible();
    await page.getByRole('button', { name: 'Copy install command', exact: true }).first().click();
    await expect.poll(() => page.evaluate(() => window.copiedCommand)).toContain('npx skills add m0rg0t/vkui-skill');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(errors).toEqual([]);
  });
}

test('blocked storage and both clipboard paths never crash the page', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('Blocked', 'SecurityError'); } });
    Object.defineProperty(navigator, 'clipboard', { value: { writeText() { return Promise.reject(new Error('Denied')); } } });
    document.execCommand = () => { throw new Error('Denied'); };
  });
  await page.goto('./?lang=en');
  await page.getByText('RU', { exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
  await page.getByText('EN', { exact: true }).click();
  await page.getByRole('button', { name: 'Copy install command', exact: true }).first().click();
  await expect(page.locator('textarea')).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Current VKUI, matched to your project.' })).toBeVisible();
  expect(errors).toEqual([]);
});
