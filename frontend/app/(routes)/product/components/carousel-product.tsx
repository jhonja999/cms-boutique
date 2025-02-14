import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { ImageType } from "@/types/image";

interface CarouselProductProps {
  images: ImageType[];
}

const CarouselProduct = ({ images }: CarouselProductProps) => {
  console.log("Images Data:", images);

  if (!images || images.length === 0) {
    return (
      <p className="text-center text-gray-500">No hay imágenes disponibles.</p>
    );
  }

  return (
    <div className="relative max-w-2xl mx-auto sm:px-16">
      <Carousel className="overflow-hidden rounded-2xl shadow-lg">
        <CarouselContent>
          {images.map((image) => {
            // ✅ Verifica la URL de la imagen y usa una de respaldo si es necesario
            const imageUrl = image.url
              ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${image.url}`
              : "/placeholder.webp";

            return (
              <CarouselItem key={image.id} className="relative w-full h-72 md:h-96 group">
                <Image
                  src={imageUrl}
                  alt={image.alternativeText || "Imagen del producto"}
                  fill
                  priority
                  className="rounded-2xl object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Efecto de overlay al pasar el mouse */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* Botones de navegación con mejor visibilidad */}
        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-800/60 hover:bg-gray-900/80 text-white p-2 rounded-full shadow-md transition-all" />
        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800/60 hover:bg-gray-900/80 text-white p-2 rounded-full shadow-md transition-all" />
      </Carousel>

      {/* Indicadores de posición */}
      <div className="flex justify-center mt-4 gap-2">
        {images.map((_, index) => (
          <span
            key={index}
            className="w-3 h-3 bg-gray-400 rounded-full opacity-70 hover:opacity-100 transition-all"
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselProduct;
