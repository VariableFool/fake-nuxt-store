<script setup lang="ts">
definePageMeta({
  middleware: 'auth-global',
  requiresAuth: true,
});

const goBack = () => {
  window.history.back();
};

const route = useRoute();

const id = computed(() => route.params.id);

const productStore = useProductStore();
const { products, pending, error } = storeToRefs(productStore);

const product = computed(() => {
  return products.value?.find((p) => p.id === Number(id.value));
});

onMounted(() => {
  if (product.value === undefined) {
    productStore.fetchSingleProduct(Number(id.value));
  }
});
</script>

<template>
  <div class="p-4 max-w-3xl mx-auto">
    <div v-if="pending" class="space-y-6">
      <div class="animate-pulse bg-gray-400 h-96 rounded-2xl"></div>
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
          :placeholder="`https://placehold.co/300x400?text=No\nImage`"
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
    <div class="flex gap-2.5 justify-end">
      <button
        @click="goBack"
        class="cursor-pointer w-28 mt-4 p-1 text-white bg-sky-400 border-0 rounded-2xl transition hover:bg-sky-500"
      >
        Назад
      </button>
      <button
        @click="navigateTo('/')"
        class="cursor-pointer w-28 mt-4 p-1 text-white bg-sky-400 border-0 rounded-2xl transition hover:bg-sky-500"
      >
        На главную
      </button>
    </div>
  </div>
</template>
