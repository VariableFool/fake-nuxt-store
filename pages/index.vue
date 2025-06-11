<script setup lang="ts">
const productStore = useProductStore();
const { products, pending, error } = storeToRefs(productStore);

const auth = useAuthStore();

async function refreshCatalog() {
  await productStore.fetchProducts();
}

const route = useRoute();

const backRoute = computed(() => {
  return route.path === '/' ? '/login' : '/';
});

const categories = ["men's clothing", 'jewelery', 'electronics', "women's clothing"];

const selectedCategory = ref('Все категории');

const targetItem = ref('');

const filteredProducts = computed(() => {
  if (targetItem.value) {
    return products.value?.filter((p) =>
      p.title.toLowerCase().includes(targetItem.value.toLowerCase()),
    );
  } else if (selectedCategory.value !== 'Все категории') {
    return products.value?.filter((p) => p.category === selectedCategory.value);
  }
  return products.value;
});

onMounted(() => {
  if (products.value === null || products.value.length <= 1) {
    productStore.fetchProducts();
  }
});
</script>

<template>
  <div>
    <div
      class="flex flex-wrap justify-end items-center gap-4 max-[450px]:justify-center max-[450px]:mb-5"
    >
      <div>
        <select
          v-model="selectedCategory"
          id="category"
          class="w-full border border-sky-400 rounded-md p-2 focus:outline-none focus:ring focus:ring-sky-500"
          placeholder="Выберите категорию"
        >
          <option :value="'Все категории'" selected>Все категории</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>

      <div>
        <input
          type="text"
          class="search-input text-sky-600"
          placeholder="🔍 Поиск..."
          v-model="targetItem"
        />
      </div>

      <div class="flex gap-4">
        <NuxtLink
          :to="backRoute"
          class="global-button flex items-center"
          v-if="!auth.isAuthenticated"
          >Войти в аккаунт</NuxtLink
        >
        <button @click="auth.logout" class="global-button" v-else>Выйти</button>
        <button @click="refreshCatalog" :disabled="pending" class="global-button">
          {{ pending ? 'Обновление...' : 'Обновить' }}
        </button>
      </div>
    </div>

    <h1 class="text-2xl font-bold text-sky-400 max-[450px]:text-center">Список товаров:</h1>

    <div v-if="pending" class="mt-4 flex flex-wrap justify-center gap-5">
      <div
        v-for="n in 8"
        :key="n"
        class="w-72 p-5 rounded-2xl animate-pulse bg-gray-400 h-96"
      ></div>
    </div>

    <div v-else-if="error" class="text-red-500 text-lg text-center">{{ error }}</div>

    <div v-else class="mt-4 mb-4 flex flex-wrap justify-center gap-5">
      <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
    </div>
  </div>
</template>
