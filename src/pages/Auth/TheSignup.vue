<script lang="ts" setup>
import AuthLayout from '@layouts/AuthLayout.vue';
import AppInput from '@uikit/AppInput.vue';
import AppText from '@uikit/AppText.vue';
import AppButton from '@uikit/AppButton.vue';
import { computed, ref, watch } from 'vue';
import { api } from '@/shared/api';
import { useAppStateStore } from '@/app/stores/app-state';
import moment from 'moment';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

const INVALID_DATE = 'Введена некорректная дата рождения!';
const PASSWORDS_NOT_EQUALS = 'Пароли не совпдают!';

const appStateStore = useAppStateStore();
const route = useRoute();
const router = useRouter();

const email = ref('');
const password = ref('');
const passwordDublicate = ref('');
const username = ref('');
const firstName = ref('');
const secondName = ref('');
const patronymic = ref('');
const birthDate = ref('');
const error = ref('');

const isPasswordsEquals = computed(() => password.value === passwordDublicate.value);
const isDateValid = computed(() => moment(birthDate.value, 'YYYY-MM-DD').isValid());
const hasError = computed(() => error.value.length !== 0);

const checkFormAndSend = async () => {
  error.value = '';
  if (!isDateValid.value) {
    error.value = INVALID_DATE;
    return;
  }

  if (!isPasswordsEquals.value) {
    error.value = PASSWORDS_NOT_EQUALS;
    return;
  }

  const result = await appStateStore.runAsync(() => 
      api.authModule().registration({
        email: email.value,
        password: password.value,
        username: username.value,
        first_name: firstName.value,
        second_name: secondName.value,
        patronymic: patronymic.value.length === 0 ? undefined : patronymic.value,
        birth_date: birthDate.value,
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
    <div class="auth-signup">
      <app-text v-if="hasError" kind="error" class="text-error">
        {{ error }}
      </app-text>

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

      <app-input v-model.date="birthDate" class="auth-signup__input" placeholder="Дата рождения в формате YYYY-MM-DD">
        <template #label>
          Дата рождения <app-text kind="error" inline>*</app-text>:
        </template>
      </app-input>

      <app-text class="auth-signup__tooltip">
        <app-text kind="error" class="auth-signup__tooltip" inline>*</app-text> - поля обязательные для заполнения
      </app-text>

      <app-button @click="checkFormAndSend">
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

.text-error {
  font-size: 1rem;
}
</style>
