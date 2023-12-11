<script setup lang="ts">
import AppLawsList from '@widgets/laws/AppLawsList.vue';
</script>

<template>
  <div class="laws-view">
    <app-laws-list class="laws-view__list" />
  </div>
</template>

<style scoped lang="scss">
.laws-view {
  width: 100%;
  overflow-y: hidden;
  position: relative;
  max-height: 100%;
  display: flex;
  flex-direction: column;

  &__list {
    padding: 0 25%;
    max-height: 100%;
  }
}
</style>