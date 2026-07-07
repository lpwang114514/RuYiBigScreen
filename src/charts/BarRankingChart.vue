<template>
  <div
    ref="chartRef"
    class="chart"
    data-testid="chart-ranking"
  />
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

import type { RankingItem } from '@/types/dashboard'
import { useElementResize } from '@/utils/resize'

const props = defineProps<{
  data: RankingItem[]
}>()

const chartRef = ref<HTMLElement | null>(null)
let chart: echarts.ECharts | undefined

function renderChart() {
  if (!chartRef.value) {
    return
  }

  chart ??= echarts.init(chartRef.value)
  chart.setOption({
    grid: { left: 48, right: 18, top: 18, bottom: 24 },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: 'rgba(92, 170, 210, 0.14)' } },
      axisLabel: { color: '#9bb9cc' },
    },
    yAxis: {
      type: 'category',
      data: props.data.map((item) => item.city).reverse(),
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: { color: '#d6edf7' },
    },
    series: [
      {
        type: 'bar',
        barWidth: 12,
        data: props.data.map((item) => item.value).reverse(),
        itemStyle: {
          borderRadius: [0, 8, 8, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#2f80ed' },
            { offset: 0.55, color: '#2ee6ff' },
            { offset: 1, color: '#f9d85e' },
          ]),
        },
      },
    ],
  })
}

onMounted(renderChart)
watch(() => props.data, renderChart, { deep: true })
useElementResize(chartRef, () => chart?.resize())

onBeforeUnmount(() => chart?.dispose())
</script>
