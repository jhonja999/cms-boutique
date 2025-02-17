import { CartItem } from "@/hooks/use-cart";

// ✅ Genera un código de orden con los últimos 2 dígitos del año
export const generateOrderId = (): string => {
  const date = new Date();

  // ✅ Solo los últimos 2 dígitos del año (2025 → 25)
  const yearStr = date.getFullYear().toString().slice(-2);

  // ✅ Formato: MMDD
  const dateStr =
    (date.getMonth() + 1).toString().padStart(2, "0") +
    date.getDate().toString().padStart(2, "0");

  // ✅ Formato: HHMMSS
  const timeStr =
    date.getHours().toString().padStart(2, "0") +
    date.getMinutes().toString().padStart(2, "0") +
    date.getSeconds().toString().padStart(2, "0");

  // ✅ Número aleatorio de 3 dígitos
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, "0");

  return `ORD-${yearStr}${dateStr}-${timeStr}-${random}`;
};

// ✅ Formatea los detalles de la orden
export const formatOrderDetails = (
  items: CartItem[],
  totalPrice: number,
  orderId: string
): string => {
  const itemsList = items
    .map(
      (item) => `• ${item.productName}  
Cantidad: ${item.quantity}  
Precio unitario: S/ ${item.price}  
Subtotal: S/ ${(item.price * item.quantity).toFixed(2)}`
    )
    .join("\n\n");

  return `🛍️ *Nuevo Pedido #${orderId}*
📋 *Detalles del pedido:*
${itemsList}
💰 *Total a pagar: S/ ${totalPrice.toFixed(2)}*
-------------------  
Por favor, envía una captura de tu pago para procesar tu pedido.`;
};
