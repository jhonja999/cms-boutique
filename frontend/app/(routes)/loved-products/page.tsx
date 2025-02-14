"use client";

import { useLovedProducts } from "@/hooks/use-loved-products";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/formatPrice";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Heart, ShoppingCart, XCircle, Trash2 } from "lucide-react";
import Link from "next/link";
import CategoryLabels from "@/components/shared/CategoryLabels";
import ProductImageMiniature from "@/components/shared/ProductImageMiniature"; // ✅ Importamos el nuevo componente

const FavoritesPage = () => {
  const { lovedItems, removeLovedItem, removeAllLovedItems } = useLovedProducts();
  const { addItem } = useCart(); 

  return (
    <div className="container mx-auto max-w-4xl py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6 flex items-center justify-center gap-2">
        <Heart className="w-8 h-8 text-red-500" />
        Mis Favoritos
      </h1>
      <Separator className="mb-6" />

      {lovedItems.length === 0 ? (
        <div className="text-center text-gray-500">
          <Heart className="w-12 h-12 mx-auto mb-2 text-gray-400" />
          <p>No tienes productos en favoritos.</p>
          <Link href="/shop">
            <Button className="mt-4 flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Explorar Productos
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lovedItems.map((product) => (
            <Card key={product.id} className="relative group hover:shadow-md transition-shadow">
              {/* ✅ Reemplazamos `Image` por `ProductImageMiniature` */}
              <CardHeader className="p-0 overflow-hidden rounded-t-lg">
                <Link href={`/product/${product.slug}`} className="block">
                  <ProductImageMiniature
                    slug={product.slug}
                    url={product.images[0]?.url || ""}
                  />
                </Link>
              </CardHeader>

              {/* Contenido */}
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold">{product.productName}</h2>
                <CategoryLabels taste={product.taste} origin={product.origin} />
                <p className="text-lg font-bold mt-2">{formatPrice(product.price)}</p>
              </CardContent>

              {/* Acciones */}
              <CardFooter className="p-4 flex justify-between">
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => removeLovedItem(product.id)}
                  className="h-8 w-8 hover:bg-red-500"
                  aria-label="Eliminar de favoritos"
                >
                  <XCircle className="w-5 h-5" />
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => addItem(product)}
                    className="flex items-center gap-2 hover:bg-gray-100"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Agregar
                  </Button>
                  <Link href={`/product/${product.slug}`}>
                    <Button>Ver Producto</Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Botón para vaciar favoritos */}
      {lovedItems.length > 0 && (
        <div className="text-center mt-6">
          <Button
            variant="outline"
            onClick={removeAllLovedItems}
            className="hover:bg-red-100 flex items-center gap-2"
          >
            <Trash2 className="w-5 h-5" />
            Vaciar Favoritos
          </Button>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
