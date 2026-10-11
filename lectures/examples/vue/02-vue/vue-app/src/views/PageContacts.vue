<template>
  <div>
    <h1>Contact Us</h1>
    <p>If you have any questions, comments, or concerns, please feel free to reach out to us!</p>
    <div v-if="loading">
      <p>Loading contact information...</p>
    </div>
    <p v-else-if="error">{{ error }}</p>
    <div v-else-if="contactInfo">
      <p><strong>Email:</strong> {{ contactInfo?.email }} </p>
      <p><strong>Phone:</strong> {{ contactInfo?.phone }}</p>
      <p><strong>City:</strong> {{ contactInfo?.address?.city }}</p>
      <p><strong>Street:</strong> {{ contactInfo?.address?.street }}, {{
          contactInfo?.address?.suite
        }}</p>
      <p><strong>Zip:</strong> {{ contactInfo?.address?.zipcode }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface ContactInfo {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

const loading = ref(true);
const error = ref<string | null>(null);
const contactInfo = ref<ContactInfo | null>(null);

onMounted(async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    contactInfo.value = (await response.json()) as ContactInfo;
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Unknown error';
    console.error(e);
  } finally {
    loading.value = false;
  }
});
</script>
