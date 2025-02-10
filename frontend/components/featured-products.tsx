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
import { Download, Expand, ShoppingCartIcon } from "lucide-react";
import IconButton from "./icon-buttons";
import { useRouter } from "next/navigation";
import Image from "next/image";

const FeaturedProducts = () => {
  const { loading, result }: ResponseType = useGetFeaturedProducts();
  const router = useRouter();

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      {/* Title */}
      <h3 className="px-6 text-3xl sm:pb-8">Productos Destacados</h3>

      {/* Carousel */}
      <Carousel>
        <CarouselContent className="-ml-2 md:-ml-4">
          {/* Loading State */}
          {loading && <SkeletonSchema grid={3} />}

          {/* Products */}
          {result &&
            result.map((product: ProductType) => {
              const {
                documentId,
                productName,
                slug,
                taste,
                origin,
                price,
                images,
                category,
              } = product;

              // Extract the first image URL or use a fallback
              const imageUrl =
                images?.[0]?.formats?.thumbnail?.url
                  ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${images[0].formats.thumbnail.url}`
                  : "/placeholder-image.webp";

              // Extract category details
              const categoryName = category?.categoryName || "Sin categoría";
              const categorySlug = category?.slug || "#";

              return (
                <CarouselItem key={documentId} className="md:basis-1/2 lg:basis-1/3 group">
                  <div className="p-1">
                    <Card className="py-4 border border-gray-200 shadow-none">
                      <CardContent className="relative flex items-center justify-center px-6 py-2">
                        {/* Product Image */}
                        <Image
                          src={imageUrl}
                          alt={productName || "Producto"}
                          width={300}
                          height={200}
                          className="object-cover w-full h-48 rounded-lg"
                        />

                        {/* Action Buttons */}
                        <div className="absolute w-full px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5">
                          <div className="flex justify-center gap-x-6">
                            <IconButton
                              onClick={() => router.push(`/product/${slug}`)}
                              icon={<Expand size={20} />}
                              className="text-gray-600"
                            />
                            <IconButton
                              onClick={() => router.push(`/cart/${documentId}`)}
                              icon={<ShoppingCartIcon size={20} />}
                              className="text-gray-600"
                            />
                            <IconButton
                              onClick={() => router.push(`/download/${documentId}`)}
                              icon={<Download size={20} />}
                              className="text-gray-600"
                            />
                          </div>
                        </div>
                      </CardContent>

                      {/* Product Details */}
                      <div className="flex justify-between gap-4 px-8">
                        <h3 className="text-lg font-bold">{productName || "Producto sin nombre"}</h3>
                        <div className="flex items-center justify-between gap-3">
                          <p className="px-2 py-1 text-white bg-black rounded-full dark:bg-white dark:text-black w-fit">
                            {taste || "Desconocido"}
                          </p>
                          <p className="px-2 py-1 text-white bg-yellow-900 rounded-full w-fit">
                            {origin || "Desconocido"}
                          </p>
                        </div>
                      </div>

                      {/* Price and Category */}
                      <div className="flex justify-between px-8 mt-2">
                        <p className="text-lg font-semibold">${price.toFixed(2)}</p>
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
            })}
        </CarouselContent>
        <CarouselPrevious className="absolute transform -translate-y-1/2 bg-gray-800/60 hover:bg-gray-900/80 text-white p-2 rounded-full shadow-md" />
        <CarouselNext className="absolute transform -translate-y-1/2 bg-gray-800/60 hover:bg-gray-900/80 text-white p-2 rounded-full shadow-md hidden sm:flex" />
      
      </Carousel>
    </div>
  );
};

export default FeaturedProducts;