<script setup lang="ts">
import type { Product } from '~/types';

defineProps<{
  product: Product;
}>();
</script>

<template>
  <div
    class="cursor-pointer w-72 p-5 rounded-2xl border border-gray-200 transition flex flex-col hover:-translate-y-2 hover:shadow-2xl"
  >
    <div class="relative flex justify-center">
      <img
        :src="product.image || '/placeholder.jpg'"
        :alt="product.title"
        loading="lazy"
        class="h-60 object-contain"
      />
    </div>
    <div class="flex flex-col pt-3 justify-between h-full">
      <h3 class="font-medium text-sm line-clamp-3 mb-2">{{ product.title }}</h3>
      <p class="text-lg font-bold mt-auto ml-auto">Цена: {{ product.price }} $</p>
    </div>
  </div>
</template>
