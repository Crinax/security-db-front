import './app/assets/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import MainLayout from './shared/layouts/MainLayout.vue';
import router from './app/router';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css'

import { OhVueIcon, addIcons } from 'oh-vue-icons';
import {
  OiArrowRight,
  OiPersonFill,
  OiPerson,
  OiBeaker,
  OiSignOut,
  OiTrash,
  OiPencil,
} from 'oh-vue-icons/icons';

addIcons(
  OiArrowRight,
  OiBeaker,
  OiPersonFill,
  OiPerson,
  OiSignOut,
  OiTrash,
  OiPencil,
);

const app = createApp(MainLayout);

app.use(createPinia());
app.use(router);
app.component('v-icon', OhVueIcon);

app.mount('#app');
