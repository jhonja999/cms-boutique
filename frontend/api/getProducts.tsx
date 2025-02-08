import { useEffect, useState } from "react";

/**
 * @hook useGetCategories
 * @description Hook personalizado para obtener categorías desde el backend
 * 
 * @returns {Object} Un objeto con los siguientes valores:
 * - result: Los datos de las categorías obtenidas
 * - loading: Estado de carga de la petición
 * - error: Mensaje de error si ocurre alguno
 * 
 * @example
 * const { result, loading, error } = useGetCategories();
 */
export function useGetCategories() {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories?populate=*`;
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(url);
                const json = await res.json();
                setResult(json.data);
                setLoading(false);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                setError(error.message || 'Error al cargar las categorías');
                setLoading(false);
            }
        };

        fetchCategories();
    }, [url]);

    return { result, loading, error };
}
