import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAppStateStore = defineStore('error', () => {
  const error = ref('');
  const isLoading = ref(false);
  const hasError = computed(() => !isLoading.value && !!error.value.length);

  const runAsync = async <T>(asyncFn: () => Promise<T>) => {
    isLoading.value = true;
    error.value = '';
    const promiseResult = await asyncFn();
    isLoading.value = false;

    if (promiseResult instanceof Error) {
      error.value = `${promiseResult}`;
      return promiseResult;
    }

    return promiseResult;
  }

  return { error, isLoading, hasError, runAsync };
})
