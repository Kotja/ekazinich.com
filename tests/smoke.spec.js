import { test, expect } from '@playwright/test';

const PROJECT_ROUTES = [
  {
    path: '/projects/brand-scaling-client-acquisition-platform',
    title: 'Brand Scaling & Client Acquisition Platform',
  },
  {
    path: '/projects/behavioural-product-strategy-in-job-search',
    title: 'Behavioural Product Strategy in Job Search',
  },
  {
    path: '/projects/optimising-b2b-workflow-retention',
    title: 'Optimising B2B Workflow & Retention',
  },
  {
    path: '/projects/service-automation-zero-touch-model',
    title: 'Service Automation: Zero-Touch Model',
  },
];

// Collect JS errors for each test via a shared helper
function captureErrors(page) {
  const errors = [];
  page.on('pageerror', (err) => errors.push(`[uncaught] ${err.message}`));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`[console.error] ${msg.text()}`);
  });
  return errors;
}

test('home page loads and shows navigation', async ({ page }) => {
  const errors = captureErrors(page);

  await page.goto('/');
  await page.waitForLoadState('networkidle');

  // Core nav items are rendered
  await expect(page.getByRole('button', { name: /projects/i }).first()).toBeVisible();
  await expect(page.getByRole('button', { name: /about/i }).first()).toBeVisible();
  await expect(page.getByRole('button', { name: /get in touch/i }).first()).toBeVisible();

  // Page title is set
  await expect(page).toHaveTitle(/Eka Zinich/i);

  expect(errors, `JS errors on home: ${errors.join(', ')}`).toHaveLength(0);
});

test('home page has correct meta description', async ({ page }) => {
  await page.goto('/');
  const metaDesc = await page.locator('meta[name="description"]').getAttribute('content');
  expect(metaDesc).toBeTruthy();
  expect(metaDesc.length).toBeGreaterThan(20);
});

for (const route of PROJECT_ROUTES) {
  test(`project page loads: ${route.title}`, async ({ page }) => {
    const errors = captureErrors(page);

    await page.goto(route.path);
    await page.waitForLoadState('networkidle');

    // Should stay on the project route (not redirected to home = project not found)
    expect(page.url()).toContain(route.path);

    // Page title should include the project name
    await expect(page).toHaveTitle(new RegExp(route.title.split(':')[0].trim(), 'i'));

    // Back button present
    await expect(page.getByRole('button', { name: /back/i })).toBeVisible();

    expect(errors, `JS errors on ${route.path}: ${errors.join(', ')}`).toHaveLength(0);
  });
}

test('mode toggle is a keyboard accessible switch', async ({ page }) => {
  await page.goto('/');

  const toggle = page.getByRole('switch', { name: 'In-Depth mode' });
  await expect(toggle).toBeVisible();
  await expect(toggle).toHaveAttribute('aria-checked', 'false');
  await expect(page.locator('.mode-impact')).toBeVisible();

  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-checked', 'true');
  await expect(page.locator('.mode-wandering')).toBeVisible();

  await page.keyboard.press('Space');
  await expect(toggle).toHaveAttribute('aria-checked', 'false');
  await expect(page.locator('.mode-impact')).toBeVisible();
});
