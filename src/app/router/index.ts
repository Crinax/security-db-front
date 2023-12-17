import { createRouter, createWebHistory } from 'vue-router'
import { api } from '@shared/api';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        needAuth: true,
      },
      component: () => import('@/pages/Home/HomeView.vue')
    },
    {
      path: '/components',
      name: 'components',
      meta: {
        title: 'Компоненты',
        needAuth: true,
        showInNavigation: import.meta.env.DEV,
        routeTitle: 'Компоненты',
        routeIcon: 'oi-beaker',
        order: 1,
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
    {
      path: '/laws',
      name: 'laws',
      meta: {
        title: 'Адвокаты',
        needAuth: true,
        showInNavigation: true,
        routeTitle: 'Адвокаты',
        routeIcon: 'oi-person-fill',
        order: 2,
      },
      component: () => import('@/pages/Laws/LawsView.vue')
    },
    {
      path: '/404',
      name: '404',
      meta: {
        title: 'Страница не найдена!',
      },
      component: () => import('@/pages/Error/AppNotFound.vue')
    }
  ]
})

router.beforeEach((to) => {
  if (to.meta.title) {
    document.title = `Адвокат K12 | ${to.meta.title}`
  } else {
    document.title = 'Адвокат K12'
  }
})

router.beforeEach(async (to) => {
  const authRoutes = ['login', 'signup'];

  if (!to.name) {
    return { path: '/404' };
  }

  const isAuthRoute = authRoutes.includes(to.name.toString());

  if (!to.meta.needAuth && !isAuthRoute) {
    return;
  }

  let isLogged = api.authModule().isLogged();

  if (!isLogged) {
    await api.authModule().refresh();
    isLogged = api.authModule().isLogged();
  }

  if (to.meta.needAuth && isLogged) {
    return;
  }

  if (isAuthRoute && isLogged) {
    if (to.query.next) {
      return { path: to.query.next.toString() };
    }

    return { path: '/' };
  }

  if (to.meta.needAuth && !isLogged) {
    return { path: '/auth/login', query: { next: to.path } };
  }
});

export default router
