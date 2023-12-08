<script lang="ts" setup>
import AuthLayout from '@layouts/AuthLayout.vue';
import AppInput from '@uikit/AppInput.vue';
import AppButton from '@uikit/AppButton.vue';
import AppText from '@uikit/AppText.vue';
import { useAppSettingsStore } from '@app/stores/app-settings';
import { ref, computed } from 'vue';

const usernameOrEmail = ref('');
const password = ref('');
const error = ref('');
const isLoading = ref(false);
const hasError = computed(() => error.value.length !== 0);
const appSettings = useAppSettingsStore();

const CLIENT_ERROR_MESSAGE = 'Имя пользователя или пароль введены некорректно!'

// TODO: use class-validator
const checkFormAndSend = () => {
  if (hasError.value) {
    return;
  }

  if (password.value.length < 8 || password.value.length > 32) {
    error.value = CLIENT_ERROR_MESSAGE;
    return;
  }

  if (usernameOrEmail.value.length < 3 || usernameOrEmail.value.length > 255) {
    error.value = CLIENT_ERROR_MESSAGE;
    return;
  }

  error.value = '';
  isLoading.value = true;
  appSettings.showLoader();
}
</script>

<template>
  <auth-layout>
    <div class="auth-login">
      <app-text v-if="hasError" kind="error">{{ error }}</app-text>

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

      <app-button @click="checkFormAndSend" :block="isLoading">
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
  width: 40%;
}

.auth-login__input {
  width: 100%;
}
</style>
