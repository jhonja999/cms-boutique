import { useCart } from "@/hooks/use-cart";
import { ProductType } from "@/types/product";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/formatPrice";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import CategoryLabels from "@/components/shared/CategoryLabels";
import ProductImageMiniature from "@/components/shared/ProductImageMiniature";

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
        <ProductImageMiniature slug={product.slug} url={product.images[0]?.url} />

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
              {/* ✅ Usa el componente en vez de código duplicado */}
              <CategoryLabels taste={product.taste} origin={product.origin} />
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
