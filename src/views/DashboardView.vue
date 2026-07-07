<template>
  <BigScreenLayout>
    <ScreenHeader />

    <div
      v-if="store.loading"
      class="dashboard-state"
    >
      数据加载中...
    </div>
    <div
      v-else-if="store.error"
      class="dashboard-state dashboard-state--error"
    >
      {{ store.error }}
    </div>

    <template v-else-if="dashboard">
      <section class="metric-grid">
        <MetricCard
          v-for="metric in dashboard.summary"
          :key="metric.key"
          :metric="metric"
        />
      </section>

      <section class="dashboard-grid">
        <div class="dashboard-grid__side">
          <BasePanel
            title="访问趋势"
            tag="Trend"
          >
            <LineTrendChart :data="dashboard.trend" />
          </BasePanel>
          <BasePanel
            title="分类占比"
            tag="Distribution"
          >
            <PieStatusChart :data="dashboard.categories" />
          </BasePanel>
        </div>

        <div class="dashboard-grid__center">
          <BasePanel
            title="中心态势总览"
            tag="Overview"
          >
            <MapOverviewChart :data="dashboard.mapNodes" />
          </BasePanel>
        </div>

        <div class="dashboard-grid__side">
          <BasePanel
            title="城市排名"
            tag="Ranking"
          >
            <BarRankingChart :data="dashboard.ranking" />
          </BasePanel>
          <BasePanel
            title="能力雷达"
            tag="Ability"
          >
            <RadarAbilityChart :data="dashboard.radar" />
          </BasePanel>
        </div>
      </section>

      <BasePanel
        class="activity-panel"
        title="实时动态与告警"
        tag="Activity"
      >
        <ul class="activity-list">
          <li
            v-for="item in dashboard.activities"
            :key="item.id"
            class="activity-list__item"
            :class="`activity-list__item--${item.type ?? item.level}`"
          >
            <time>{{ item.time }}</time>
            <strong>{{ item.title ?? item.message }}</strong>
            <span>{{ item.location ?? item.level }}</span>
          </li>
        </ul>
      </BasePanel>
    </template>
  </BigScreenLayout>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'

import BarRankingChart from '@/charts/BarRankingChart.vue'
import LineTrendChart from '@/charts/LineTrendChart.vue'
import MapOverviewChart from '@/charts/MapOverviewChart.vue'
import PieStatusChart from '@/charts/PieStatusChart.vue'
import RadarAbilityChart from '@/charts/RadarAbilityChart.vue'
import BasePanel from '@/components/BasePanel.vue'
import MetricCard from '@/components/MetricCard.vue'
import ScreenHeader from '@/components/ScreenHeader.vue'
import BigScreenLayout from '@/layouts/BigScreenLayout.vue'
import { useDashboardStore } from '@/stores/dashboardStore'

const store = useDashboardStore()
const dashboard = computed(() => store.data)

onMounted(() => {
  void store.fetchDashboard()
})
</script>
