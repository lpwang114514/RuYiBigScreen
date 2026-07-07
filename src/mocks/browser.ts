import { logger } from '@/logs/logger'

export async function startMockWorker() {
  if (import.meta.env.DEV && import.meta.env.VITE_DATA_SOURCE === 'api') {
    const { setupWorker } = await import('msw/browser')
    const { handlers } = await import('./handlers')
    const worker = setupWorker(...handlers)

    await worker.start({
      onUnhandledRequest: 'bypass',
    })

    logger.info('MSW worker started for API development mode')
  }
}
