import { create } from "zustand";
export const useAuth = create((set) => ({
  user: null,
  loading: true,
  likedArticles: [],

  setUser: (newUser: any) => {
    set({ user: newUser });
  },

  setLoading: (newLoading: boolean) => set({ loading: newLoading }),

  setLikedArticles: (newLikedArticles: []) =>
    set({ likedArticles: newLikedArticles }),

  addLikedArticle: (newLikedArticle: String) =>
    set((state: any) => ({
      likedArticles: [...state.likedArticles, newLikedArticle],
    })),

  removeLikedArticle: (newLikedArticle: String) =>
    set((state: any) => ({
      likedArticles: state.likedArticles.filter(
        (e: any) => newLikedArticle !== e
      ),
    })),
}));
