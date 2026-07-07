import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { chromium } from 'playwright'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const baseUrl = 'http://127.0.0.1:10001/'
const screenshotPath = path.join(projectRoot, 'docs', 'screenshots', 'dashboard-1920x1080.png')

const consoleErrors = []

async function captureDashboard() {
  await mkdir(path.dirname(screenshotPath), { recursive: true })

  const browser = await chromium.launch()
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
  })

  page.on('console', (message) => {
    if (message.type() === 'error') {
      consoleErrors.push(message.text())
    }
  })

  page.on('pageerror', (error) => {
    consoleErrors.push(error.message)
  })

  try {
    await page.goto(baseUrl, { waitUntil: 'networkidle', timeout: 30_000 })
  } catch (error) {
    await browser.close()
    console.error(`无法访问 ${baseUrl}`)
    console.error('请先运行 npm run dev -- --host 127.0.0.1 --port 10001')
    console.error(error instanceof Error ? error.message : String(error))
    process.exit(1)
  }

  try {
    await page.getByRole('heading', { name: /如意数据大屏 RuyiBigScreen/ }).waitFor({
      state: 'visible',
      timeout: 15_000,
    })
    await page.getByTestId('metric-card').first().waitFor({ state: 'visible' })
    await page.getByText('中心态势总览').first().waitFor({ state: 'visible' })
    await page.getByTestId('chart-map').waitFor({ state: 'visible' })

    const loadFailure = await page.getByText('数据加载失败').count()
    if (loadFailure > 0) {
      consoleErrors.push('页面显示数据加载失败')
    }

    await page.waitForTimeout(4_500)
    await page.screenshot({ path: screenshotPath, fullPage: false })
  } finally {
    await browser.close()
  }

  const relativePath = path.relative(projectRoot, screenshotPath).replaceAll(path.sep, '/')

  if (consoleErrors.length > 0) {
    console.error(`截图已保存：${relativePath}`)
    console.error('截图过程中发现 console error：')
    for (const error of consoleErrors) {
      console.error(`- ${error}`)
    }
    process.exit(1)
  }

  console.log(`截图已保存：${relativePath}`)
  console.log('截图完成，未发现 console error。')
}

await captureDashboard()
