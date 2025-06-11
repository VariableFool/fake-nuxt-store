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

const route = useRoute();

const backRoute = computed(() => {
  return route.path === '/' ? '/login' : '/';
});
</script>

<template>
  <div>
    <div class="flex justify-between">
      <h1 class="text-2xl font-bold text-sky-400">Список товаров:</h1>
      <div class="flex gap-4">
        <NuxtLink :to="backRoute" class="global-button">Войти в аккаунт</NuxtLink>
        <button @click="refreshCatalog" :disabled="pending" class="global-button">
          {{ pending ? 'Обновление...' : 'Обновить' }}
        </button>
      </div>
    </div>

    <div v-if="pending" class="mt-4 flex flex-wrap justify-center gap-5">
      <div
        v-for="n in 8"
        :key="n"
        class="w-72 p-5 rounded-2xl animate-pulse bg-gray-400 h-96"
      ></div>
    </div>

    <div v-else-if="error" class="text-red-500 text-lg text-center">{{ error }}</div>

    <div v-else class="mt-4 mb-4 flex flex-wrap justify-center gap-5">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
</template>
