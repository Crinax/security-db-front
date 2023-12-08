import { computed } from 'vue';
import { defineStore } from 'pinia';

export const useAppSettinsStore = defineStore('app-settings', () => {
  const isDevMode = computed(() => import.meta.env.DEV);

  return { isDevMode };
});
