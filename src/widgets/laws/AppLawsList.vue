<script setup lang="ts">
import AppLaw from '@entities/laws/AppLaw.vue';
import AppInput from '@uikit/AppInput.vue';
import AppButton from '@uikit/AppButton.vue';
import { computed, ref } from 'vue';
import { useLawsStore } from '@entities/laws/store';

const searchInput = ref('');
const lawsStore = useLawsStore();

lawsStore.requestLaws();

const searchedLaws = computed(
  () => lawsStore.laws.filter((law) =>
    law.first_name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      law.second_name.toLowerCase().includes(searchInput.value.toLowerCase())
  )
)
</script>

<template>
  <div class="laws-list">
    <app-input v-model="searchInput" placeholder="Поиск" class="laws-list__search-input" />
    <div class="laws-list__list scroll-style">
      <app-law
        v-for="law in searchedLaws"
        :key="law.uid"
        :law-uid="law.law_uid"
        :start-activity-date="law.start_activity_date"
        :first-name="law.first_name"
        :second-name="law.second_name"
      />
    </div>
    <app-button>Добавить</app-button>
  </div>
</template>

<style scoped lang="scss">
.laws-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  max-height: 100%;
  padding-bottom: 1rem;

  &__list {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    gap: 1rem;
  }

  &__search-input {
    width: 100%;
  }
}
</style>
