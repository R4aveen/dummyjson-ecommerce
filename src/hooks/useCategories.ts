import { useEffect, useState } from "react";
import { getCategories } from "@/services/products.service";
import type { Category } from "@/types/product";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    getCategories(controller.signal)
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((requestError: Error) => {
        if (requestError.name === "AbortError") return;
        setError(requestError.message);
        setLoading(false);
      });
    return () => controller.abort();
  }, []);

  return { categories, loading, error };
}
