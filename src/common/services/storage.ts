import { StorageKeys } from "@utils/storageKeys";
import { MMKV } from "react-native-mmkv";
import { IUser } from "@stores/auth/authStore.model";
import * as SecureStore from "expo-secure-store";

const storageMMKV = new MMKV();

export const saveUser = async (user: IUser) => {
  try {
    await SecureStore.setItemAsync(StorageKeys.USER, JSON.stringify(user));
  } catch (error) {
    console.error("[SecureStore] Falha ao salvar usuário", error);
  }
};

export async function getUser(): Promise<IUser | null> {
  try {
    const storedData = await SecureStore.getItemAsync(StorageKeys.USER);
    if (storedData) return JSON.parse(storedData);
    return null;
  } catch (error) {
    console.error("[SecureStore] Falha ao carregar usuário.", error);
    return null;
  }
}

export async function removeUser() {
  try {
    await SecureStore.deleteItemAsync(StorageKeys.USER);
  } catch (error) {
    console.error("[SecureStore] Falha ao remover usuário.", error);
  }
}

export const setOnboardingAccess = () =>
  storageMMKV.set(StorageKeys.ONBOARDING_ACCESS, true);

export const getOnboardingAccess = () =>
  storageMMKV.getBoolean(StorageKeys.ONBOARDING_ACCESS);
