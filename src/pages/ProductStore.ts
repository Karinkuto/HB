import create from 'zustand';
import { persist } from 'zustand/middleware';

// ... other imports and interfaces

const mockProducts = [
  {
    id: 1,
    name: "Sample Product 1",
    description: "This is a sample product",
    price: 19.99,
    image: "https://via.placeholder.com/150",
    // ... other necessary fields
  },
  // ... add more mock products
];

const useProductStore = create(
  persist<ProductState>(
    (set) => ({
      products: mockProducts, // Initialize with mock data
      filter: 'all',
      sortBy: 'name',
      searchTerm: '',
      setProducts: (products) => set({ products }),
      setFilter: (filter) => set({ filter }),
      setSortBy: (sortBy) => set({ sortBy }),
      setSearchTerm: (searchTerm) => set({ searchTerm }),
      isLoggedIn: false,
      setLoginStatus: (status) => set({ isLoggedIn: status }),
      // ... other actions
    }),
    {
      name: 'product-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useProductStore;