<script setup lang="ts">
const productStore = useProductStore();
const { products, pending, error } = storeToRefs(productStore);

async function refreshCatalog() {
  await productStore.fetchProducts();
}

onMounted(() => {
  if (products.value === null || products.value.length <= 1) {
    productStore.fetchProducts();
  }
});
</script>

<template>
  <div>
    <div class="flex justify-between">
      <h1 class="text-2xl font-bold">Список товаров:</h1>
      <button
        @click="refreshCatalog"
        class="cursor-pointer p-1 bg-sky-400 text-white rounded-[7px] transition hover:bg-sky-500"
      >
        Обновить
      </button>
    </div>

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
