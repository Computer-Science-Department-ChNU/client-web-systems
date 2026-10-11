import { defineStore } from 'pinia';
import type { Product } from '@/types/product';

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [] as Product[],
    loading: true,
    error: null as string | null,
  }),
  actions: {
    async fetchProducts() {
      const limit = 10;
      this.loading = true;
      this.error = null;

      try {
        const response = await fetch(`https://dummyjson.com/products?limit=${limit}`);

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = (await response.json()) as ProductsResponse;
        this.products = data.products;
      } catch (e) {
        this.error = e instanceof Error ? e.message : 'Unknown error';
        console.error(e);
      } finally {
        this.loading = false;
      }
    },
    addProduct(product: Product) {
      this.products.push(product);
    },
    removeProduct(productId: number) {
      this.products = this.products.filter((product) => product.id !== productId);
    },
    sortProducts() {
      this.products = [...this.products].sort((a, b) => a.price - b.price);
    },
  },
});
