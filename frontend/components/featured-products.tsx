"use client";

import { useGetFeaturedProducts } from "@/api/useGetFeaturedProducts";
import { ResponseType } from "@/types/response";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import SkeletonSchema from "./skeletonSchema";
import { ProductType } from "@/types/product";
import { Heart, Expand, ShoppingCart } from "lucide-react";
import IconButton from "./icon-buttons";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";
import CategoryLabels from "./shared/CategoryLabels";
import ProductImageMiniature from "./shared/ProductImageMiniature";
import { formatPrice } from "@/lib/formatPrice";

const FeaturedProducts = () => {
  const { loading, result }: ResponseType = useGetFeaturedProducts();
  const router = useRouter();
  const { addItem } = useCart();
  const { addLovedItem, removeLovedItem, isItemLoved } = useLovedProducts();

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      <h3 className="px-6 text-3xl sm:pb-8">✨ Productos Destacados</h3>

      <Carousel>
        <CarouselContent className="-ml-2 md:-ml-4">
          {/* Loading State */}
          {loading ? (
            <SkeletonSchema grid={3} />
          ) : (
            result?.map((product: ProductType) => {
              const { documentId, productName, slug, price, images, category } =
                product;

              // ✅ Extrae la primera imagen o usa un placeholder
              const imageUrl = images?.[0]?.url || "/placeholder.webp";

              // ✅ Extrae la categoría
              const categoryName = category?.categoryName || "Sin categoría";
              const categorySlug = category?.slug || "#";

              // ✅ Verifica si el producto está en favoritos
              const isLoved = isItemLoved(product.id);

              return (
                <CarouselItem
                  key={documentId}
                  className="md:basis-1/2 lg:basis-1/3 group"
                >
                  <div className="p-1">
                    <Card className="py-4 border border-gray-200 shadow-none">
                      <CardContent className="relative flex items-center justify-center px-6 py-2">
                        {/* ✅ Usa el nuevo `ProductImageMiniature` */}
                        <ProductImageMiniature slug={slug} url={imageUrl} />

                        {/* Botones de Acción */}
                        <div className="absolute w-full px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5">
                          <div className="flex justify-center gap-x-6">
                            <IconButton
                              onClick={() => router.push(`/product/${slug}`)}
                              icon={<Expand size={20} />}
                              className="text-gray-600"
                            />
                            <IconButton
                              onClick={() => addItem(product)}
                              icon={<ShoppingCart size={20} />}
                              className="text-gray-600"
                            />
                            {/* Botón de Favoritos */}
                            <IconButton
                              onClick={() =>
                                isLoved
                                  ? removeLovedItem(product.id)
                                  : addLovedItem(product)
                              }
                              icon={
                                <Heart
                                  size={20}
                                  fill={isLoved ? "orange" : "none"}
                                  className={`text-gray-600 ${
                                    isLoved ? "text-white-500" : ""
                                  }`}
                                />
                              }
                            />
                          </div>
                        </div>
                      </CardContent>

                      {/* Información del Producto */}
                      <div className="flex items-center justify-between gap-4 px-8">
                        <h3 className="text-lg font-bold">
                          {productName || "Producto sin nombre"}
                        </h3>
                        {/* ✅ Usa `flex-wrap` para evitar problemas de espacio */}
                        <div className="flex flex-wrap gap-2">
                          <CategoryLabels
                            taste={product.taste}
                            origin={product.origin}
                          />
                        </div>
                      </div>

                      {/* Precio y Categoría */}
                      <div className="flex justify-between px-8 mt-2">
                        <p className="text-lg font-semibold">
                          {formatPrice(price)} {/* ✅ Usa formato correcto en soles*/}
                        </p>
                        <a
                          href={`/category/${categorySlug}`}
                          className="text-sm text-blue-500 hover:underline"
                        >
                          {categoryName}
                        </a>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })
          )}
        </CarouselContent>

        <CarouselPrevious className="absolute transform -translate-y-1/2 bg-gray-800/60 hover:bg-gray-900/80 text-white p-2 rounded-full shadow-md" />
        <CarouselNext className="absolute transform -translate-y-1/2 bg-gray-800/60 hover:bg-gray-900/80 text-white p-2 rounded-full shadow-md hidden sm:flex" />
      </Carousel>
    </div>
  );
};

export default FeaturedProducts;
