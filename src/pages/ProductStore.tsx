import create from 'zustand';
import { persist } from 'zustand/middleware';
import { mockProducts } from "../mockProducts";

interface Product {
  id: number;
  name: string;
  description: string;
  status: string;
  price: number;
  stock: number;
  category: string;
  subcategory: string;
  size: string;
  color: string;
  brand: string;
  variants: { sku: string; stock: number; price: number; size: string; color: string }[];
  image: string;
}

interface User {
  id: number;
  username: string;
  password: string;
  phoneNumber: string;
  isAdmin: boolean;
}

interface Review {
  id: number;
  productId: number;
  userId: number;
  username: string;
  rating: number;
  comment: string;
  date: string;
  adminReply: string | null;
}

interface ProductState {
  products: Product[];
  filter: string;
  sortBy: string;
  searchTerm: string;
  setProducts: (products: Product[]) => void;
  setFilter: (filter: string) => void;
  setSortBy: (sortBy: string) => void;
  setSearchTerm: (searchTerm: string) => void;
  addProduct: (product: Product) => void;
  isLoggedIn: boolean;
  setLoginStatus: (status: boolean) => void;
  users: User[];
  currentUser: User | null;
  addUser: (user: User) => void;
  setCurrentUser: (user: User | null) => void;
  reviews: Review[];
  addReview: (review: Review) => void;
  addAdminReply: (reviewId: number, reply: string) => void;
  clearInvalidReviews: () => void;
}

const getCurrentUser = () => {
  const userString = localStorage.getItem('currentUser');
  return userString ? JSON.parse(userString) : null;
};

const useProductStore = create(
  persist<ProductState>(
    (set, get) => ({
      products: mockProducts,
      filter: 'all',
      sortBy: 'name',
      searchTerm: '',
      isLoggedIn: false,
      users: [],
      currentUser: null,
      reviews: [],
      setProducts: (products) => set({ products }),
      setFilter: (filter) => set({ filter }),
      setSortBy: (sortBy) => set({ sortBy }),
      setSearchTerm: (searchTerm) => set({ searchTerm }),
      addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
      setLoginStatus: (status) => set({ isLoggedIn: status }),
      addUser: (user) => set((state) => ({ users: [...state.users, user] })),
      setCurrentUser: (user) => set({ currentUser: user }),
      addReview: (review) => set((state) => ({ reviews: [...state.reviews, review] })),
      addAdminReply: (reviewId, reply) => set((state) => ({
        reviews: state.reviews.map(review =>
          review.id === reviewId ? { ...review, adminReply: reply } : review
        )
      })),
      clearInvalidReviews: () => set((state) => ({
        reviews: state.reviews.filter(review => 
          state.products.some(product => product.id === review.productId)
        )
      })),
      getCurrentUser,
    }),
    {
      name: 'product-store',
      getStorage: () => localStorage,
    }
  )
);

export default useProductStore;