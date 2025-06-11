<script setup lang="ts">
import type { Product } from '~/types';

defineProps<{
  product: Product;
}>();
</script>

<template>
  <NuxtLink :to="`/products/${product.id}`">
    <div
      class="cursor-pointer w-72 max-[450px]:w-40 p-5 rounded-2xl border border-gray-200 transition flex flex-col hover:-translate-y-2 hover:shadow-2xl h-full"
    >
      <div class="relative flex justify-center">
        <img
          :src="product.image || '/placeholder.jpg'"
          :alt="product.title"
          loading="lazy"
          class="h-60 object-contain max-[450px]:h-32 max-[768px]:h-32"
        />
      </div>
      <div class="flex flex-col pt-3 justify-between h-full">
        <h3 class="font-medium text-sm line-clamp-3 mb-2 max-[450px]:text-[16px]">
          {{ product.title }}
        </h3>
        <p class="text-lg font-bold mt-auto ml-auto">
          <span class="max-[450px]:hidden">Цена:</span> {{ product.price }} $
        </p>
      </div>
    </div>
  </NuxtLink>
</template>
