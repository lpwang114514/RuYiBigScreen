import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import '@/assets/styles/global.css'
import { logger } from '@/logs/logger'
import { startMockWorker } from '@/mocks/browser'

async function bootstrap() {
  await startMockWorker()

  const app = createApp(App)
  app.use(createPinia())
  app.mount('#app')

  logger.info('RuyiBigScreen app mounted', {
    dataSource: import.meta.env.VITE_DATA_SOURCE ?? 'mock',
  })
}

void bootstrap()
