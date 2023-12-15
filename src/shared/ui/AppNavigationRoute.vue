<script setup lang="ts">
import { computed } from 'vue';

export interface AppNavigationRouteProps {
  isActive: boolean;
  routeTitle: string;
  routeIcon?: string;
}

const props = defineProps<AppNavigationRouteProps>();
const activeClass = computed(
  () => props.isActive ? 'app-navigation-route__active' : ''
);
</script>

<template>
  <span class="app-navigation-route" :class="activeClass" role="button">
    <span class="app-navigation-route__icon">
      <v-icon v-if="routeIcon" :name="routeIcon" scale="1.1" />
    </span>
    <span class="app-navigation-route__text">{{ routeTitle }}</span>
  </span>
</template>

<style scoped lang="scss">
.app-navigation-route {
  display: flex;
  gap: 1rem;
  padding: 0.5rem 1.5rem;
  display: flex;
  align-items: center;
  background-color: var(--color__primary);

  &__text {
    font-size: 1rem;
  }

  &__icon {
    width: 1rem;
    height: 1rem;
    display: flex;
    flex-shrink: 0;
  }

  &:hover, &__acitve {
    filter: brightness(120%);
  }
}
</style>
