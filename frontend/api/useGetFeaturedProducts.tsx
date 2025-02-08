/* eslint-disable @typescript-eslint/no-explicit-any */
//useGetFeaturedProducts.tsx
import { useEffect, useState } from "react";

export function useGetFeaturedProducts() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[isFeatured][$eq]=true&populate=*`;
  const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
      const fetchProducts = async () => {
          try {
              const res = await fetch(url);
              const json = await res.json();
              setResult(json.data);
              setLoading(false);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error: any) {
              setError(error.message || 'Error al cargar los productos');
              setLoading(false);
          }
      };

      fetchProducts();
  }, [url]);

  return { loading, result, error };
}