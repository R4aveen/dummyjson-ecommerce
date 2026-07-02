import { useEffect, useState } from "react";
import { getProducts, type ProductQuery } from "@/services/products.service";
import type { Product } from "@/types/product";

export function useProducts({ query, category, sortBy, order, limit, skip }: ProductQuery = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    getProducts({ query, category, sortBy, order, limit, skip }, controller.signal)
      .then((data) => {
        setProducts(data.products);
        setTotal(data.total);
        setLoading(false);
      })
      .catch((requestError: Error) => {
        if (requestError.name === "AbortError") return;
        setError(requestError.message);
        setLoading(false);
      });
    return () => controller.abort();
  }, [query, category, sortBy, order, limit, skip]);

  return { products, total, loading, error };
}
