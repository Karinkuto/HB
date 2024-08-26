import create from 'zustand';
import { persist } from 'zustand/middleware';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface FavoriteState {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
}

const useFavoriteStore = create(
  persist<FavoriteState>(
    (set, get) => ({
      favorites: [],
      addToFavorites: (product) => set((state) => ({
        favorites: [...state.favorites, product],
      })),
      removeFromFavorites: (productId) => set((state) => ({
        favorites: state.favorites.filter((item) => item.id !== productId),
      })),
      isFavorite: (productId) => get().favorites.some((item) => item.id === productId),
    }),
    {
      name: 'favorite-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useFavoriteStore;