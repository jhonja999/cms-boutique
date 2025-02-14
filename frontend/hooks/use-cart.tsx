
import 
{ create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ProductType } from "@/types/product";
import { toast } from "@/components/ui/use-toast";

interface CartItem extends ProductType {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (data: ProductType) => void;
  removeItem: (id: number) => void;
  removeAll: () => void;
  updateQuantity: (id: number, quantity: number) => void;
  getItemQuantity: (id: number) => number;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      
      addItem: (data: ProductType) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);
        if (typeof window === "undefined") return; // ✅ Evita ejecutar en SSR
        
        if (existingItem) {
          toast({
            title: "⚠️El producto ya existe en el carrito",
            description: "Este producto ya se encuentra en tu carrito de compras 🛒",
            variant: "destructive",
          });
          return;
        }

        const newItem: CartItem = {
          ...data,
          quantity: 1
        };

        set({ items: [...currentItems, newItem] });
        
        toast({
         title: "Producto añadido al carrito 🛍️",
            description: `${data.productName} se ha añadido a tu carrito ✅`
        });
      },
      
      removeItem: (id: number) => {
        const itemToRemove = get().items.find(item => item.id === id);
        set({ items: get().items.filter((item) => item.id !== id) });
        
        if (itemToRemove) {
          toast({
            title: "❌Producto eliminado",
            description: `${itemToRemove.productName} ha sido eliminado del carrito`,
          });
        }
      },
      
      removeAll: () => {
        set({ items: [] });
        toast({
          title: "🗑️Carrito vaciado",
          description: "🧹Se han eliminado todos los productos del carrito",
        });
      },

      updateQuantity: (id: number, quantity: number) => {
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        });
      },

      getItemQuantity: (id: number) => {
        return get().items.find(item => item.id === id)?.quantity || 0;
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          return total + (item.price * item.quantity);
        }, 0);
      },
    }),
    {
      name: "cart-storage",
      storage: typeof window !== "undefined" ? createJSONStorage(() => localStorage) : undefined, // ✅ Previene errores en SSR
    }
  )
);