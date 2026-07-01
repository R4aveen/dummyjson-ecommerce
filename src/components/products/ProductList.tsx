import { ProductCard } from "@/components/products/ProductCard";
import type { Product } from "@/types/product";

interface ProductListProps {
  products: Product[];
}

export const ProductList = ({ products }: ProductListProps) => {
  if (products.length === 0) {
    return (
      <p className="py-16 text-center text-slate-500">
        No se encontraron productos que coincidan con tu búsqueda.
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
};
