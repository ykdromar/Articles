import { create } from "zustand";
export const useAuth = create((set) => ({
  user: null,
  loading: true,
  setUser: (newUser: any) => {
    set({ user: newUser });
  },
  setLoading: (newLoading: boolean) => set({ loading: newLoading }),
}));
