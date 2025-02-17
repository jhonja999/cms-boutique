"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { formatPrice } from "@/lib/formatPrice";
import { toast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";

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

export default function OrderDetailsPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  // Función para obtener los detalles de la orden desde Strapi
  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`/api/orders/${id}`);
      if (!response.ok) {
        throw new Error("Error al obtener los detalles de la orden");
      }
      const data = await response.json();
      setOrder(data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los detalles de la orden",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  if (loading) {
    return <p>Cargando detalles de la orden...</p>;
  }

  if (!order) {
    return <p>No se encontró la orden.</p>;
  }

  return (
    <div className="max-w-6xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Detalles de la Orden #{order.orderId}</h1>
      <div className="p-6 border rounded-lg">
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
      </div>
    </div>
  );
}