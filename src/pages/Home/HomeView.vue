<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAppSettingsStore } from '@app/stores/app-settings'
import AppButton from '@/shared/ui/AppButton.vue'; 
import { useAppStateStore } from '@/app/stores/app-state';
import { api } from '@/shared/api';
import { useRouter } from 'vue-router';

const appSettings = useAppSettingsStore();
const appState = useAppStateStore();
const router = useRouter();

const logout = async () => {
  await appState.runAsync(() => api.authModule().logout());
  router.push({ name: 'login' });
}
</script>

<template>
  <main class="app-main">
    <router-link v-if="appSettings.isDevMode" :to="{ name: 'components' }">Components</router-link>
    <router-link :to="{ name: 'laws' }">Laws</router-link>
    <app-button @click="logout">Logout</app-button>
  </main>
</template>

<style scoped lang="scss">
.app-main {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
