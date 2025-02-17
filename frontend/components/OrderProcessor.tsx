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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onOrderComplete,
  onOrderProcessed,
}) => {
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
  const [showYapeDialog, setShowYapeDialog] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isUserRegistered, setIsUserRegistered] = useState<boolean>(false); // Estado para verificar si el usuario está registrado
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const WHATSAPP_NUMBER = "51999999999"; // Reemplaza con tu número
  const YAPE_NUMBER = "999999999"; // Reemplaza con tu número de Yape

  // Función para procesar la orden
  const processOrder = async (paymentMethod: PaymentMethod) => {
    setIsProcessing(true);

    if (!isUserRegistered) {
      toast({
        title: "⚠️ Usuario no registrado",
        description: "Por favor, completa tus datos antes de continuar.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (!items || items.length === 0) {
        toast({
          title: "❌ Error",
          description: "No hay productos en el carrito.",
          variant: "destructive",
        });
        return;
      }

      const newOrderId = generateOrderId();
      setCurrentOrderId(newOrderId);

      const orderData: Order = {
        id: newOrderId,
        orderId: newOrderId,
        items: items.map((item) => ({
          ...item,
        })),
        totalPrice,
        paymentMethod,
        status: "pending",
        createdAt: new Date().toISOString(),
        customerInfo, // Usa los datos del usuario registrados
      };

      // Simula guardar la orden (puedes enviarla al backend aquí)
      console.log("Orden creada:", orderData);

      // Notifica al usuario
      toast({
        title: "✅ Orden creada correctamente",
        description: `Orden #${newOrderId} - Detalles disponibles.`,
      });

      if (paymentMethod === "yape") {
        setShowYapeDialog(true);
      } else if (paymentMethod === "whatsapp") {
        const message = formatOrderDetails(items, totalPrice, newOrderId);
        window.open(
          `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
          "_blank"
        );
        onOrderProcessed?.(); // Limpiar carrito
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
    onOrderProcessed?.();
  };

  return (
    <div className="space-y-4">
      {/* Formulario para registrar usuario */}
      {!isUserRegistered && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Completa tus datos:</h3>
          <input
            type="text"
            placeholder="Nombre"
            value={customerInfo.name}
            onChange={(e) =>
              setCustomerInfo({ ...customerInfo, name: e.target.value })
            }
            className="border p-2 w-full"
          />
          <input
            type="text"
            placeholder="Teléfono"
            value={customerInfo.phone}
            onChange={(e) =>
              setCustomerInfo({ ...customerInfo, phone: e.target.value })
            }
            className="border p-2 w-full"
          />
          <input
            type="text"
            placeholder="Dirección"
            value={customerInfo.address}
            onChange={(e) =>
              setCustomerInfo({ ...customerInfo, address: e.target.value })
            }
            className="border p-2 w-full"
          />
          <Button onClick={() => setIsUserRegistered(true)}>
            Registrar Usuario
          </Button>
        </div>
      )}

      {/* Botones de pago */}
      {isUserRegistered && (
        <>
          <Button
            className="w-full py-6"
            onClick={() => processOrder("whatsapp")}
            disabled={isProcessing}
          >
            {isProcessing ? "Procesando..." : "Pagar por WhatsApp"}
          </Button>
          <Button
            variant="secondary"
            className="w-full py-6"
            onClick={() => processOrder("yape")}
            disabled={isProcessing}
          >
            {isProcessing ? "Procesando..." : "Pagar con Yape"}
          </Button>
        </>
      )}

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
              src="https://via.placeholder.com/200x200"
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
                const message = formatOrderDetails(items, totalPrice, currentOrderId);
                window.open(
                  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
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