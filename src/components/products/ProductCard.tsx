import { Link } from "react-router-dom";
import { Rating } from "@/components/ui/Rating";
import { getProductPath } from "@/config/page.config";
import type { Product } from "@/types/product";
import { formatPrice, getOriginalPrice } from "@/utils/format";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const hasDiscount = product.discountPercentage >= 5;

  return (
    <Link
      to={getProductPath(product.id)}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-lg"
    >
      <div className="relative overflow-hidden bg-slate-50">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="aspect-square w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
        {hasDiscount && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-white">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <span className="text-xs uppercase tracking-wide text-slate-400">{product.category}</span>
        <h3 className="line-clamp-2 text-sm font-medium sm:text-base">{product.title}</h3>
        <Rating value={product.rating} />
        <div className="mt-auto flex items-baseline gap-2 pt-2">
          <span className="text-lg font-bold">{formatPrice(product.price)}</span>
          {hasDiscount && (
            <span className="text-sm text-slate-400 line-through">
              {formatPrice(getOriginalPrice(product.price, product.discountPercentage))}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};
