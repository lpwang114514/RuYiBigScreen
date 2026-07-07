<template>
  <div
    ref="chartRef"
    class="chart chart--map"
    data-testid="chart-map"
  />
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

import type { MapNode } from '@/types/dashboard'
import { useElementResize } from '@/utils/resize'

const props = defineProps<{
  data: MapNode[]
}>()

const chartRef = ref<HTMLElement | null>(null)
let chart: echarts.ECharts | undefined

function renderChart() {
  if (!chartRef.value) {
    return
  }

  const links = props.data
    .filter((node) => node.level !== 'core')
    .map((node) => ({
      source: '如意中枢',
      target: node.name,
      lineStyle: { color: 'rgba(46, 230, 255, 0.36)', width: 2 },
    }))

  chart ??= echarts.init(chartRef.value)
  chart.setOption({
    tooltip: { formatter: '{b}: {c}' },
    xAxis: { min: -100, max: 100, show: false },
    yAxis: { min: -86, max: 86, show: false },
    series: [
      {
        type: 'graph',
        coordinateSystem: 'cartesian2d',
        layout: 'none',
        roam: false,
        symbolSize: (value: number[]) => Math.max(24, value[2] / 2),
        label: { show: true, color: '#e8fbff', fontWeight: 600 },
        edgeSymbol: ['none', 'arrow'],
        edgeSymbolSize: [0, 8],
        data: props.data.map((node) => ({
          name: node.name,
          value: [node.x, node.y, node.value],
          itemStyle: {
            color:
              node.level === 'core' ? '#f9d85e' : node.level === 'hot' ? '#2ee6ff' : '#47d16c',
            shadowBlur: 22,
            shadowColor: 'rgba(46, 230, 255, 0.45)',
          },
        })),
        links,
        lineStyle: { curveness: 0.14 },
      },
      {
        type: 'effectScatter',
        coordinateSystem: 'cartesian2d',
        rippleEffect: { brushType: 'stroke', scale: 4 },
        symbolSize: 18,
        data: props.data
          .filter((node) => node.level !== 'core')
          .map((node) => [node.x, node.y, node.value]),
        itemStyle: { color: '#2ee6ff' },
      },
    ],
  })
}

onMounted(renderChart)
watch(() => props.data, renderChart, { deep: true })
useElementResize(chartRef, () => chart?.resize())

onBeforeUnmount(() => chart?.dispose())
</script>
