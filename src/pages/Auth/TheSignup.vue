<script lang="ts" setup>
import AuthLayout from '@layouts/AuthLayout.vue';
import AppInput from '@uikit/AppInput.vue';
import AppText from '@uikit/AppText.vue';
import AppButton from '@uikit/AppButton.vue';
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const passwordDublicate = ref('');
const username = ref('');
const firstName = ref('');
const secondName = ref('');
const patronymic = ref('');
const birthDate = ref('');
</script>

<template>
  <auth-layout>
    <div class="auth-signup">
      <div class="auth-signup__group-inline">
        <app-input v-model="username" class="auth-signup__input" placeholder="Имя пользователя">
          <template #label>
            Имя пользователя <app-text kind="error" inline>*</app-text>:
          </template>
        </app-input>

        <app-input v-model="email" class="auth-signup__input" placeholder="Электронная почта">
          <template #label>
            Адрес электронной почты <app-text kind="error" inline>*</app-text>:
          </template>
        </app-input>
      </div>
      
      <div class="auth-signup__group-inline">
        <app-input v-model="password" class="auth-signup__input" placeholder="Пароль" type="password">
          <template #label>
            Пароль <app-text kind="error" inline>*</app-text>:
          </template>
        </app-input>
        
        <app-input v-model="passwordDublicate" class="auth-signup__input" placeholder="Пароль" type="password">
          <template #label>
            Повторите пароль <app-text kind="error" inline>*</app-text>:
          </template>
        </app-input>
      </div>
      
      <app-input v-model="firstName" class="auth-signup__input" placeholder="Имя">
        <template #label>
          Имя <app-text kind="error" inline>*</app-text>:
        </template>
      </app-input>
      
      <app-input v-model="secondName" class="auth-signup__input" placeholder="Фамилия">
        <template #label>
          Фамилия <app-text kind="error" inline>*</app-text>:
        </template>
      </app-input>
      
      <app-input v-model="patronymic" class="auth-signup__input" placeholder="Отчество">
        <template #label>
          Отчество:
        </template>
      </app-input>
      
      <app-input v-model="birthDate" class="auth-signup__input" placeholder="Дата рождения">
        <template #label>
          Дата рождения <app-text kind="error" inline>*</app-text>:
        </template>
      </app-input>

      <app-text class="auth-signup__tooltip">
        <app-text kind="error" class="auth-signup__tooltip" inline>*</app-text> - поля обязательные для заполнения
      </app-text>

      <app-button>
        Зарегистрироваться
      </app-button>
    </div>
  </auth-layout>
</template>

<style lang="scss" scoped>
.auth-signup {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__group-inline {
    display: flex;
    gap: 1rem;
  }

  &__input {
    width: 100%;
  }

  &__tooltip {
    font-size: 1rem;
  }
}
</style>
