import { ProductInfo } from "@/interfaces/interface";
import create, { StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

interface CartItem extends ProductInfo {
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (item: ProductInfo) => void;
  removeCart: (itemId: string) => void;
  clearCart: () => void;
}

type CartPersist = (
  config: StateCreator<CartState>,
  options: PersistOptions<CartState>,
) => StateCreator<CartState>;

const useCartStore = create<CartState>(
  (persist as CartPersist)(
    (set) => ({
      cart: [],
      addToCart: (item: ProductInfo) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem._id === item._id,
          );
          if (existingItem) {
            return {
              cart: state.cart.map((cartItem) =>
                cartItem._id === item._id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem,
              ),
            };
          }
          return { cart: [...state.cart, { ...item, quantity: 1 }] };
        }),
      removeCart: (itemId: string) =>
        set((state) => {
          const existingItem = state.cart.find((item) => item._id === itemId);
          if (existingItem && existingItem.quantity > 1) {
            return {
              cart: state.cart.map((item) =>
                item._id === itemId
                  ? { ...item, quantity: item.quantity - 1 }
                  : item,
              ),
            };
          }
          return {
            cart: state.cart.filter((item) => item._id !== itemId),
          };
        }),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart",
      getStorage: () => localStorage,
    },
  ),
);

export default useCartStore;
