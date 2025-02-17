"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/formatPrice";
import CartItem from "./components/cart-item";
import { ShoppingBag, Trash2, ListOrdered } from "lucide-react"; // Importa el ícono ListOrdered
import OrderProcessor from "@/components/OrderProcessor";
import Link from "next/link"; // Para redirigir a la página de órdenes

export default function CartPage() {
  const { items, removeAll, getTotalPrice } = useCart();
  const totalPrice = getTotalPrice();

  return (
    <div className="max-w-6xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
      {/* Título y botones */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <ShoppingBag className="w-8 h-8" />
          Carrito de compras
        </h1>
        <div className="flex gap-4">
          {items.length > 0 && (
            <Button
              variant="outline"
              onClick={removeAll}
              className="flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Vaciar carrito
            </Button>
          )}
          {/* Botón para ver órdenes */}
          <Button asChild>
            <Link href="/orders" className="flex items-center gap-2">
              <ListOrdered className="w-4 h-4" />
              Ver órdenes
            </Link>
          </Button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="grid sm:grid-cols-2 sm:gap-8">
        {/* Lista de productos en el carrito */}
        <div>
          {items.length === 0 ? (
            <div className="text-center py-12 rounded-lg bg-background">
              <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg text-muted-foreground">
                No hay productos en el carrito
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <CartItem key={item.id} product={item} />
              ))}
            </ul>
          )}
        </div>

        {/* Resumen del pedido */}
        {items.length > 0 && (
          <div className="max-w-xl mt-8 sm:mt-0">
            <div className="p-6 rounded-lg bg-background border">
              <p className="mb-3 text-lg font-semibold">Resumen del pedido</p>
              <Separator />
              <div className="flex justify-between gap-5 my-4">
                <p className="text-muted-foreground">Total</p>
                <p className="font-semibold">{formatPrice(totalPrice)}</p>
              </div>
              <OrderProcessor
                items={items}
                totalPrice={totalPrice}
                onOrderComplete={(order) => {
                  console.log("Orden creada:", order);
                  // Aquí podrías guardar la orden en tu backend
                }}
                onOrderProcessed={() => {
                  removeAll(); // Limpia el carrito después de procesar la orden
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}