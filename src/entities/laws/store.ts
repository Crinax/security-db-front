import { useAppStateStore } from '@/app/stores/app-state';
import { api } from '@/shared/api';
import { ApiError } from '@/shared/api/errors';
import type { LawsResponseValidator } from '@/shared/api/laws/validators';
import { wrapArray } from '@/shared/helpers/arrays';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { showError } from '@/shared/helpers/notify';

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

  const mappedLaws = computed(() => laws.value.map((law) => ({ [law.law_uid]: law })));

  const requestLaws = async () => {
    const lawsResponse = await appState.runAsync(() => api.lawsModule().getLaws());

    if (!(lawsResponse instanceof ApiError)) {
      requestLawsLocal(wrapArray(lawsResponse));
    }
  }

  const removeLaws = async (uids: string[]) => {
    removeLawsLocal(uids);
    const response = await appState.runAsync(() => api.lawsModule().deleteMany(uids));

    if (response instanceof ApiError) {
      showError(`${response}`);
    }
  }

  const requestLawsLocal = (_laws: LawsResponseValidator[]) => {
    laws.value.splice(0, laws.value.length, ..._laws);
  }

  const removeLawsLocal = (uids: string[]) => {
    const filtered = laws.value.filter((law) => !uids.includes(law.law_uid));
    laws.value.splice(0, laws.value.length, ...filtered);
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
    removeLaws,
  }
});
