<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useAppSettingsStore } from '@/app/stores/app-settings';
import AppLoader from '@uikit/loaders/AppLoader.vue';

const appSettings = useAppSettingsStore();
</script>

<template>
  <div id="app-modals">
    <app-loader v-if="appSettings.isAppLoading" />
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
  border: 2px solid #fff3;
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
