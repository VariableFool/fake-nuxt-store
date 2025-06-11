<script setup lang="ts">
definePageMeta({
  middleware: 'auth-global',
  requiresAuth: false,
});
</script>

<template>
  <div class="text-center">
    <NuxtLink :to="'/'" class="global-button">Вернуться на главную</NuxtLink>
  </div>
  <LoginForm />
</template>
