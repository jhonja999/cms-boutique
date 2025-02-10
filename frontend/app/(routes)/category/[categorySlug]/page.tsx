"use client";
import { useGetCategoryProduct } from "@/api/getCategoryProduct";
import { useParams } from "next/navigation";
import { ResponseType } from "@/types/response";
import { Separator } from "@/components/ui/separator";
import FiltersControlsCategory from "../components/filters-controls-category";
import SkeletonSchema from "@/components/skeletonSchema";
import ProductCart from "../components/product-card";
import { ProductType } from "@/types/product";
import { useState } from "react";

export default function Page() {
  const params = useParams();
  const categorySlug = Array.isArray(params.categorySlug)
    ? params.categorySlug[0]
    : params.categorySlug || "";

  const { result, loading }: ResponseType = useGetCategoryProduct(categorySlug);
  const [filterOrigin, setFilterOrigin] = useState("");
  const [filterTaste, setFilterTaste] = useState("");

  // Filter products based on origin and taste
  const filteredProducts = result !== null && !loading ? (
    result.filter((product: ProductType) => {
      const matchesOrigin = filterOrigin === "" || product.origin === filterOrigin;
      const matchesTaste = filterTaste === "" || product.taste === filterTaste;
      return matchesOrigin && matchesTaste;
    })
  ) : [];

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <>
          {result?.length > 0 && (
            <h1 className="text-3xl font-medium">
              Café{" "}
              {result[0]?.category?.categoryName || "Categoría Desconocida"}
            </h1>
          )}

          {(!result || result.length === 0) && (
            <p>No se encontraron productos para esta categoría.</p>
          )}

          <Separator />

          <div className="sm:flex sm:justify-between">
            <FiltersControlsCategory 
              setFilterOrigin={setFilterOrigin}
              setFilterTaste={setFilterTaste}
            />
            <div className="grid gap-5 mt-8 sm:grid-cols-2 md:grid-cols-3 sm:gap-10">
              {loading ? (
                <SkeletonSchema grid={3} />
              ) : (
                filteredProducts?.map((product: ProductType) => (
                  <ProductCart key={product.id} product={product} />
                ))
              )}
              {filteredProducts !==null && !loading && filteredProducts.length === 0 && (
                <p>No hay productos con este filtro.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}