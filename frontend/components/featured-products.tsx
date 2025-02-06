"use client";

// Importaciones necesarias
import { useGetFeaturedProducts } from "@/api/useGetFeaturedProducts"; // Hook personalizado para obtener productos destacados
import { ResponseType } from "@/types/response"; // Tipo de respuesta esperada del hook
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel"; // Componentes de carrusel
import { Card, CardContent } from "./ui/card"; // Componentes de tarjeta
import SkeletonSchema from "./skeletonSchema"; // Esqueleto de carga
import { ProductType } from "@/types/product"; // Tipo de producto
import { Download, Expand, ShoppingCartIcon } from "lucide-react"; // Iconos de acciones
import IconButton from "./icon-buttons"; // Botón de ícono personalizado
import { useRouter } from "next/navigation"; // Hook de Next.js para navegación
import Image from "next/image";

/**
 * Componente `FeaturedProducts`: Muestra una lista de productos destacados en un carrusel.
 */
const FeaturedProducts = () => {
  // Obtiene los productos destacados y su estado de carga
  const { loading, result }: ResponseType = useGetFeaturedProducts();
  const router = useRouter(); // Hook para manejar la navegación

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm-px-24">
      {/* Título de la sección */}
      <h3 className="px-6 text-3xl sm:pb-8">Productos Destacados</h3>

      {/* Carrusel de productos */}
      <Carousel>
        <CarouselContent className="-ml-2 md:-ml-4">
          {/* Muestra un esqueleto mientras se cargan los datos */}
          {loading && (
          <SkeletonSchema grid={3} />)}

          {/* Renderiza los productos destacados */}
          {result != null &&
  result.map((product: ProductType) => {
    const { id, attributes } = product; // ✅ Extrae attributes correctamente
    if (!attributes) return null; // Evita errores si attributes es undefined

    const { images, slug, productName, taste, origin } = attributes;

    return (
      <CarouselItem key={id} className="md:basis-1/2 lg:basis-1/3 group">
        <div className="p-1">
          {/* Tarjeta del producto */}
          <Card className="py-4 border border-gray-200 shadow-none">
            <CardContent className="relative flex items-center justify-center px-6 py-2">
              {/* Manejo seguro de imágenes */}
              <Image
                src={
                  images?.data?.[0]?.attributes?.url
                    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${images.data[0].attributes.url}`
                    : "/placeholder-image.webp" // Imagen por defecto
                }
                alt={productName || "Producto"}
                className="object-cover w-full h-48 rounded-lg"
              />

              {/* Acciones sobre la imagen */}
              <div className="absolute w-full px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5">
                <div className="flex justify-center gap-x-6">
                  <IconButton
                    onClick={() => router.push(`/product/${slug}`)}
                    icon={<Expand size={20} />}
                    className="text-gray-600"
                  />
                  <IconButton
                    onClick={() => router.push(`/cart/${id}`)}
                    icon={<ShoppingCartIcon size={20} />}
                    className="text-gray-600"
                  />
                  <IconButton
                    onClick={() => router.push(`/download/${id}`)}
                    icon={<Download size={20} />}
                    className="text-gray-600"
                  />
                </div>
              </div>
            </CardContent>

            {/* Información del producto */}
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
          </Card>
        </div>
      </CarouselItem>
    );
  })}
        </CarouselContent>

        {/* Controles del carrusel */}
        <CarouselPrevious />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
};

export default FeaturedProducts;
