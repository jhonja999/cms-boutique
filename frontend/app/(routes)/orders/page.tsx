"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/formatPrice";
import { toast } from "@/components/ui/use-toast";

interface Order {
  id: string;
  orderId: string;
  products: {
    name: string;
    quantity: number;
    price: number;
  }[];
  totalPrice: number;
  status: string;
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Función para obtener las órdenes desde Strapi
  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders");
      if (!response.ok) {
        throw new Error("Error al obtener las órdenes");
      }
      const data = await response.json();
      setOrders(data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar las órdenes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <p>Cargando órdenes...</p>;
  }

  return (
    <div className="max-w-6xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Mis Órdenes</h1>
      {orders.length === 0 ? (
        <p>No tienes órdenes recientes.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="p-6 border rounded-lg">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Orden #{order.orderId}</h2>
                <p className="text-muted-foreground">
                  Fecha: {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <Separator className="my-4" />
              <div className="space-y-2">
                {order.products.map((product, index) => (
                  <div key={index} className="flex justify-between">
                    <p>
                      {product.name} (x{product.quantity})
                    </p>
                    <p>{formatPrice(product.price)}</p>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between">
                <p className="font-semibold">Total</p>
                <p className="font-semibold">{formatPrice(order.totalPrice)}</p>
              </div>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => router.push(`/orders/${order.id}`)}
              >
                Ver detalles
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}