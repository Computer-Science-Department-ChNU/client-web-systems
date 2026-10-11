<template>
  <main>
    <ul>
      <li v-for="link in links" :key="link.to">
        <RouterLink :to="link.to">{{ link.label }}</RouterLink>
      </li>
    </ul>
  </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

interface NavLink {
  to: string;
  label: string;
}

/*
const links: NavLink[] = [
  { to: '/options', label: 'Options Api' },
  { to: '/composition', label: 'Composition Api' },
  { to: '/computed', label: 'Computed' },
  { to: '/computed_options', label: 'Computed Options' },
  { to: '/props', label: 'Props' },
  { to: '/emit', label: 'Emit' },
  { to: '/emit-props', label: 'Emit+Props' },
  { to: '/watch', label: 'Watch' },
  { to: '/watch-effect', label: 'Watch Effect' },
  { to: '/modal', label: 'Modal' },
  { to: '/slot_base', label: 'Slot Base App List' },
  { to: '/slot_bad', label: 'Slot Simple Bad Realization' },
  { to: '/slot_dynamic_components', label: 'Slot Dynamic Components Realization' },
  { to: '/slot_good', label: 'Slot Good Realization' },
  { to: '/popup', label: 'Vue Popup with Slots' },
  { to: '/simple_routing', label: 'Vue simple routing example' },
  { to: '/pinia_store', label: 'Pinia Store example' },
  { to: '/pinia_cart', label: 'Pinia Cart example' },
  { to: '/fetch', label: 'Fetch gallery example' },
];
 */

/*
  Якщо маршрути вже описані в роутері,
  можна взяти список звідти і не дублювати його вручну.

  Для цього слід додати meta: { title: 'Some title' } до кожного route
  і побудувати меню з router.getRoutes().

  В такому випадку, додавання нової сторінки
  потребує змін лише в одному місці, у файлі роутера.
 */

const links = useRouter()
  .getRoutes()
  .filter((r) => r.meta.title)
  .map((r) => ({ to: r.path, label: r.meta.title as string }));
</script>
