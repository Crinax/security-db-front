<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useAppStateStore } from '@/app/stores/app-state';
import AppLoader from '@uikit/loaders/AppLoader.vue';

const appSettings = useAppStateStore();
</script>

<template>
  <div id="app-modals">
    <app-loader v-if="appSettings.isLoading" />
  </div>
  <div id="app-view">
    <router-view />
  </div>
</template>

<style scoped lang="scss">
#app-view {
  width: 100vw;
  height: 100vh;
  box-shadow: 0px 0px 12px 0px #0003;
  gap: 12px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  background-color: var(--color__background);

  &__view {
    padding: 8px;
    width: 100%;
    height: 100%;
    overflow: auto;
  }
}

#app-modals {
  position: absolute;
}
</style>
