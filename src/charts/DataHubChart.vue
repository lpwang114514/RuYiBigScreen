<template>
  <div
    ref="chartRef"
    class="echarts"
    data-testid="data-hub-chart"
  />
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

import type { HubNode } from '../types/dashboard'
import { observeResize } from '../utils/resize'

const props = defineProps<{
  data: HubNode[]
}>()

const chartRef = ref<HTMLDivElement | null>(null)
let chart: echarts.ECharts | null = null
let resizeObserver: ResizeObserver | null = null

const centerNode = {
  name: '如意数据中枢',
  value: [50, 50, 100],
}

const statusColor = {
  good: '#56f0c0',
  warning: '#f4c96b',
  danger: '#ff6b7a',
}

function nodeSize(value: number) {
  return Math.max(18, Math.round(value / 2.8))
}

function renderChart() {
  if (!chart) return

  const hubNodes = props.data.map((node) => ({
    name: node.name,
    value: [...node.coord, node.value],
    status: node.status,
    description: node.description,
    symbolSize: nodeSize(node.value),
    itemStyle: {
      color: statusColor[node.status],
      shadowBlur: 18,
      shadowColor: statusColor[node.status],
    },
  }))

  chart.setOption({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      borderColor: 'rgba(99, 208, 255, 0.36)',
      backgroundColor: 'rgba(4, 17, 32, 0.92)',
      textStyle: { color: '#eaf9ff' },
      formatter: (params: { data?: HubNode & { value?: number[] }; name: string }) => {
        const data = params.data
        if (!data?.value) return `${params.name}<br />数据流转核心`

        const statusText = {
          good: '运行良好',
          warning: '重点关注',
          danger: '风险告警',
        }[data.status]

        return [
          `${params.name}`,
          `活跃度 ${data.value[2]}`,
          `状态 ${statusText}`,
          data.description,
        ].join('<br />')
      },
    },
    grid: { top: 10, right: 10, bottom: 10, left: 10 },
    xAxis: { min: 0, max: 100, show: false },
    yAxis: { min: 0, max: 100, show: false },
    series: [
      {
        name: '国风星轨',
        type: 'lines',
        coordinateSystem: 'cartesian2d',
        polyline: true,
        silent: true,
        z: 1,
        lineStyle: {
          color: 'rgba(123, 226, 255, 0.18)',
          width: 1,
          type: 'dashed',
        },
        data: [
          { coords: [[50, 13], [72, 22], [87, 50], [72, 78], [50, 87], [28, 78], [13, 50], [28, 22], [50, 13]] },
          { coords: [[50, 26], [67, 33], [74, 50], [67, 67], [50, 74], [33, 67], [26, 50], [33, 33], [50, 26]] },
        ],
      },
      {
        name: '山水底纹',
        type: 'lines',
        coordinateSystem: 'cartesian2d',
        polyline: true,
        silent: true,
        z: 1,
        lineStyle: {
          color: 'rgba(244, 201, 107, 0.16)',
          width: 1,
          opacity: 0.72,
        },
        data: [
          { coords: [[8, 76], [20, 65], [33, 72], [44, 61], [58, 70], [71, 60], [92, 74]] },
          { coords: [[10, 82], [25, 78], [41, 84], [54, 76], [68, 82], [83, 76], [94, 80]] },
        ],
      },
      {
        name: '中枢链路',
        type: 'lines',
        coordinateSystem: 'cartesian2d',
        z: 2,
        effect: {
          show: true,
          period: 4,
          trailLength: 0.42,
          symbol: 'arrow',
          symbolSize: 7,
        },
        lineStyle: {
          color: 'rgba(86, 240, 192, 0.46)',
          width: 1.2,
          opacity: 0.86,
          curveness: 0.16,
        },
        data: props.data.map((node) => ({
          coords: [[50, 50], node.coord],
        })),
        silent: true,
      },
      {
        name: '业务节点',
        type: 'effectScatter',
        coordinateSystem: 'cartesian2d',
        z: 3,
        rippleEffect: {
          brushType: 'stroke',
          scale: 3.4,
        },
        label: {
          show: true,
          formatter: '{b}',
          position: 'bottom',
          color: '#dff8ff',
          fontSize: 12,
          lineHeight: 16,
          textBorderColor: 'rgba(3, 11, 24, 0.72)',
          textBorderWidth: 3,
        },
        data: hubNodes,
      },
      {
        name: '中心光环',
        type: 'effectScatter',
        coordinateSystem: 'cartesian2d',
        z: 4,
        rippleEffect: {
          brushType: 'stroke',
          scale: 5.8,
          period: 4,
        },
        symbolSize: 48,
        itemStyle: {
          color: '#45d9ff',
          shadowBlur: 30,
          shadowColor: '#45d9ff',
        },
        label: {
          show: true,
          formatter: '如意数据中枢',
          position: 'inside',
          color: '#ffffff',
          fontSize: 14,
          fontWeight: 700,
        },
        data: [centerNode],
      },
      {
        name: '中枢内核',
        type: 'scatter',
        coordinateSystem: 'cartesian2d',
        z: 5,
        symbolSize: 28,
        itemStyle: {
          color: '#f4c96b',
          shadowBlur: 24,
          shadowColor: '#f4c96b',
        },
        data: [centerNode],
        silent: true,
      },
    ],
  })
}

onMounted(() => {
  if (!chartRef.value) return
  chart = echarts.init(chartRef.value)
  resizeObserver = observeResize(chartRef.value, () => chart?.resize())
  renderChart()
})

watch(() => props.data, renderChart, { deep: true })

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  chart?.dispose()
})
</script>
