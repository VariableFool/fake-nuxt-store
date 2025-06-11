import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  const token = useCookie('auth_token', {
    maxAge: 60 * 60 * 24 * 7,
  });

  const isAuthenticated = computed(() => !!token.value);

  const login = async (credentials: { username: string; password: string }) => {
    try {
      const res = await $fetch<{ token: string }>('/auth/login', {
        method: 'POST',
        baseURL: 'https://fakestoreapi.com',
        body: JSON.stringify(credentials),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.token) throw new Error('Токен не получен');
      token.value = res.token;
      return true;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      console.error('Ошибка при входе:', error);
      throw error;
    }
  };

  const logout = () => {
    token.value = null;
    navigateTo('/login');
  };

  return { token, isAuthenticated, login, logout };
});
