// store/userStore.ts
import { create } from "zustand";

interface UserState {
  isRegistered: boolean;
  user: {
    name: string;
    phone: string;
    address: string;
  } | null;
  registerUser: (userData: { name: string; phone: string; address: string }) => void;
  logoutUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  isRegistered: false,
  user: null,
  registerUser: (userData) =>
    set({
      isRegistered: true,
      user: userData,
    }),
  logoutUser: () =>
    set({
      isRegistered: false,
      user: null,
    }),
}));