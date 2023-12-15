<script setup lang="ts">
import TheHeader from '@uikit/TheHeader.vue';
import FlexCenterLayout from '@layouts/FlexCenterLayout.vue';
import { useAppStateStore } from '@app/stores/app-state';
import { useRouter } from 'vue-router';
import { api } from '@shared/api';


const appState = useAppStateStore();
const router = useRouter();

const logout = async () => {
  await appState.runAsync(() => api.authModule().logout());
  router.push({ name: 'login' });
}
</script>

<template>
  <div class="header-layout">
    <the-header class="header-layout__header" @logout="logout" />
    <div class="header-layout__content">
      <flex-center-layout class="header-layout__content-flexed">
        <slot />
      </flex-center-layout>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header-layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;

  &__header {
    flex-shrink: 0;
  }

  &__content {
    margin: 0 auto;
    width: 80%;
    max-height: 100%;
    overflow: hidden;
  }

  &__content-flexed {
    height: 100%;
    overflow: hidden;
  }
}
</style>
