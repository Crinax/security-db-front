import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

export const useAppSettingsStore = defineStore('app-settings', () => {
  const isDevMode = computed(() => import.meta.env.DEV);
  const isAppLoading = ref(false);
  
  const showLoader = () => {
    isAppLoading.value = true;
  };
  const hideLoader = () => {
    isAppLoading.value = false;
  };

  return { isDevMode, showLoader, hideLoader, isAppLoading };
});
