<template>
  <div v-if="isOpen" class="backdrop" @click="close">
    <div class="popup" @click.stop>
      <h1></h1>
      <hr/>
      <slot></slot>
      <hr/>
      <div class="footer">
        <!-- іменований слот actions для кастомних кнопок -->
        <!-- у слот передаються функції close і confirm, щоб батьківський компонент міг їх використовувати -->
        <!-- якщо користувач не передасть власних кнопок, використовуються кнопки за замовчуванням -->
        <slot name="actions" :close="close" :confirm="confirm">
          <button @click="close">Cancel</button>
          <button @click="confirm">Ok</button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps<{
  isOpen: boolean;
}>();

// оголошення emitted events
const emit = defineEmits<{
  (e: 'ok'): void;
  (e: 'close'): void;
}>();

// функції close() та confirm()
const close = () => {
  emit('close');
};

const confirm = () => {
  emit('ok');
};

const handleKeydown = (e: KeyboardEvent) => {
  if (props.isOpen && e.key === 'Escape') {
    close();
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
});

// щоб уникнути накопичення обробників подій в пам'яті
onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown);
});
</script>


<style>
.popup {
  top: 50px;
  padding: 20px;
  left: 50%;
  transform: translateX(-50%);
  position: fixed;
  z-index: 101;
  background-color: white;
  border-radius: 10px;
}

.popup h1 {
  text-align: center;
  margin: 0;
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 100;
}

.footer {
  text-align: right;
}
</style>
