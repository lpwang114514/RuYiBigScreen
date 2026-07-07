export type MetricStatus = 'up' | 'down' | 'stable' | 'good' | 'warning'
export type ActivityLevel = 'info' | 'warning' | 'success'

export interface SummaryMetric {
  id?: string
  key: string
  label: string
  value: number
  unit: string
  trend: number
  status: MetricStatus
}

export interface TrendPoint {
  time: string
  visits: number
  orders: number
}

export interface CategoryDistribution {
  name: string
  value: number
}

export type CategoryItem = CategoryDistribution

export interface RankingItem {
  city: string
  value: number
}

export interface RadarIndicator {
  name: string
  max: number
}

export interface RadarData {
  indicators: RadarIndicator[]
  values: number[]
}

export interface MapNode {
  name: string
  value: number
  x: number
  y: number
  level: 'core' | 'hot' | 'normal'
}

export interface HubNode {
  name: string
  value: number
  coord: [number, number]
  status: 'good' | 'warning' | 'danger'
  description: string
}

export interface ActivityItem {
  id: string
  time: string
  level: ActivityLevel
  type?: ActivityLevel
  title?: string
  message?: string
  location?: string
}

export interface DashboardData {
  updatedAt: string
  summary: SummaryMetric[]
  trend: TrendPoint[]
  categories: CategoryDistribution[]
  ranking: RankingItem[]
  radar: RadarData
  mapNodes: MapNode[]
  hubNodes: HubNode[]
  activities: ActivityItem[]
}
