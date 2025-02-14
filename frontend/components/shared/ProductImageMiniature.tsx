import { useRouter } from "next/navigation";
import Image from "next/image";

interface ProductImageMiniatureProps {
  slug: string;
  url: string;
}

const ProductImageMiniature: React.FC<ProductImageMiniatureProps> = ({ slug, url }) => {
  const router = useRouter();

  return (
    <div
      className="relative aspect-square w-full h-52 cursor-pointer overflow-hidden rounded-lg group"
      onClick={() => router.push(`/product/${slug}`)}
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`}
        alt="Imagen del producto"
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

export default ProductImageMiniature;
