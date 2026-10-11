<template>
  <div>
    <div v-if="loading">
      <p>Loading product information...</p>
    </div>
    <div v-else-if="error">
      <p>{{ error }}</p>
    </div>
    <div v-else-if="product">
      <h1>{{ product.title }}</h1>
      <p>{{ product.description }}</p>
      <p>Price: {{ product.price }}$</p>
      <p>Rate: {{ product.rating.rate }}/5</p>
      <img class="product-image" :src="product.image" :alt="`image-${id}`">
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

interface Props {
  id: string;
}

const props = defineProps<Props>();

interface Rating {
  rate: number;
  count: number;
}

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

const product = ref<Product | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

watch(
  () => props.id,
  async (id, _oldId, onCleanup) => {
    const controller = new AbortController();
    onCleanup(() => controller.abort());

    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      product.value = (await response.json()) as Product;
      loading.value = false;
    } catch (e) {
      if (e instanceof DOMException && e.name === 'AbortError') return;
      error.value = e instanceof Error ? e.message : 'Unknown error';
      console.error('Error fetching product:', e);
      loading.value = false;
    }
  },
  { immediate: true },
);
</script>

<style lang="scss">
.product-image {
  width: 400px;
}
</style>
