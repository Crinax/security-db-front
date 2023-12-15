<script setup lang="ts">
import AppLawsList from '@widgets/laws/AppLawsList.vue';
import BaseLayout from '@layouts/BaseLayout.vue';
</script>

<template>
  <base-layout>
    <div class="laws-view">
      <app-laws-list class="laws-view__list" />
    </div>
  </base-layout>
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
    max-height: 100%;
  }
}
</style>
