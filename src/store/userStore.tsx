import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  lastName: string;
  firstName: string;
  phone: string;
  email: string;
  verify?: boolean;
  emailVerified?: boolean;
  newEmail?: string;
  hasPassword?: boolean;
  authMethod: "email" | "phone";
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => {
        document.cookie = "access_token=; path=/; max-age=0; samesite=strict";
        localStorage.removeItem("token");
        set({ user: null });
      },
    }),
    {
      name: "user-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
