<template>
  <div
    ref="chartRef"
    class="chart"
    data-testid="chart-pie"
  />
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

import type { CategoryDistribution } from '@/types/dashboard'
import { useElementResize } from '@/utils/resize'

const props = defineProps<{
  data: CategoryDistribution[]
}>()

const chartRef = ref<HTMLElement | null>(null)
let chart: echarts.ECharts | undefined

function renderChart() {
  if (!chartRef.value) {
    return
  }

  chart ??= echarts.init(chartRef.value)
  chart.setOption({
    color: ['#2ee6ff', '#47d16c', '#f9d85e', '#ff7a90'],
    tooltip: { trigger: 'item' },
    legend: {
      bottom: 0,
      itemWidth: 10,
      itemHeight: 10,
      textStyle: { color: '#a9c6dc' },
    },
    series: [
      {
        name: '分类占比',
        type: 'pie',
        radius: ['45%', '68%'],
        center: ['50%', '45%'],
        label: { color: '#d6edf7', formatter: '{b}\n{d}%' },
        labelLine: { lineStyle: { color: '#4f8eaa' } },
        data: props.data,
      },
    ],
  })
}

onMounted(renderChart)
watch(() => props.data, renderChart, { deep: true })
useElementResize(chartRef, () => chart?.resize())

onBeforeUnmount(() => chart?.dispose())
</script>
