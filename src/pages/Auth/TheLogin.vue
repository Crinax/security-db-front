<script lang="ts" setup>
import AuthLayout from '@layouts/AuthLayout.vue';
import AppInput from '@uikit/AppInput.vue';
import AppButton from '@uikit/AppButton.vue';
import AppText from '@uikit/AppText.vue';
import { ref, computed } from 'vue';
import { api } from '@shared/api';
import { useAppStateStore } from '@/app/stores/app-state';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const usernameOrEmail = ref('');
const password = ref('');
const error = ref('');
const isLoading = ref(false);
const hasError = computed(() => error.value.length !== 0);
const appStateStore = useAppStateStore();

const checkFormAndSend = async () => {
  error.value = '';

  const result = await appStateStore.runAsync(() => 
      api.authModule().auth({
        email_or_username: usernameOrEmail.value,
        password: password.value
      })
  );

  
  if (result) {
    error.value = `${result}`;
    return;
  }

  if (route.query.next) {
    router.replace({ path: route.query.next.toString() });
    return;
  }

  router.replace({ name: 'home' });
}
</script>

<template>
  <auth-layout>
    <div class="auth-login">
      <app-text v-if="hasError" kind="error" class="text-error">{{ error }}</app-text>

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

.text-error {
  font-size: 1rem;
}
</style>
