import { expect, test } from '@playwright/test'

test('renders the 神秘数据大屏 dashboard', async ({ page }) => {
  const errors: string[] = []
  page.on('console', (message) => {
    if (message.type() === 'error') {
      errors.push(message.text())
    }
  })

  await page.goto('/')

  await expect(page.getByRole('heading', { name: /神秘数据大屏/ })).toBeVisible()
  await expect(page.getByTestId('metric-card').first()).toBeVisible()
  await expect(page.getByTestId('chart-map')).toBeVisible()
  await expect(page.getByText('今日访问量')).toBeVisible()
  await expect(page.locator('canvas').first()).toBeVisible()

  expect(errors).toEqual([])
})
