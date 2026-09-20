import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      /* Статичний import, HomeView.vue імпортується одразу під час завантаження JavaScript-модуля роутера.
      1 - Завантаження app.js
      2 - завантажується HomeView.vue
      3 - створюється router
      4 - користувач переходить на /
      Тобто HomeView потрапляє в основний JS bundle (якщо bundler не вирішить інакше).
       */
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      /*
      Асинхронне завантаження компоненту.
      AboutView.vue не завантажується одразу. Спочатку Vue Router отримує функцію:
      А коли користувач переходить /about:
      1 - Router викликає import()
      2 - завантажується About.[hash].js
      3 - AboutView монтується
      Це називається lazy loading / route-level code splitting.

      Асинхронне завантаження доцільно використовувати
      для другорядних або рідко використовуваних компонентів,
      щоб оптимізувати продуктивність застосунку.
      Приклад коли є 20 сторінок.
       */
    },
  ],
})

export default router
