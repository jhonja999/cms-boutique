//hook para Zustand
//para añadir productos al carro, featured product
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ProductType } from "@/types/product";
import { toast } from "@/components/ui/use-toast";

interface CartStore {
  items: ProductType[];
  addItem: (data: ProductType) => void;
  removeItem: (id: number) => void;
  removeAll: () => void;
  getTotalPrice: () => number;
}

export const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      
      addItem: (data: ProductType) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);
        
        if (existingItem) {
          toast({
            title: "⚠️El producto ya existe en el carrito",
            description: "Este producto ya se encuentra en tu carrito de compras 🛒",
            variant: "destructive",
          });
          return;
        }

        set({ items: [...currentItems, data] });
        
        toast({
          title: "Producto añadido al carrito 🛍️",
          description: `${data.productName} se ha añadido a tu carrito ✅`,
        });
      },
      
      removeItem: (id: number) => {
        set({ 
          items: get().items.filter((item) => item.id !== id)
        });
        
        toast({
          title: "🗑️Producto removido del carrito",
        });
      },
      
      removeAll: () => {
        set({ items: [] }); // Limpia el carrito completamente 🗑️
        toast({
            title: "🧹 Todos los productos han sido eliminados del carrito.",
          });
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          return total + (item.price || 0);
        }, 0);
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
