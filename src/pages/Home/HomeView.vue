<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAppSettingsStore } from '@app/stores/app-settings'

const appSettings = useAppSettingsStore()
</script>

<template>
  <main class="app-main">
    <router-link v-if="appSettings.isDevMode" :to="{ name: 'components' }">Components</router-link>
  </main>
</template>

<style scoped lang="scss">
.app-main {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
