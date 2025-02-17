// types/order.ts
import { CartItem } from "@/hooks/use-cart";

export interface Order {
  id: string;
  orderId: string;
  items: CartItem[];
  totalPrice: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  createdAt: string;
  customerInfo: CustomerInfo; // Change from `JSON` to `CustomerInfo`
}

export type PaymentMethod = "whatsapp" | "yape";

export type OrderStatus =
  | "pending"
  | "paid"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

  export interface CustomerInfo {
    name: string;
    phone: string;
    email?: string;
    address: string;
  }
  