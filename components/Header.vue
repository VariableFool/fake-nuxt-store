<template>
  <div
    class="mb-4 pt-8 pb-8 bg-sky-200 rounded-b-2xl text-center text-5xl font-[Gravitas_One] italic text-slate-900"
  >
    <span
      class="before:block before:absolute before:-inset-1 before:-skew-y-5 before:bg-sky-400 relative inline-block"
    >
      <span class="relative text-white">Fake</span>
    </span>
    store
  </div>
  <div class="mb-1 flex justify-center">
    <NuxtLink :to="backRoute" class="pt-1 pb-1 pl-2 pr-2 rounded-[7px] bg-green-300">{{
      $route.path === '/' ? 'Войти в аккаунт' : 'Вернуться на главную'
    }}</NuxtLink>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const backRoute = computed(() => {
  return route.path === '/' ? '/login' : '/';
});
</script>
