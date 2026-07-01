import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductList } from "@/components/products/ProductList";
import { SearchBar } from "@/components/products/SearchBar";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { Loader } from "@/components/ui/Loader";
import { useCategories } from "@/hooks/useCategories";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useProducts } from "@/hooks/useProducts";

const PAGE_SIZE = 12;

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "";
  const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);

  const [searchInput, setSearchInput] = useState(query);
  const debouncedSearch = useDebouncedValue(searchInput.trim());

  const { categories } = useCategories();
  const { products, total, loading, error } = useProducts({
    query,
    category,
    limit: PAGE_SIZE,
    skip: (page - 1) * PAGE_SIZE,
  });

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  useEffect(() => {
    if (debouncedSearch === query) return;
    setSearchParams(
      (params) => {
        if (debouncedSearch) {
          params.set("q", debouncedSearch);
          params.delete("category");
        } else {
          params.delete("q");
        }
        params.delete("page");
        return params;
      },
      { replace: true },
    );
  }, [debouncedSearch, query, setSearchParams]);

  const handleCategoryChange = (slug: string) => {
    setSearchInput("");
    setSearchParams((params) => {
      if (slug) {
        params.set("category", slug);
      } else {
        params.delete("category");
      }
      params.delete("q");
      params.delete("page");
      return params;
    });
  };

  const goToPage = (nextPage: number) => {
    setSearchParams((params) => {
      params.set("page", String(nextPage));
      return params;
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Catálogo</h1>
        <p className="mt-1 text-sm text-slate-500">
          {loading ? "Buscando productos..." : `${total} productos disponibles`}
        </p>
      </div>
      <div className="mb-8 flex flex-col gap-3 sm:flex-row">
        <SearchBar value={searchInput} onChange={setSearchInput} />
        <select
          value={category}
          onChange={(event) => handleCategoryChange(event.target.value)}
          aria-label="Filtrar por categoría"
          className="rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20 sm:w-56"
        >
          <option value="">Todas las categorías</option>
          {categories.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <>
          <ProductList products={products} />
          {totalPages > 1 && (
            <nav aria-label="Paginación" className="mt-10 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => goToPage(page - 1)}
                disabled={page <= 1}
                className="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-40"
              >
                Anterior
              </button>
              <span className="text-sm text-slate-500">
                Página {page} de {totalPages}
              </span>
              <button
                type="button"
                onClick={() => goToPage(page + 1)}
                disabled={page >= totalPages}
                className="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-40"
              >
                Siguiente
              </button>
            </nav>
          )}
        </>
      )}
    </div>
  );
};

export default ShopPage;
