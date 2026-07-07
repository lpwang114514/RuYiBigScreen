<template>
  <section class="base-panel">
    <header class="base-panel__header">
      <h2>{{ title }}</h2>
      <span
        v-if="tag"
        class="base-panel__tag"
      >{{ tag }}</span>
    </header>
    <div class="base-panel__body">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  tag?: string
}>()
</script>
