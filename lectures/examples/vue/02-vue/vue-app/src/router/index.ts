import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Main from '../views/PageMain.vue';
import ProductList from '../views/PageProductList.vue';
import Product from '../views/PageProduct.vue';
import Contact from '../views/PageContacts.vue';

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
      path: '/',
      name: Main,
      component: Main,
    },
    {
      path: '/products',
      name: ProductList,
      component: ProductList,
    },
    {
      path: '/products/:id',
      name: Product,
      component: Product,
      props: true,
    },
    {
      path: '/contact',
      name: Contact,
      component: Contact,
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
    {
      path: '/old-path',
      redirect: '/new-path',
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue'),
    },
    {
      path: '/options',
      name: 'options',
      component: () => import('../views/VueOptionsApi.vue'),
    },
    {
      path: '/composition',
      name: 'composition',
      component: () => import('../views/VueCompositionApi.vue'),
    },
    {
      path: '/computed',
      name: 'computed',
      component: () => import('../views/VueComputed.vue'),
    },
    {
      path: '/computed_options',
      name: 'computedOptions',
      component: () => import('../views/VueComputedOptions.vue'),
    },
    {
      path: '/props',
      name: 'props',
      component: () => import('../views/VueProps.vue'),
    },
    {
      path: '/emit',
      name: 'emit',
      component: () => import('../views/VueEmit.vue'),
    },
    {
      path: '/emit-props',
      name: 'emitProps',
      component: () => import('../views/VueEmitProps.vue'),
    },
    {
      path: '/watch',
      name: 'watch',
      component: () => import('../views/VueWatch.vue'),
    },
    {
      path: '/watch-effect',
      name: 'watchEffect',
      component: () => import('../views/VueWatchEffect.vue'),
    },
    {
      path: '/modal',
      name: 'modal',
      component: () => import('../views/VueModal.vue'),
    },
    {
      path: '/slot_base',
      name: 'slot_base',
      component: () => import('../views/VueSlotBase.vue'),
    },
    {
      path: '/slot_bad',
      name: 'slot_bad',
      component: () => import('../views/VueSlotBad.vue'),
    },
    {
      path: '/slot_dynamic_components',
      name: 'slot_dynamic_components',
      component: () => import('../views/VueSlotDynamicComponents.vue'),
    },
    {
      path: '/slot_good',
      name: 'slot_good',
      component: () => import('../views/VueSlotGood.vue'),
    },
    {
      path: '/popup',
      name: 'popup',
      component: () => import('../views/VuePopup.vue'),
    },
    {
      path: '/simple_routing',
      name: 'simple_routing',
      component: () => import('../views/VueSimpleRouting.vue'),
    },
    {
      path: '/pinia_store',
      name: 'pinia_store',
      component: () => import('../views/VuePiniaStore.vue'),
    },
    {
      path: '/pinia_cart',
      name: 'pinia_cart',
      component: () => import('../views/VuePiniaCart.vue'),
    },
    {
      path: '/fetch',
      name: 'fetch',
      component: () => import('../views/VueFetchExample.vue'),
    },
  ],
});

export default router;
