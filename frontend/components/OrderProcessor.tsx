// components/OrderProcessor.tsx
//crea la orden en cosole, como mandamos esa orden a la base de datos.
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { generateOrderId, formatOrderDetails } from "@/utils/orderHelpers";
import type { Order, PaymentMethod } from "@/types/order";
import type { CartItem } from "@/hooks/use-cart";

interface OrderProcessorProps {
  items: CartItem[];
  totalPrice: number;
  onOrderComplete?: (order: Order) => void;
  onOrderProcessed?: () => void; // Para limpiar el carrito después del pago
}

const OrderProcessor: React.FC<OrderProcessorProps> = ({
  items,
  totalPrice,
  onOrderComplete,
  onOrderProcessed,
}) => {
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
  const [showYapeDialog, setShowYapeDialog] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const WHATSAPP_NUMBER = "51999999999"; // Reemplaza con tu número
  const YAPE_NUMBER = "999999999"; // Reemplaza con tu número de Yape

  // Función para guardar la orden en Strapi
  const saveOrderToBackend = async (orderData: Order) => {
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      // Log response to see more details
      const responseData = await response.json();
      if (!response.ok) {
        console.error("Error details:", responseData); // Log error details
        throw new Error("Error saving order");
      }

      return responseData;
    } catch (error) {
      console.error("Error saving order:", error);
      toast({
        title: "Error",
        description: "No se pudo guardar la orden",
        variant: "destructive",
      });
    }
  };

  const processOrder = async (paymentMethod: PaymentMethod) => {
    setIsProcessing(true);
    try {
      const newOrderId = generateOrderId();
      setCurrentOrderId(newOrderId);
  
      if (!items || items.length === 0) {
        toast({
          title: "❌ Error",
          description: "No hay productos en el carrito.",
          variant: "destructive",
        });
        return;
      }
  
      // Simula datos de cliente (debes obtener estos datos del usuario)
      const customerInfo = {
        name: "John Doe", // Obtener del formulario o estado
        phone: "123456789", // Obtener del formulario o estado
        address: "123 Main St", // Obtener del formulario o estado
      };
  
      const orderData: Order = {
        id: newOrderId,
        orderId: newOrderId,
        items: items.map((item) => ({
          ...item, // Mantiene todas las propiedades de CartItem
        })),
        totalPrice,
        paymentMethod,
        status: "pending",
        createdAt: new Date().toISOString(),
        customerInfo, // Incluye datos del cliente
      };
  
      // Guardar la orden en Strapi
      await saveOrderToBackend(orderData);
  
      // Notificar que se ha creado una nueva orden
      await onOrderComplete?.(orderData);
  
      if (paymentMethod === "yape") {
        setShowYapeDialog(true);
        toast({
          title: "Orden creada correctamente",
          description: `Orden #${newOrderId} - Por favor realiza el pago con Yape`,
        });
      } else if (paymentMethod === "whatsapp") {
        const message = formatOrderDetails(items, totalPrice, newOrderId);
        window.open(
          `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
          "_blank"
        );
        onOrderProcessed?.(); // Limpiar carrito después de enviar a WhatsApp
      }
    } catch (error) {
      toast({
        title: "Error al procesar la orden",
        description: "Por favor intenta nuevamente",
        variant: "destructive",
      });
      console.error("Error processing order:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDialogClose = () => {
    setShowYapeDialog(false);
    setCurrentOrderId(null);
    onOrderProcessed?.(); // Limpiar carrito después de cerrar el diálogo de Yape
  };

  return (
    <div className="space-y-4">
      {/* Botón para pagar por WhatsApp */}
      <Button
        className="w-full py-6"
        onClick={() => processOrder("whatsapp")}
        disabled={isProcessing}
      >
        {isProcessing ? "Procesando..." : "Pagar por WhatsApp"}
      </Button>

      {/* Botón para pagar con Yape */}
      <Button
        variant="secondary"
        className="w-full py-6"
        onClick={() => processOrder("yape")}
        disabled={isProcessing}
      >
        {isProcessing ? "Procesando..." : "Pagar con Yape"}
      </Button>

      {/* Diálogo para Yape */}
      <Dialog open={showYapeDialog} onOpenChange={handleDialogClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Paga con Yape - Orden #{currentOrderId}</DialogTitle>
            <DialogDescription className="space-y-2 text-sm">
              Sigue estos pasos para completar tu pago:
              <ol className="list-decimal pl-5 space-y-1">
                <li>
                  Escanea el QR o usa el número:{" "}
                  <strong className="text-primary">{YAPE_NUMBER}</strong>
                </li>
                <li>
                  Monto a pagar:{" "}
                  <span className="font-bold bg-gray-100 p-1 rounded">
                    S/ {totalPrice.toFixed(2)}
                  </span>
                </li>
                <li>
                  En comentarios coloca:{" "}
                  <strong className="text-primary">#{currentOrderId}</strong>
                </li>
              </ol>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center p-4">
            <img
              src="https://via.placeholder.com/200x200" // Reemplaza con el QR real
              alt="QR Yape"
              width={200}
              height={200}
              className="w-48 h-48 object-cover rounded-lg border border-gray-200"
            />
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                if (!currentOrderId) return;
                const message = formatOrderDetails(
                  items,
                  totalPrice,
                  currentOrderId
                );
                window.open(
                  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    message
                  )}`,
                  "_blank"
                );
                handleDialogClose();
              }}
            >
              Enviar comprobante por WhatsApp
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrderProcessor;

/* const orderData: Order = {
  id: newOrderId,
  orderId: newOrderId,
  items: items.map((item) => ({
    ...item, // 🔹 Mantiene todas las propiedades de CartItem
  })),
  totalPrice,
  paymentMethod,
  status: "pending",
  createdAt: new Date().toISOString(),
}; */
