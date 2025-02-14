/* eslint-disable @next/next/no-img-element */
"use client";

import { useGetCategories } from "@/api/getProducts";
import Link from "next/link";
import { ResponseType } from "@/types/response";
import { CategoryType } from "@/types/category";

const ChooseCategory = () => {
  const { result, loading }: ResponseType = useGetCategories();

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      {/* Title */}
      <h3 className="px-6 pb-4 text-3xl sm:pb-8">Elige tu categoría favorita</h3>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center h-48">
          <p>Cargando categorías...</p>
        </div>
      )}

      {/* Categories Grid */}
      {!loading && result && (
        <div className="grid gap-5 sm:grid-cols-3">
          {result.map((category: CategoryType) => {
            // Safely access the image URL
            const imageUrl =
              category.categoryImage?.url &&
              `${process.env.NEXT_PUBLIC_BACKEND_URL}${category.categoryImage.url}`;

            return (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="relative max-w-xs mx-auto overflow-hidden bg-no-repeat bg-cover rounded-lg"
              >
                {/* Image with fallback */}
                <img
                  src={imageUrl || "/placeholder.webp"} // Use a placeholder if no image is available
                  alt={category.categoryName}
                  className="max-w-[270px] transition duration-300 ease-in-out rounded-lg hover:scale-110"
                />
                <p className="absolute w-full py-2 text-lg font-bold text-center text-black dark:text-white bottom-5 backdrop-blur-lg">{category.categoryName}</p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ChooseCategory;