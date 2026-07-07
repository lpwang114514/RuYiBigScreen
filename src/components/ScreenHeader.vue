<template>
  <header class="screen-header">
    <div class="screen-header__side">
      <span>教学型开源项目</span>
      <strong>Vue 3 + ECharts</strong>
    </div>
    <div class="screen-header__title">
      <h1>神秘数据大屏</h1>
      <p>Mock Data Visualization Teaching Dashboard</p>
    </div>
    <time
      class="screen-header__time"
      :datetime="isoNow"
    >{{ clock }}</time>
  </header>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

import { formatClock } from '@/utils/format'

const now = ref(new Date())
let timer: number | undefined

const clock = computed(() => formatClock(now.value))
const isoNow = computed(() => now.value.toISOString())

onMounted(() => {
  timer = window.setInterval(() => {
    now.value = new Date()
  }, 1_000)
})

onBeforeUnmount(() => {
  window.clearInterval(timer)
})
</script>
