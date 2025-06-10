export const fetchProducts = async () => {
  return await $fetch('https://fakestoreapi.com/products');
};

export const login = async (credentials: any) => {
  return await $fetch('https://fakestoreapi.com/auth/login', {
    method: 'POST',
    body: credentials,
  });
};
