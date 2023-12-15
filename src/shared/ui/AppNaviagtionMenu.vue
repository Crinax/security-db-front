<script setup lang="ts">
import { computed } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import AppNavigationRoute from '@uikit/AppNavigationRoute.vue';
import type { RouteRecordRaw } from 'vue-router';

const router = useRouter();
const routes = computed(
  () => router.options.routes
    .filter(
      (route) => route.meta?.showInNavigation && route.meta?.routeTitle
    )
    .sort(
      (a, b) => a.meta?.order && b.meta?.order
        ? a.meta?.order - b.meta?.order
        : -1
    ) as (RouteRecordRaw & { meta: { routeTitle: string }})[]
);
</script>

<template>
  <div class="app-navigation-menu">
    <router-link
      v-for="route in routes"
      class="app-navigation-menu__item"
      v-slot="{ isActive }"
      :key="route.path"
      :to="{ name: route.name }"
    >
      <app-navigation-route
        :is-active="isActive"
        :route-title="route.meta.routeTitle"
        :route-icon="route.meta.routeIcon"
      />
    </router-link>
  </div>
</template>

<style scoped lang="scss">
.app-navigation-menu {
  border-radius: 8px;
  overflow: hidden;
  width: 15rem;
  display: flex;
  flex-direction: column;
  background-color: var(--color__primary);
  box-shadow: 0px 0px 6px 0px #00000075;

  &__item {
    text-decoration: none;
    border-bottom: 1px solid var(--color__input);

    &:last-child {
      border: none;
    }
  }
}
</style>
