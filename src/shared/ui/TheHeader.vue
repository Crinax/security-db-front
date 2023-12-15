<script setup lang="ts">
export interface TheHeaderEmits {
  (e: 'logout'): any;
  (e: 'account'): any;
}

const emit = defineEmits<TheHeaderEmits>();
</script>

<template>
  <div class="the-header">
    <div class="the-header__content header-content">
      <button
        class="header-content__account header-content__button"
        @click="emit('account')"
      >
        <v-icon name="oi-person" scale="1.4" />
      </button>
      <button
        class="header-content__signout header-content__button"
        @click="emit('logout')"
      >
        <v-icon name="oi-sign-out" scale="1.4" fill="#fa4444" />
      </button>
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

  &__button {
    aspect-ratio: 1/1;
    border-radius: 100%;
    border: none;
    background-color: var(--color__primary);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.25rem;

    &:hover {
      filter: brightness(150%);
    }
  }
}
</style>
