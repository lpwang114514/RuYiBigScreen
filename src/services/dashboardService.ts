import { dashboardMock } from '@/mocks/dashboardMock'
import { getDataSource } from '@/services/dataSource'
import { http } from '@/services/http'
import type { DashboardData } from '@/types/dashboard'

export async function getDashboardData(): Promise<DashboardData> {
  if (getDataSource() === 'mock') {
    return Promise.resolve(structuredClone(dashboardMock))
  }

  const response = await http.get<DashboardData>('/api/dashboard')
  return response.data
}
