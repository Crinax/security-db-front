import './app/assets/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import MainLayout from './shared/layouts/MainLayout.vue';
import router from './app/router';

import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { OiArrowRight } from 'oh-vue-icons/icons';

addIcons(
  OiArrowRight
);

const app = createApp(MainLayout);

app.use(createPinia());
app.use(router);
app.component('v-icon', OhVueIcon);

app.mount('#app');
