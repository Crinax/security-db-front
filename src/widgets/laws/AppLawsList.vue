<script setup lang="ts">
import AppLaw from '@entities/laws/AppLaw.vue';
import AppInput from '@uikit/AppInput.vue';
import AppButton from '@uikit/AppButton.vue';
import { ref } from 'vue';

const searchInput = ref('');
</script>

<template>
  <div class="laws-list">
    <app-input v-model="searchInput" placeholder="Поиск" class="laws-list__search-input" />
    <div class="laws-list__list scroll-style">
      <app-law
        v-for="i in 20"
        :key="i"
        law-uid="a"
        :start-activity-date="new Date('2023-10-10')"
        first-name="Gomer"
        second-name="Simpson"
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
