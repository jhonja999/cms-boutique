import { generateOrderId, formatOrderDetails } from "@/utils/orderHelpers";
import { CartItem } from "@/hooks/use-cart";

export const sendOrderToStrapi = async (
  items: CartItem[],
  totalPrice: number,
  userId: number,
  userRole: string
) => {
  if (!items || items.length === 0) {
    console.error("❌ No hay productos en el carrito.");
    return { success: false, error: "El carrito está vacío." };
  }

  // ✅ Genera el código de orden
  const orderId = generateOrderId();

  // ✅ Formatea los detalles de la orden
  const orderDetails = formatOrderDetails(items, totalPrice, orderId);
  console.log("📋 Orden generada:", orderDetails);

  // ✅ Construye la orden para Strapi
  const orderData = {
    data: {
      orderId, // Código único de orden
      user: userId, // ID del usuario que hizo la compra
      role: userRole, // Rol del usuario para filtrado
      items: items.map((item) => ({
        productName: item.productName,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.price * item.quantity,
      })),
      total: totalPrice,
      status: "pendiente",
    },
  };

  try {
    // ✅ Enviar la orden a Strapi
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error("Error al enviar la orden a Strapi");
    }

    console.log("✅ Orden enviada con éxito:", orderId);
    return { success: true, orderId };
  } catch (error) {
    console.error("❌ Error al enviar la orden:", error);
    return { success: false, error };
  }
};
