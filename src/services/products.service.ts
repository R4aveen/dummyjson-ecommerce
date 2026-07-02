import type { Category, Product, ProductsResponse } from "@/types/product";

const BASE_URL = (import.meta.env.VITE_API_URL as string).replace(/\/+$/, "");

export interface ProductQuery {
  query?: string;
  category?: string;
  sortBy?: string;
  order?: "asc" | "desc";
  limit?: number;
  skip?: number;
}

async function request<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, { signal });
  if (!response.ok) {
    throw new Error(`La solicitud falló con estado ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export function getProducts(
  { query, category, sortBy, order, limit = 12, skip = 0 }: ProductQuery = {},
  signal?: AbortSignal,
): Promise<ProductsResponse> {
  const params = new URLSearchParams({ limit: String(limit), skip: String(skip) });
  if (sortBy) {
    params.set("sortBy", sortBy);
    params.set("order", order ?? "asc");
  }
  if (query) {
    params.set("q", query);
    return request(`/products/search?${params}`, signal);
  }
  if (category) {
    return request(`/products/category/${category}?${params}`, signal);
  }
  return request(`/products?${params}`, signal);
}

export function getProductById(id: string | number, signal?: AbortSignal): Promise<Product> {
  return request(`/products/${id}`, signal);
}

export function getCategories(signal?: AbortSignal): Promise<Category[]> {
  return request("/products/categories", signal);
}
