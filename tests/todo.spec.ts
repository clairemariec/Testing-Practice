import { test, expect } from '@playwright/test';

//defone a describe block
test.describe('New Todo', () => {
  //before each hoot to rub set up code before each test
  test.beforeEach(async ({page}) => {
    await page.goto('');
  })


test('active and completed filters', async ({ page }) => {
  const todoInput = page.getByPlaceholder('What needs to be done?')
  await todoInput.fill('water the plants');
  await todoInput.press('Enter');
  await todoInput.fill('feed the dog');
  await todoInput.press('Enter');
  await todoInput.click();
  await page.locator('li').filter({ hasText: 'water the plants' }).getByLabel('Toggle Todo').check();
  await page.getByRole('link', { name: 'Active' }).click();
  await expect(page.getByTestId('todo-title')).toBeVisible();
  await page.getByRole('link', { name: 'Completed' }).click();
  await expect(page.getByTestId('todo-title')).toBeVisible();
});

test('text field is cleared when item is added', async ({ page }) => {
  const todoInput = page.getByPlaceholder('What needs to be done?')
  await todoInput.fill('water the plants');
  await todoInput.press('Enter');
  await expect(todoInput).toHaveText('');
});
});