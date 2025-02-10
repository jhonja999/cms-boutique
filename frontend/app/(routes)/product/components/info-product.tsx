import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/formatPrice";
import { ProductType } from "@/types/product";
import { Heart } from "lucide-react";

export type InfoProductProps = {
  product: ProductType;
};

export const InfoProduct = ({ product }: InfoProductProps) => {
  return (
    <div className="px-6">
      {/* Nombre y etiquetas */}
      <div className="mb-4">
        <h1 className="text-3xl font-semibold text-gray-800">{product.productName}</h1>
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <span className="px-3 py-1 text-sm text-white bg-black rounded-full dark:bg-white dark:text-black">
            {product.taste || "Sabor desconocido"}
          </span>
          <span className="px-3 py-1 text-sm text-white bg-yellow-700 rounded-full">
            {product.origin || "Origen desconocido"}
          </span>
        </div>
      </div>

      <Separator className="my-6" />

      {/* Descripción */}
      <p className="text-lg text-gray-700 leading-relaxed">
        {product.description || "No hay descripción disponible para este producto."}
      </p>

      <Separator className="my-6" />

      {/* Precio */}
      <p className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</p>

      {/* Botones de acción */}
      <div className="flex flex-col items-center gap-4 mt-6 md:flex-row">
        <Button className="w-full py-3 text-lg md:w-auto md:px-12" onClick={() => console.log("Comprar")}>
          Comprar
        </Button>
        <button
          className="p-3 border rounded-full transition-all hover:bg-gray-100"
          onClick={() => console.log("Añadir a favoritos")}
        >
          <Heart size={28} className="text-gray-600 hover:fill-red-500 transition-all" />
        </button>
      </div>
    </div>
  );
};
