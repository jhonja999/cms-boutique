/* eslint-disable @next/next/no-img-element */
import IconButton from "@/components/icon-buttons";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { formatPrice } from "@/lib/formatPrice";
import { ProductType } from "@/types/product";
import { Expand, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type ProductCardProps = {
  product: ProductType;
};

const ProductCard = (props: ProductCardProps) => {
  const { product } = props;
    const router = useRouter();


  return (
    <Link
      href={`/product/${product.slug}`}
      className="relative p-2 transition-all duration-100 rounded-lg hover:shadow-md"
    >
      {/* Tags */}
      <div className="absolute flex items-center justify-between gap-3 px-2 z-[1] top-4">
        <p className="px-2 py-1 text-xs text-white bg-black rounded-full dark:bg-white dark:text-black w-fit">
          {product.taste || "Desconocido"}
        </p>
        <p className="px-2 py-1 text-xs text-white bg-yellow-900 rounded-full w-fit">
          {product.origin || "Desconocido"}
        </p>
      </div>

      {/* Carousel */}
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-sm"
      >
        <CarouselContent>
          {product.images && product.images.length > 0 ? (
            product.images.map((image) => (
              <CarouselItem key={image.id} className="group">
                <img
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${image.url}`}
                  alt={image.name || "Imagen del producto"}
                  className="rounded-xl object-cover w-full h-64"
                />
                {/* Action Buttons */}
                <div className="absolute w-full px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5">
                  <div className="flex justify-center gap-x-6">
                    <IconButton
                      onClick={() => router.push(`/product/${product.slug}`)}
                      icon={<Expand size={20} className="text-gray-600" />}
                    />
                    <IconButton
                      onClick={() => console.log("ShoppingCart clicked")}
                      icon={<ShoppingCart size={20} className="text-gray-600" />}
                    />
                  </div>
                </div>
              </CarouselItem>
            ))
          ) : (
            // Fallback if no images are available
            <CarouselItem>
              <img
                src="/placeholder-image.webp"
                alt="Placeholder"
                className="rounded-xl object-cover w-full h-64"
              />
            </CarouselItem>
          )}
        </CarouselContent>
      </Carousel>
      <p className="text-2xl text-center">{product.productName}</p>
      <p className="font-bold text-center" >{formatPrice(product.price)}</p>
    </Link>
  );
};

export default ProductCard;