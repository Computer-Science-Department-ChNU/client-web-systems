<template>
  <button @click="openPopup">Open popup</button>
  <!-- виклик компонента Popup і слухаємо події -->
  <Popup
      :is-open="isPopupOpen"
      @ok="popupConfirmed"
      @close="isPopupOpen = false"
  >
    <!-- Це попадає у <slot></slot> всередині компонента Popup -->
    You really want to learn the right approaches to system design in Vue?

    <!-- кастомні елементи для слоту actions -->
    <!-- #actions="{ confirm }" - отримує з Popup функцію confirm, яку Popup прокинув у слот -->
   
  </Popup>
</template>

<script lang="ts" setup>
import {ref, computed} from 'vue';
import Popup from '@/components/PopupWithSlot/Popup.vue';

const CONFIRMATION_TEXT = 'Ok';

const isPopupOpen = ref(false);
const confirmation = ref('');

const isConfirmationCorrect = computed(() => confirmation.value === CONFIRMATION_TEXT);

const openPopup = () => {
  confirmation.value = '';
  isPopupOpen.value = true;
};

const popupConfirmed = () => {
  alert('Confirmed!');
  isPopupOpen.value = false;
};

/*
Навіщо такий підхід?
- Popup максимально універсальний - не прив’язаний до конкретних кнопок.
- кастомні дії та контент передаються через слоти.
- Popup "не знає", що робиться у батьківському компоненті - лише викидає події
- це дозволяє створювати дуже різні попапи, використовуючи один і той самий компонент
 */
</script>
