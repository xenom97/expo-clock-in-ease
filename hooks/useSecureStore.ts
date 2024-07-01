import * as SecureStore from 'expo-secure-store';

export function useSecureStore() {
  return {
    async setItem(key: string, value: string) {
      return await SecureStore.setItemAsync(key, value);
    },
    async getItem(key: string) {
      return await SecureStore.getItemAsync(key);
    },
  };
}