<script lang="ts" setup>
import FlexCenterLayout from '@layouts/FlexCenterLayout.vue';
import AppHeader from '@uikit/AppHeader.vue';
import AppText from '@uikit/AppText.vue';
import { RouterLink, useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const titleText = computed(() => route.name === 'login' ? 'Вход' : 'Регистрация');
const routeToSwitch = computed(() => route.name === 'login' ? 'signup' : 'login');
const linkText = computed(() => routeToSwitch.value === 'login'
  ? 'Войти'
  : 'Присоединиться!'
);
const labelText = computed(() => routeToSwitch.value === 'login'
  ? 'Уже есть аккаунт?'
  : 'Ещё не зарегистрированы?'
)
</script>

<template>
  <flex-center-layout direction="column" :is-full="true">
    <app-header level="3" :line="false">
      {{ titleText }}
    </app-header>

    <slot />

    <div class="auth-switch">
      <app-text>
        {{ labelText }}
        <router-link :to="routeToSwitch">{{ linkText }}</router-link>
      </app-text>
    </div>
  </flex-center-layout>
</template>

<style lang="scss" scoped>
.auth-switch {
  margin-top: 1rem;

  * {
    font-size: 1rem;
  }
}
</style>
