import { ProductList } from "@/components/products/ProductList";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { Loader } from "@/components/ui/Loader";
import { useProducts } from "@/hooks/useProducts";
import type { ProductQuery } from "@/services/products.service";

interface ProductsSectionProps {
  id?: string;
  title: string;
  description: string;
  query: ProductQuery;
}

export const ProductsSection = ({ id, title, description, query }: ProductsSectionProps) => {
  const { products, loading, error } = useProducts(query);

  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-20 px-4 py-12 sm:px-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && <ProductList products={products} />}
    </section>
  );
};
