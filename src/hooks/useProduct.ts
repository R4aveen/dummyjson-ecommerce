import { useEffect, useState } from "react";
import { getProductById } from "@/services/products.service";
import type { Product } from "@/types/product";

export function useProduct(productId: string | undefined) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) {
      setError("Producto no encontrado");
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    getProductById(productId, controller.signal)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((requestError: Error) => {
        if (requestError.name === "AbortError") return;
        setError(requestError.message);
        setLoading(false);
      });
    return () => controller.abort();
  }, [productId]);

  return { product, loading, error };
}
