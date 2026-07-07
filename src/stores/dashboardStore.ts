import { defineStore } from 'pinia'

import { logger } from '@/logs/logger'
import { getDashboardData } from '@/services/dashboardService'
import type { DashboardData } from '@/types/dashboard'

interface DashboardState {
  data: DashboardData | null
  loading: boolean
  error: string
}

export const useDashboardStore = defineStore('dashboard', {
  state: (): DashboardState => ({
    data: null,
    loading: false,
    error: '',
  }),
  actions: {
    async fetchDashboard() {
      this.loading = true
      this.error = ''

      try {
        this.data = await getDashboardData()
        logger.info('Dashboard data loaded')
      } catch (error) {
        this.error = error instanceof Error ? error.message : '数据加载失败'
        logger.error('Dashboard data load failed', { error: this.error })
      } finally {
        this.loading = false
      }
    },
  },
})
