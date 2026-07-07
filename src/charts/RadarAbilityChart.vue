<template>
  <div
    ref="chartRef"
    class="chart"
    data-testid="chart-radar"
  />
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

import type { RadarData } from '@/types/dashboard'
import { useElementResize } from '@/utils/resize'

const props = defineProps<{
  data: RadarData
}>()

const chartRef = ref<HTMLElement | null>(null)
let chart: echarts.ECharts | undefined

function renderChart() {
  if (!chartRef.value) {
    return
  }

  chart ??= echarts.init(chartRef.value)
  chart.setOption({
    color: ['#2ee6ff'],
    radar: {
      center: ['50%', '54%'],
      radius: '68%',
      indicator: props.data.indicators,
      axisName: { color: '#d6edf7' },
      splitArea: { areaStyle: { color: ['rgba(46, 230, 255, 0.04)', 'transparent'] } },
      axisLine: { lineStyle: { color: 'rgba(92, 170, 210, 0.28)' } },
      splitLine: { lineStyle: { color: 'rgba(92, 170, 210, 0.2)' } },
    },
    series: [
      {
        type: 'radar',
        data: [{ name: '能力指数', value: props.data.values }],
        areaStyle: { color: 'rgba(46, 230, 255, 0.22)' },
        lineStyle: { width: 2 },
        symbolSize: 5,
      },
    ],
  })
}

onMounted(renderChart)
watch(() => props.data, renderChart, { deep: true })
useElementResize(chartRef, () => chart?.resize())

onBeforeUnmount(() => chart?.dispose())
</script>
