/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useEffect, useState } from "react";
import { useCart } from "@/hooks/use-cart";

const UserOrdersPage = () => {
  const [orders, setOrders] = useState<any[]>([]); // Cambia `any` por el tipo adecuado
  const { clearCart } = useCart();

  useEffect(() => {
    // Simula la obtención de órdenes desde el backend
   /*  const fetchOrders = async () => {
      const mockOrders = [
        {
          id: "123",
          orderId: "ORD123",
          items: [{ productName: "Producto 1", quantity: 2, price: 10 }],
          totalPrice: 20,
          paymentMethod: "whatsapp",
          status: "completed",
          createdAt: "2023-10-01T12:00:00Z",
        },
      ];
      setOrders(mockOrders);
    };

    fetchOrders(); */
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mis Órdenes</h1>
      {orders.length === 0 ? (
        <p>No tienes órdenes previas.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border p-4 rounded-lg">
              <h2 className="text-lg font-semibold">Orden #{order.orderId}</h2>
              <p>
                <strong>Fecha:</strong> {new Date(order.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Método de Pago:</strong> {order.paymentMethod}
              </p>
              <p>
                <strong>Total:</strong> S/ {order.totalPrice.toFixed(2)}
              </p>
              <p>
                <strong>Estado:</strong> {order.status}
              </p>
              <ul>
                {order.items.map((item: { productName: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; quantity: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; price: number; }, index: React.Key | null | undefined) => (
                  <li key={index}>
                    {item.productName} - {item.quantity} x S/ {item.price.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrdersPage;