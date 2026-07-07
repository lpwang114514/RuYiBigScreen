<template>
  <div
    ref="chartRef"
    class="chart"
    data-testid="chart-line"
  />
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

import type { TrendPoint } from '@/types/dashboard'
import { useElementResize } from '@/utils/resize'

const props = defineProps<{
  data: TrendPoint[]
}>()

const chartRef = ref<HTMLElement | null>(null)
let chart: echarts.ECharts | undefined

function renderChart() {
  if (!chartRef.value) {
    return
  }

  chart ??= echarts.init(chartRef.value)
  chart.setOption({
    color: ['#2ee6ff', '#ffd166'],
    grid: { left: 42, right: 18, top: 34, bottom: 28 },
    tooltip: { trigger: 'axis' },
    legend: { top: 0, right: 0, textStyle: { color: '#a9c6dc' } },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: props.data.map((item) => item.time),
      axisLine: { lineStyle: { color: '#24485e' } },
      axisLabel: { color: '#9bb9cc' },
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: 'rgba(92, 170, 210, 0.16)' } },
      axisLabel: { color: '#9bb9cc' },
    },
    series: [
      {
        name: '访问量',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        areaStyle: { color: 'rgba(46, 230, 255, 0.14)' },
        data: props.data.map((item) => item.visits),
      },
      {
        name: '订单数',
        type: 'line',
        smooth: true,
        yAxisIndex: 0,
        data: props.data.map((item) => item.orders),
      },
    ],
  })
}

onMounted(renderChart)
watch(() => props.data, renderChart, { deep: true })
useElementResize(chartRef, () => chart?.resize())

onBeforeUnmount(() => {
  chart?.dispose()
})
</script>
