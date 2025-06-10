import type { Products } from '~/types';

export const useProductStore = defineStore('products', () => {
  const productsInStore = ref<Products | null>(null);

  async function fetchAndSaveProducts() {
    const res = await $fetch('https://fakestoreapi.com/products');
  }
});
