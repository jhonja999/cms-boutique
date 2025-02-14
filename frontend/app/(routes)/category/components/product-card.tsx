"use client";

import IconButton from "@/components/icon-buttons";
import CategoryLabels from "@/components/shared/CategoryLabels";
import ProductImageMiniature from "@/components/shared/ProductImageMiniature";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { formatPrice } from "@/lib/formatPrice";
import { ProductType } from "@/types/product";
import { Expand, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type ProductCardProps = {
  product: ProductType;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();

  return (
    <Link
      href={`/product/${product.slug}`}
      className="relative p-2 transition-all duration-200 rounded-lg hover:shadow-lg"
    >
      {/* Etiquetas de Categoría */}
      <div className="absolute flex items-center gap-3 px-2 z-[1] top-4">
        <CategoryLabels taste={product.taste} origin={product.origin} />
      </div>

      {/* Carousel de Imágenes */}
      <Carousel className="w-full max-w-sm overflow-hidden rounded-lg shadow-md">
        <CarouselContent>
          {product.images?.length > 0 ? (
            product.images.map((image) => (
              <CarouselItem key={image.id} className="group">
                <ProductImageMiniature slug={product.slug} url={image.url} />
                {/* Botones de Acción */}
                <div className="absolute w-full px-6 transition-opacity duration-300 opacity-0 group-hover:opacity-100 bottom-5">
                  <div className="flex justify-center gap-4">
                    <IconButton
                      onClick={() => router.push(`/product/${product.slug}`)}
                      icon={<Expand size={20} className="text-gray-600" />}
                    />
                    <IconButton
                      onClick={() => console.log("Añadir al carrito")}
                      icon={<ShoppingCart size={20} className="text-gray-600" />}
                    />
                  </div>
                </div>
              </CarouselItem>
            ))
          ) : (
            // Imagen de Respaldo si No Hay Imágenes
            <CarouselItem>
              <ProductImageMiniature slug={product.slug} url="/placeholder.webp" />
            </CarouselItem>
          )}
        </CarouselContent>
      </Carousel>

      {/* Información del Producto */}
      <p className="text-xl font-semibold text-center mt-2">{product.productName}</p>
      <p className="font-bold text-center text-lg">{formatPrice(product.price)}</p>
    </Link>
  );
};

export default ProductCard;
