<template>
  <ShopHeader/>
  <ShopLayout>
    <RouterView/>
    <!--
      Компонент RouterView вказує Vue Router, де відображати компонент поточного маршруту.
      Це компонент, який відповідає поточному URL-шляху.
      Він не обов’язково має бути в файлі App.vue — його можна розмістити де завгодно,
      щоб адаптувати до вашого макету, але його обов’язково потрібно десь включити,
      інакше Vue Router нічого не відображатиме.
    -->
  </ShopLayout>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import ShopHeader from '@/components/Shop/ShopHeader.vue';
import ShopLayout from '@/components/Shop/ShopLayout.vue';
</script>
