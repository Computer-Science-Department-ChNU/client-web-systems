<template>
  <div class="main-block">
    <button @click="showModal">Show Modal Window</button>
    <br><br><br>
    <label for="modalTitle">Title:</label>
    <input type="text" id="modalTitle" v-model="modalTitle">
    <br><br>
    <label for="modalMessage">Message:</label>
    <input type="text" id="modalMessage" v-model="modalMessage">
    <br><br>
    <Modal
      v-if="isModalOpen"
      :modal-title="modalTitle"
      :modal-message="modalMessage"
      @close="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Modal from '@/components/modal/Modal.vue';

const isModalOpen = ref(false);
const modalTitle = ref('');
const modalMessage = ref('');

function showModal() {
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
  modalTitle.value = '';
  modalMessage.value = '';
}
</script>
