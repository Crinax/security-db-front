<script setup lang="ts">
import AppIconButton from '@uikit/AppIconButton.vue';

export interface TheHeaderEmits {
  (e: 'logout'): any;
  (e: 'account'): any;
}

const emit = defineEmits<TheHeaderEmits>();
</script>

<template>
  <div class="the-header">
    <div class="the-header__content header-content">
      <app-icon-button
        name="oi-person"
        scale="1.4"
        class="header-content__account"
        @click="emit('account')"
      />
      <app-icon-button
        name="oi-sign-out"
        scale="1.4"
        fill="#fa4444"
        class="header-content__signout"
        @click="emit('logout')"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.the-header {
  width: 100%;
  height: 2.5rem;
  background-color: var(--color__primary);
  border-bottom: 1px solid var(--color__input);
  display: flex;
  justify-content: center;
  align-items: center;

  &__content {
    width: 80%;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
}

.header-content {
  &__account {
    margin-left: auto;
  }
}
</style>
