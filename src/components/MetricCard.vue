<template>
  <article
    class="metric-card"
    data-testid="metric-card"
  >
    <div class="metric-card__label">
      {{ metric.label }}
    </div>
    <div class="metric-card__value">
      {{ formatMetricValue(metric.value, metric.unit) }}
    </div>
    <div
      class="metric-card__trend"
      :class="`metric-card__trend--${metric.status}`"
    >
      <span>{{ trendSymbol }}</span>
      <strong>{{ formatPercent(metric.trend) }}</strong>
      <em>较昨日</em>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { formatMetricValue, formatPercent } from '@/utils/format'
import type { SummaryMetric } from '@/types/dashboard'

const props = defineProps<{
  metric: SummaryMetric
}>()

const trendSymbol = computed(() => {
  if (props.metric.status === 'down') {
    return '↓'
  }

  if (props.metric.status === 'stable') {
    return '→'
  }

  return '↑'
})
</script>
