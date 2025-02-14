import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ProductType } from "@/types/product";
import { toast } from "@/components/ui/use-toast";

interface UseLovedProductsType {
  lovedItems: ProductType[]; // ✅ Corrección: Renombrado a `lovedItems`
  addLovedItem: (data: ProductType) => void;
  removeLovedItem: (id: number) => void;
  removeAllLovedItems: () => void; // ✅ Corrección de nombre
  isItemLoved: (id: number) => boolean;
  getTotalLovedItems: () => number; // ✅ Corrección de nombre
}

export const useLovedProducts = create(
  persist<UseLovedProductsType>(
    (set, get) => ({
      lovedItems: [], // ✅ Estado inicial corregido

      // ✅ Agregar un producto a favoritos
      addLovedItem: (data: ProductType) => {
        const currentItems = get().lovedItems;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (typeof window === "undefined") return; // ✅ Evita ejecución en SSR

        if (existingItem) {
          toast({
            title: "⚠️ Producto ya en favoritos",
            description: "Este producto ya está en tu lista de favoritos ❤️",
            variant: "destructive",
          });
          return;
        }

        set({ lovedItems: [...currentItems, data] });

        toast({
          title: "Producto añadido a favoritos ❤️",
          description: `${data.productName} se ha añadido a tus favoritos`,
        });
      },

      // ✅ Remover un producto de favoritos
      removeLovedItem: (id: number) => {
        const currentItems = get().lovedItems;
        const itemToRemove = currentItems.find((item) => item.id === id);

        set({ lovedItems: currentItems.filter((item) => item.id !== id) });

        if (itemToRemove) {
          toast({
            title: "❌ Producto eliminado de favoritos",
            description: `${itemToRemove.productName} ha sido eliminado de tus favoritos`,
          });
        }
      },

      // ✅ Vaciar lista de favoritos
      removeAllLovedItems: () => {
        set({ lovedItems: [] });
        toast({
          title: "🗑️ Favoritos vaciados",
          description: "🧹 Se han eliminado todos los productos de tu lista de favoritos",
        });
      },

      // ✅ Verificar si un producto está en favoritos
      isItemLoved: (id: number) => {
        return !!get().lovedItems.find((item) => item.id === id);
      },

      // ✅ Obtener el total de productos favoritos
      getTotalLovedItems: () => {
        return get().lovedItems.length;
      },
    }),
    {
      name: "loved-products-storage", // Clave de almacenamiento única
      storage:
        typeof window !== "undefined"
          ? createJSONStorage(() => localStorage)
          : undefined, // ✅ Evita errores en SSR
    }
  )
);
