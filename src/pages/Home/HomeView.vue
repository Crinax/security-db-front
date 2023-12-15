<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAppSettingsStore } from '@app/stores/app-settings'
import AppButton from '@/shared/ui/AppButton.vue'; 
import { useAppStateStore } from '@/app/stores/app-state';
import { api } from '@/shared/api';
import { useRouter } from 'vue-router';
import BaseLayout from '@layouts/BaseLayout.vue';

const appSettings = useAppSettingsStore();
const appState = useAppStateStore();
const router = useRouter();

const logout = async () => {
  await appState.runAsync(() => api.authModule().logout());
  router.push({ name: 'login' });
}
</script>

<template>
  <base-layout>
  </base-layout>
</template>

<style scoped lang="scss">
.app-main {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
