export const useAuthStore = defineStore('auth', () => {
  const token = ref(useCookie('token').value);

  const login = async (credentials: any) => {
    const { data, status, error, refresh, clear } = await useFetch('/api/modules', {
      pick: ['title'],
    });
    token.value = res.token;
    useCookie('token').value = token.value;
    return res;
  };

  const logout = () => {
    token.value = null;
    useCookie('token').value = null;
  };

  return { token, login, logout };
});
