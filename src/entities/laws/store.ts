import { useAppStateStore } from '@/app/stores/app-state';
import { api } from '@/shared/api';
import { ApiError } from '@/shared/api/errors';
import type { LawsResponseValidator } from '@/shared/api/laws/validators';
import { wrapArray } from '@/shared/helpers/arrays';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export interface LawsState {
  avatar_uid: string | null;
  first_name: string;
  itn: string;
  law_uid: string;
  patronymic: string | null;
  second_name: string;
  start_activity_date: Date;
  uid: string;
}

export const useLawsStore = defineStore('laws', () => {
  const laws = ref<LawsState[]>([]);
  const appState = useAppStateStore();

  const mappedLaws = computed(() => laws.value.map((law) => ({ [law.uid]: law })));
  const mappedLawsIndex = computed(
    () => laws.value
      .map((law, index) => ({ [law.uid]: index }))
      .reduce((a, b) => ({ ...a, ...b }))
  );

  const requestLaws = async () => {
    const lawsResponse = await appState.runAsync(() => api.lawsModule().getLaws());

    if (!(lawsResponse instanceof ApiError)) {
      requestLawsLocal(wrapArray(lawsResponse));
    }
  }

  const requestLawsLocal = (_laws: LawsResponseValidator[]) => {
    laws.value.splice(0, laws.value.length, ..._laws);
  }

  const removeLawsLocal = (uid: string) => {
    const index = mappedLawsIndex.value[uid];

    if (index !== undefined) {
      laws.value.splice(index, 1);

      return true;
    }

    return false;
  }

  const addLawsLocal = (law: LawsResponseValidator) => {
    laws.value.push(law);
  }

  return {
    laws,
    mappedLaws,
    requestLaws,
    requestLawsLocal,
    removeLawsLocal,
    addLawsLocal,
  }
});
