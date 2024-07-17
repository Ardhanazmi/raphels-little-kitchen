import { create } from "zustand";
import { toast } from "react-hot-toast";
import { Product } from "@prisma/client";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.id === data.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            items: [...get().items, { ...data, quantity: 1 }],
          });
        }

        toast.success("Item ditambahkan ke keranjang");
      },
      removeItem: (id: string) => {
        set({
          items: [...get().items.filter((item) => item.id !== id)],
        });
        toast.success("Item dihapus dari keranjang");
      },
      updateItemQuantity: (id: string, quantity: number) => {
        const currentItems = get().items;
        const updatedItems = currentItems.map((item) =>
          item.id === id ? { ...item, quantity } : item
        );

        set({ items: updatedItems });
        toast.success("Quantity diperbarui");
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
