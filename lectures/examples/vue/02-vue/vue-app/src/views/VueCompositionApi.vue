<template>
  <h3>My To Do List</h3>
  <div>
    <input v-model="newItemText" @keyup.enter="addNewTodo"/>
    <button @click="addNewTodo">Add</button>
    <button @click="removeTodo">Remove</button>
    <button @click="removeAllTodos">Remove All</button>
    <TransitionGroup name="list" tag="ul">
      <li v-for="task in tasks" :key="task">{{ task }}</li>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// import useCounter from './composables/useCounter'

const tasks = ref<string[]>([
  'Write my posts',
  'Go for a walk',
  'Meet my friends',
  'Buy fruit',
]);
const newItemText = ref('');

// const { count, increment, decrement, set, reset } = useCounter()
// onMounted(() => set(tasks.value.length))

function addNewTodo() {
  const text = newItemText.value.trim();
  if (text !== '') {
    tasks.value.unshift(text);
  }
  newItemText.value = '';
  // increment()
}

function removeTodo() {
  tasks.value.pop();
  // decrement()
}

function removeAllTodos() {
  tasks.value = [];
  // reset()
}
</script>
