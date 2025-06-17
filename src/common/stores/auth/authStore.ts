import { saveUser, removeUser, getUser } from "@services/storage";
import { create } from "zustand";
import { AuthState } from "./authStore.model";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  login: ({ user }) => {
    saveUser(user);
    set({ user });
  },

  logout: () => {
    removeUser();
    set({ user: null });
  },

  loadUser: async () => {
    const user = await getUser();
    set({ user: user! });
  },
}));
