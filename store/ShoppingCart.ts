import { create } from "zustand";

type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type CartState = {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
};

export const useShoppingCart = create<CartState>((set) => ({
  cart: [],
  addToCart: (product) =>
    set((state) => {
      const existingProduct = state.cart.find((p) => p.id === product.id);
      if (existingProduct) {
        return {
          cart: state.cart.map((p) =>
            p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
          ),
        };
      }
      console.log("Producto añadido:", product);
      console.log("Estado actual del carrito:", [...state.cart, product]);
      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    }),

  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((product) => product.id !== id),
    })),
    
  clearCart: () => set({ cart: [] }),
}));
