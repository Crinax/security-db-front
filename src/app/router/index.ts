import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/Home/HomeView.vue')
    },
    {
      path: '/components',
      name: 'components',
      meta: {
        title: 'Компоненты'
      },
      component: () => import('@/pages/Components/ComponentView.vue'),
      beforeEnter: () => import.meta.env.DEV
    },
    {
      path: '/auth/login',
      name: 'login',
      meta: {
        title: 'Вход'
      },
      component: () => import('@/pages/Auth/TheLogin.vue')
    },
    {
      path: '/auth/signup',
      name: 'signup',
      meta: {
        title: 'Регистрация'
      },
      component: () => import('@/pages/Auth/TheSignup.vue')
    },
  ]
})

router.beforeEach((to) => {
  if (to.meta.title) {
    document.title = `Адвокат K12 | ${to.meta.title}`
  } else {
    document.title = 'Адвокат K12'
  }
})

export default router
