import { test, expect } from '@playwright/test';

test('active and completed filters', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/~/');
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.getByPlaceholder('What needs to be done?').fill('water the plants');
  await page.getByPlaceholder('What needs to be done?').press('Enter');
  await page.getByPlaceholder('What needs to be done?').fill('feed the dog');
  await page.getByPlaceholder('What needs to be done?').press('Enter');
  await page.getByText('water the plants').click();
  await page.locator('li').filter({ hasText: 'water the plants' }).getByLabel('Toggle Todo').check();
  await page.getByRole('link', { name: 'Active' }).click();
  await expect(page.getByTestId('todo-title')).toBeVisible();
  await page.getByRole('link', { name: 'Completed' }).click();
  await expect(page.getByTestId('todo-title')).toBeVisible();
});