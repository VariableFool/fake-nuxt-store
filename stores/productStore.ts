import type { Product, Products } from '~/types';

export const useProductStore = defineStore('products', () => {
  const API_URL = 'https://fakestoreapi.com/products/';
  const NO_PRODUCT = 'Такого товара не существует';
  const UNKNOWN_ERROR = 'Неизвестная ошибка';

  const product = ref<Product | undefined>(undefined);

  const {
    data: products,
    pending,
    error,
    execute,
  } = useFetch<Products>('https://fakestoreapi.com/products', {
    method: 'GET',
    immediate: false,
    watch: false,
  });

  const fetchProducts = async () => {
    await execute();
  };

  const fetchSingleProduct = async (id: number) => {
    product.value = products.value?.find((p) => p.id === id);
    if (product.value !== undefined) return;
    try {
      const res = (await $fetch<Product>(API_URL + id)) as Product;
      if (res.id) {
        products.value = [];
        products.value?.push(res);
      } else throw new Error(NO_PRODUCT);
    } catch (e) {
      if (e instanceof Error) {
        error.value = e;
      } else {
        error.value = new Error(UNKNOWN_ERROR);
      }
      console.error(e);
    } finally {
      pending.value = false;
    }
  };

  return {
    products,
    pending,
    error,
    fetchProducts,
    fetchSingleProduct,
    computed,
  };
});
