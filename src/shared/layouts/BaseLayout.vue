<script setup lang="ts">
import HeaderLayout from '@layouts/HeaderLayout.vue';
import AppNavigationMenu from '@uikit/AppNaviagtionMenu.vue';
</script>

<template>
  <header-layout>
    <div class="base-layout">
      <div class="base-layout__left-side">
        <app-navigation-menu />
      </div>

      <div class="base-layout__right-side">
        <slot />
      </div>
    </div>
  </header-layout>
</template>

<style scoped lang="scss">
.base-layout {
  display: flex;
  gap: 2rem;
  width: 100%;
  max-height: 100%;
  overflow: hidden;
  justify-content: flex-start;

  &__left-side {
    flex-shrink: 0;
  }

  &__right-side {
    width: 100%;
    overflow-y: auto;
  }
}
</style>
