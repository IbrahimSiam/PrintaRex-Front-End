import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useUIStore } from './uiStore';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  priceAED: number;
  priceEGP: number;
  qty: number;
  designJSON?: string;
  previewUrl?: string;
  size?: string;
  color?: string;
  image?: string;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

export interface CartActions {
  addItem: (item: Omit<CartItem, 'id'>) => void;
  updateQuantity: (itemId: string, qty: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export type CartStore = CartState & CartActions;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      isOpen: false,

      // Actions
      addItem: (itemData) => {
        const { items } = get();
        const existingItem = items.find(
          item => 
            item.productId === itemData.productId && 
            item.size === itemData.size && 
            item.color === itemData.color &&
            item.designJSON === itemData.designJSON
        );

        if (existingItem) {
          // Update quantity if item already exists
          set({
            items: items.map(item =>
              item.id === existingItem.id
                ? { ...item, qty: item.qty + itemData.qty }
                : item
            )
          });
        } else {
          // Add new item
          const newItem: CartItem = {
            ...itemData,
            id: `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          };
          set({ items: [...items, newItem] });
        }
      },

      updateQuantity: (itemId, qty) => {
        const { items } = get();
        if (qty <= 0) {
          get().removeItem(itemId);
        } else {
          set({
            items: items.map(item =>
              item.id === itemId ? { ...item, qty } : item
            )
          });
        }
      },

      removeItem: (itemId) => {
        const { items } = get();
        set({
          items: items.filter(item => item.id !== itemId)
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      toggleCart: () => {
        set({ isOpen: !get().isOpen });
      },

      setCartOpen: (open) => {
        set({ isOpen: open });
      },

      getTotal: () => {
        const { items } = get();
        const { currency } = useUIStore.getState();
        
        return items.reduce((total, item) => {
          const price = currency === 'AED' ? item.priceAED : item.priceEGP;
          return total + (price * item.qty);
        }, 0);
      },

      getItemCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.qty, 0);
      },
    }),
    {
      name: 'cart-store',
      partialize: (state) => ({
        items: state.items,
      }),
    }
  )
);
