<script setup lang="ts">
import AppLaw from '@entities/laws/AppLaw.vue';
</script>

<template>
  <div class="laws-list">
    <app-law
      v-for="i in 20"
      :key="i"
      law-uid="a"
      :start-activity-date="new Date('2023-10-10')"
      first-name="Gomer"
      second-name="Simpson"
    />
  </div>
</template>

<style scoped lang="scss">
.laws-list {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  gap: 0.25rem;
}
</style>