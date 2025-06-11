<script setup lang="ts">
const auth = useAuthStore();

const isLogin = ref(true);
const username = ref('johnd');
const password = ref('m38rmF$');

const body = computed(() => ({ username: username.value, password: password.value }));

const isLoading = ref(false);
const error = ref('');

const handleLogin = async () => {
  try {
    isLoading.value = true;
    error.value = '';
    await auth.login(body.value);
    navigateTo('/');
  } catch (err) {
    error.value = 'Неверный логин или пароль';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="mt-3.5 mb-3.5 flex justify-center align-middle">
    <div class="w-80 p-8 bg-sky-200 rounded-2xl text-center">
      <h1 class="mb-4 text-4xl font-bold text-sky-500">
        {{ isLogin ? 'Вход' : 'Регистрация' }}
      </h1>

      <SharedLoadingSpinner v-if="isLoading" />

      <div v-if="error" class="mb-4 text-red-500 font-bold">{{ error }}</div>

      <div action="" class="flex flex-col align-middle gap-2">
        <div class="flex flex-col gap-2 mb-3">
          <input type="text" placeholder="Имя пользователя" v-model="username" required />
          <input type="password" placeholder="Пароль" v-model="password" required />
        </div>
        <div>
          <button @click="handleLogin" class="global-button" v-if="isLogin">Войти</button>
          <button class="global-button" v-else>Регистрация</button>
        </div>
      </div>
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
</template>
