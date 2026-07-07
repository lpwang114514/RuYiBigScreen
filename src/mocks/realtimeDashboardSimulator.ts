import { dashboardMock } from './dashboardMock'
import type {
  ActivityItem,
  CategoryItem,
  DashboardData,
  HubNode,
  RankingItem,
  SummaryMetric,
} from '../types/dashboard'

const TREND_LIMIT = 10
const ACTIVITY_LIMIT = 8

let frameIndex = 0
let state = cloneDashboard(dashboardMock)

const activityTemplates = {
  info: [
    '可视化案例库同步 {count} 条练习记录',
    '问答互动区新增高频问题聚类结果',
    '教学数据中枢完成一次轻量级状态采样',
  ],
  success: [
    '北京学习中心完成新一轮访问数据同步',
    '学员端新增一批项目实战提交',
    '教师端发布新的课堂任务',
    '数据质量巡检通过，异常值已自动标记',
  ],
  warning: [
    '华东节点接口延迟轻微升高，已切换备用通道',
    '告警中心发现轻微波动，正在持续观察',
  ],
} satisfies Record<ActivityItem['level'], string[]>

export function nextDashboardFrame(): DashboardData {
  frameIndex += 1
  state = {
    ...state,
    updatedAt: nextTimestamp(),
    summary: updateSummaryMetrics(state.summary),
    trend: updateTrendWindow(state),
    activities: updateActivities(state.activities),
    hubNodes: updateHubNodes(state.hubNodes),
    ranking: updateRanking(state.ranking),
    categories: updateCategories(state.categories),
    radar: updateRadar(state),
  }

  return cloneDashboard(state)
}

export function resetRealtimeDashboardSimulator() {
  frameIndex = 0
  state = cloneDashboard(dashboardMock)
}

function updateSummaryMetrics(summary: SummaryMetric[]): SummaryMetric[] {
  return summary.map((metric) => {
    if (metric.id === 'visits') {
      const delta = randomInt(20, 300)
      return {
        ...metric,
        value: metric.value + delta,
        trend: clamp(round1(metric.trend + randomFloat(-0.2, 0.5)), 8, 18),
        status: 'good' as const,
      }
    }

    if (metric.id === 'orders') {
      const delta = randomInt(0, 80)
      return {
        ...metric,
        value: metric.value + delta,
        trend: clamp(round1(metric.trend + randomFloat(-0.3, 0.4)), 4, 12),
        status: 'good' as const,
      }
    }

    if (metric.id === 'users') {
      const range = Math.max(120, metric.value * randomFloat(0.01, 0.03))
      const nextValue = Math.max(0, Math.round(metric.value + randomFloat(-range, range)))
      return {
        ...metric,
        value: nextValue,
        trend: clamp(round1(((nextValue - metric.value) / Math.max(metric.value, 1)) * 100), -3, 3),
        status: nextValue >= 38_000 ? 'good' : 'warning',
      }
    }

    if (metric.id === 'health') {
      const nextValue = clamp(round1(metric.value + randomFloat(-0.35, 0.28)), 95, 99.9)
      return {
        ...metric,
        value: nextValue,
        trend: clamp(round1(nextValue - metric.value), -1, 1),
        status: nextValue < 96.4 ? 'warning' : 'good',
      }
    }

    return metric
  })
}

function updateTrendWindow(data: DashboardData) {
  const visits = findMetric(data.summary, 'visits')
  const orders = findMetric(data.summary, 'orders')
  const lastTrend = data.trend.at(-1)

  const nextPoint = {
    time: formatTime(new Date()),
    visits: Math.max(
      lastTrend?.visits ?? 0,
      Math.round(visits.value / 4 + randomInt(1200, 3200)),
    ),
    orders: Math.max(
      lastTrend?.orders ?? 0,
      Math.round(orders.value / 6 + randomInt(60, 220)),
    ),
  }

  return [...data.trend, nextPoint].slice(-TREND_LIMIT)
}

function updateActivities(activities: ActivityItem[]) {
  if (frameIndex % randomInt(2, 3) !== 0) {
    return activities.slice(0, ACTIVITY_LIMIT)
  }

  return [createRealtimeActivity(), ...activities].slice(0, ACTIVITY_LIMIT)
}

function createRealtimeActivity(): ActivityItem {
  const level = pickActivityLevel()
  const templates = activityTemplates[level]
  const message = pick(templates).replace('{count}', String(randomInt(8, 18)))

  return {
    id: `rt-${frameIndex}-${Date.now()}`,
    time: formatClock(new Date()),
    level,
    message,
  }
}

function updateHubNodes(nodes: HubNode[]) {
  return nodes.map((node) => {
    const value = clamp(Math.round(node.value + randomInt(-4, 5)), 40, 100)
    const status = getHubStatus(value)

    return {
      ...node,
      value,
      status,
      description: describeHubNode(node.name, status),
    }
  })
}

function updateRanking(ranking: RankingItem[]) {
  if (frameIndex % 4 !== 0) return ranking

  return ranking
    .map((item) => ({
      ...item,
      value: item.value + randomInt(80, 520),
    }))
    .sort((left, right) => right.value - left.value)
}

function updateCategories(categories: CategoryItem[]) {
  if (frameIndex % 6 !== 0) return categories

  const changed = categories.map((item) => ({
    ...item,
    value: Math.max(3, item.value + randomInt(-2, 2)),
  }))
  const total = changed.reduce((sum, item) => sum + item.value, 0)
  let normalized = changed.map((item) => ({
    ...item,
    value: Math.max(1, Math.round((item.value / total) * 100)),
  }))
  const diff = 100 - normalized.reduce((sum, item) => sum + item.value, 0)
  normalized = normalized.map((item, index) =>
    index === 0 ? { ...item, value: item.value + diff } : item,
  )

  return normalized
}

function updateRadar(data: DashboardData) {
  if (frameIndex % 15 !== 0) return data.radar

  return {
    ...data.radar,
    values: data.radar.values.map((value) =>
      clamp(Math.round(value + randomInt(-1, 3)), 60, 100),
    ),
  }
}

function pickActivityLevel(): ActivityItem['level'] {
  const seed = Math.random()
  if (seed < 0.2) return 'warning'
  if (seed < 0.62) return 'success'
  return 'info'
}

function getHubStatus(value: number): HubNode['status'] {
  if (value < 55) return Math.random() < 0.25 ? 'danger' : 'warning'
  if (value < 70) return 'warning'
  return 'good'
}

function describeHubNode(name: string, status: HubNode['status']) {
  if (status === 'danger') return `${name}出现短时风险波动，告警中心正在观察`
  if (status === 'warning') return `${name}轻微波动，已进入重点关注队列`
  return `${name}运行平稳，数据同步保持良好`
}

function nextTimestamp() {
  return new Date(Date.now() + frameIndex * 1000).toISOString()
}

function findMetric(summary: SummaryMetric[], id: string) {
  const metric = summary.find((item) => item.id === id)
  if (!metric) throw new Error(`Missing summary metric: ${id}`)
  return metric
}

function cloneDashboard(data: DashboardData): DashboardData {
  return structuredClone(data)
}

function formatTime(date: Date) {
  return date.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

function formatClock(date: Date) {
  return date.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
}

function pick<T>(items: T[]) {
  return items[randomInt(0, items.length - 1)]
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomFloat(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function round1(value: number) {
  return Math.round(value * 10) / 10
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}
