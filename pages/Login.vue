<script setup lang="ts">
const isLogin = ref(true);
</script>

<template>
  <div class="h-[350px] mt-3.5 mb-3.5 flex justify-center align-middle">
    <div class="w-80 p-8 bg-sky-200 rounded-2xl text-center">
      <h1 class="mb-4 text-4xl font-bold text-sky-500">
        {{ isLogin ? 'Вход' : 'Регистрация' }}
      </h1>
      <form action="" class="flex flex-col align-middle gap-2">
        <div class="flex flex-col gap-2 mb-3">
          <input type="text" placeholder="Логин" />
          <input type="password" placeholder="Пароль" />
        </div>
        <div>
          <button class="global-button" v-if="isLogin">Войти</button>
          <button class="global-button" v-else>Регистрация</button>
        </div>
      </form>
      <hr class="ml-6 mr-6 mt-4 mb-4 border-0 h-0.5 bg-sky-300" />
      <span
        class="cursor-pointer text-sky-800 hover:text-sky-500"
        @click="
          {
            isLogin ? (isLogin = false) : (isLogin = true);
          }
        "
      >
        Нет аккаунта? Зарегестрируйтесь
      </span>
    </div>
  </div>
  <div class="text-center">
    <NuxtLink :to="'/'" class="global-button">Вернуться на главную</NuxtLink>
  </div>
</template>
