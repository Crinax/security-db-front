import './app/assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import MainLayout from './shared/layouts/MainLayout.vue'
import router from './app/router'

const app = createApp(MainLayout)

app.use(createPinia())
app.use(router)

app.mount('#app')
