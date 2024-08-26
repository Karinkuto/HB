import create from 'zustand';
import { persist } from 'zustand/middleware';

// Define your data types
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  subcategory: string;
  size: string;
  color: string;
  brand: string;
  image: string;
  status: string;
}

interface User {
  id: number;
  username: string;
  phoneNumber: string;
  isAdmin: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

interface Order {
  id: number;
  userId: number;
  items: CartItem[];
  total: number;
  status: string;
  createdAt: string;
}

// Define your store state
interface StoreState {
  products: Product[];
  users: User[];
  currentUser: User | null;
  cart: CartItem[];
  orders: Order[];
  favorites: number[]; // Array of product IDs
  isLoggedIn: boolean;
  isAdmin: boolean;

  // Actions
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: number) => void;
  
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  deleteUser: (userId: number) => void;
  
  setCurrentUser: (user: User | null) => void;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateCartItemQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: number, status: string) => void;
  
  addToFavorites: (productId: number) => void;
  removeFromFavorites: (productId: number) => void;
}

// Create the store
const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      products: [],
      users: [],
      currentUser: null,
      cart: [],
      orders: [],
      favorites: [],
      isLoggedIn: false,
      isAdmin: false,

      setProducts: (products) => set({ products }),
      addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
      updateProduct: (product) => set((state) => ({
        products: state.products.map((p) => p.id === product.id ? product : p)
      })),
      deleteProduct: (productId) => set((state) => ({
        products: state.products.filter((p) => p.id !== productId)
      })),

      setUsers: (users) => set({ users }),
      addUser: (user) => set((state) => ({ users: [...state.users, user] })),
      updateUser: (user) => set((state) => ({
        users: state.users.map((u) => u.id === user.id ? user : u)
      })),
      deleteUser: (userId) => set((state) => ({
        users: state.users.filter((u) => u.id !== userId)
      })),

      setCurrentUser: (user) => set({ currentUser: user, isLoggedIn: !!user, isAdmin: user?.isAdmin || false }),
      login: (username, password) => {
        const user = get().users.find(u => u.username === username && u.password === password);
        if (user) {
          set({ currentUser: user, isLoggedIn: true, isAdmin: user.isAdmin });
          return true;
        }
        return false;
      },
      logout: () => set({ currentUser: null, isLoggedIn: false, isAdmin: false }),

      addToCart: (product, quantity) => set((state) => {
        const existingItem = state.cart.find(item => item.id === product.id);
        if (existingItem) {
          return {
            cart: state.cart.map(item =>
              item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
            )
          };
        } else {
          return { cart: [...state.cart, { ...product, quantity }] };
        }
      }),
      removeFromCart: (productId) => set((state) => ({
        cart: state.cart.filter(item => item.id !== productId)
      })),
      updateCartItemQuantity: (productId, quantity) => set((state) => ({
        cart: state.cart.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      })),
      clearCart: () => set({ cart: [] }),

      addOrder: (order) => set((state) => ({ orders: [...state.orders, order] })),
      updateOrderStatus: (orderId, status) => set((state) => ({
        orders: state.orders.map(order =>
          order.id === orderId ? { ...order, status } : order
        )
      })),

      addToFavorites: (productId) => set((state) => ({
        favorites: [...state.favorites, productId]
      })),
      removeFromFavorites: (productId) => set((state) => ({
        favorites: state.favorites.filter(id => id !== productId)
      })),
    }),
    {
      name: 'hulu-brand-store',
      getStorage: () => localStorage,
    }
  )
);

export default useStore;