import { useCart } from "@/hooks/use-cart";
import { ProductType } from "@/types/product";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/formatPrice";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface CartItemProps {
  product: ProductType;
}

const CartItem = (props: CartItemProps) => {
  const { product } = props;
  const router = useRouter();
  const { removeItem, updateQuantity, getItemQuantity } = useCart();
  const quantity = getItemQuantity(product.id);

  const handleQuantityChange = (action: "increase" | "decrease") => {
    if (action === "increase") {
      updateQuantity(product.id, quantity + 1);
    } else if (action === "decrease" && quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  const [cartReady, setCartReady] = useState(false);

  useEffect(() => {
    setCartReady(true);
  }, []);

  if (!cartReady) return null; // Evita el error de hidratación

  return (
    <li className="flex py-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="relative flex gap-4 p-4 w-full">
        {/* Product Image with Hover Effect */}
        <div
          className="relative aspect-square w-32 cursor-pointer overflow-hidden rounded-lg group"
          onClick={() => router.push(`/product/${product.slug}`)}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${product.images[0].url}`}
            alt={product.productName}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Product Details */}
        <div className="flex flex-col flex-1">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h3
                className="text-lg font-semibold cursor-pointer hover:underline transition-colors"
                onClick={() => router.push(`/product/${product.slug}`)}
              >
                {product.productName}
              </h3>

              {/* Product Attributes */}
              <div className="flex gap-2">
                <span className="px-2 py-1 text-xs text-white bg-black rounded-full dark:bg-white dark:text-black hover:bg-gray-800 transition-colors">
                  {product.taste}
                </span>
                <span className="px-2 py-1 text-xs text-white bg-yellow-900 rounded-full hover:bg-yellow-800 transition-colors">
                  {product.origin}
                </span>
              </div>
            </div>

            {/* Remove Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeItem(product.id)}
              className="h-8 w-8 hover:bg-red-100 hover:text-red-600 transition-colors"
              aria-label="Eliminar del carrito"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Quantity Controls and Price */}
          <div className="mt-auto pt-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleQuantityChange("decrease")}
                disabled={quantity <= 1}
                aria-label="Disminuir cantidad"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-8 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleQuantityChange("increase")}
                aria-label="Aumentar cantidad"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-500">Precio unitario:</p>
              <p className="text-lg font-semibold">
                {formatPrice(product.price * quantity)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
