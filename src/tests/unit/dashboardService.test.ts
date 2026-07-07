import { describe, expect, it } from 'vitest'

import { getDashboardData } from '@/services/dashboardService'

describe('dashboardService', () => {
  it('returns dashboard data in mock mode', async () => {
    const data = await getDashboardData()

    expect(data.summary.length).toBeGreaterThan(0)
    expect(data.trend.length).toBeGreaterThan(0)
    expect(data.activities[0]?.title).toContain('节点')
  })
})
