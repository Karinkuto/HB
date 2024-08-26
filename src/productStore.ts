import create from 'zustand';

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

interface ProductState {
  products: Product[];
  filter: string;
  sortBy: string;
  searchTerm: string;
  setProducts: (products: Product[]) => void;
  setFilter: (filter: string) => void;
  setSortBy: (sortBy: string) => void;
  setSearchTerm: (searchTerm: string) => void;
}

const useProductStore = create<ProductState>((set) => ({
  products: [],
  filter: 'all',
  sortBy: 'name',
  searchTerm: '',
  setProducts: (products) => set({ products }),
  setFilter: (filter) => set({ filter }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSearchTerm: (searchTerm) => set({ searchTerm }),
}));

export default useProductStore;