<script lang="ts" setup>
import AuthLayout from '@layouts/AuthLayout.vue';
import AppInput from '@uikit/AppInput.vue';
import AppButton from '@uikit/AppButton.vue';
import { ref } from 'vue';

const usernameOrEmail = ref('');
const password = ref('');
</script>

<template>
  <auth-layout>
    <div class="auth-login">
      <app-input v-model="usernameOrEmail" class="auth-login__input" placeholder="Имя пользователя или эл. почта">
        <template #label>
          Имя пользователя или электронная почта:
        </template>
      </app-input>
      
      <app-input v-model="password" class="auth-login__input" placeholder="Пароль" type="password">
        <template #label>
          Пароль:
        </template>
      </app-input>

      <app-button>
        Войти
      </app-button>
    </div>
  </auth-layout>
</template>

<style lang="scss" scoped>
.auth-login {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.auth-login__input {
  width: 100%;
}
</style>
