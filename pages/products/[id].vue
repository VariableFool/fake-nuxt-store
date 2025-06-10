<script setup lang="ts">
import type { Product } from '~/types';
const route = useRoute();

const {
  data: product,
  pending,
  error,
} = await useAsyncData<Product>(`product-${route.params.id}`, () =>
  $fetch<Product>(`https://fakestoreapi.com/products/${route.params.id}`),
);

const goBack = () => {
  window.history.back();
};
</script>

<template>
  <div class="p-4 max-w-3xl mx-auto">
    <div v-if="pending" class="space-y-6">
      <div class="animate-pulse bg-gray-200 h-96 rounded"></div>
      <div class="h-8 bg-gray-200 w-3/4 rounded animate-pulse"></div>
      <div class="h-4 bg-gray-200 w-full rounded animate-pulse"></div>
      <div class="h-4 bg-gray-200 w-1/2 rounded animate-pulse mt-2"></div>
    </div>

    <div v-else-if="error" class="text-red-500 text-xl text-center mt-10">
      {{ error }}
    </div>

    <div
      v-else-if="!pending && !error && product"
      class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start"
    >
      <div class="p-2 border border-gray-200 rounded-2xl overflow-hidden shadow-md aspect-square">
        <img
          :src="product.image"
          :alt="product.title"
          loading="lazy"
          class="w-full h-full object-contain"
        />
      </div>

      <div class="flex flex-col justify-between h-full">
        <div>
          <h1 class="text-2xl font-bold mb-2">{{ product.title }}</h1>
          <p class="text-lg font-semibold text-gray-700 mb-4">Категория: {{ product.category }}</p>
          <p class="mb-4">{{ product.description }}</p>
        </div>

        <div class="mt-auto">
          <p class="text-xl font-bold mb-2">Цена: {{ product.price }} $</p>
        </div>
      </div>
    </div>
    <button
      @click="goBack"
      class="cursor-pointer w-28 mt-4 ml-auto p-2 text-white bg-sky-400 border-0 rounded-2xl transition hover:bg-sky-500"
    >
      Назад
    </button>
  </div>
</template>
