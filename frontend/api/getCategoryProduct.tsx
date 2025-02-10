import { useEffect, useState } from "react";

export function useGetCategoryProduct(slug: string | string[]) {
  // Construct the API URL dynamically
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?populate=*&filters[category][slug][$eq]=${slug}`;

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const json = await res.json();
        setResult(json.data); // Extract the data array from the response
        setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message || "Error al cargar los Productos de esta Categoría");
        setLoading(false);
      }
    };

    fetchCategories();
  }, [url, slug]); // Add slug as a dependency to re-fetch when it changes

  return { result, loading, error };
}