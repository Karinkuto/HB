import create from 'zustand';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
  variant?: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
  variant?: string;
}

interface CartState {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
}

const useCartStore = create<CartState>((set) => ({
  items: [],
  addToCart: (product) => set((state) => {
    const existingItem = state.items.find(item => item.id === product.id);
    if (existingItem) {
      return {
        items: state.items.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      };
    } else {
      const cartItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
        size: product.size ? product.size.toUpperCase() : undefined,
        color: product.color,
        variant: product.variant,
      };
      return { items: [...state.items, cartItem] };
    }
  }),
  removeFromCart: (productId) => set((state) => ({
    items: state.items.filter(item => item.id !== productId)
  })),
  updateQuantity: (productId, quantity) => set((state) => ({
    items: state.items.map(item => 
      item.id === productId ? { ...item, quantity } : item
    )
  })),
}));

export default useCartStore;