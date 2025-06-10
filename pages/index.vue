<script setup lang="ts">
import type { Products } from '~/types';

const {
  data: products,
  pending,
  error,
} = await useFetch<Products>('https://fakestoreapi.com/products');
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold">Список товаров:</h1>

    <div v-if="pending" class="mt-4 flex flex-wrap justify-center gap-5">
      <div
        v-for="n in 8"
        :key="n"
        class="w-72 p-5 rounded-2xl animate-pulse bg-gray-300 h-96"
      ></div>
    </div>

    <div v-else-if="error" class="text-red-500 text-lg text-center">{{ error }}</div>

    <div v-else class="mt-4 mb-4 flex flex-wrap justify-center gap-5">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
</template>
