import { Link } from "react-router-dom";
import { Rating } from "@/components/ui/Rating";
import { getProductPath } from "@/config/page.config";
import type { Product } from "@/types/product";
import { formatPrice, getOriginalPrice } from "@/utils/format";
import { useCart } from "@/context/CartContext";
import { ShoppingBagIcon } from "@/components/ui/Icons";
import { Button } from "@/components/ui";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const hasDiscount = product.discountPercentage >= 5;
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    
  };

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:shadow-lg hover:border-slate-300">
      <Link
        to={getProductPath(product.id)}
        className="block relative overflow-hidden bg-slate-50 aspect-square"
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
        {hasDiscount && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-white">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <span className="text-xs uppercase tracking-wide text-slate-400">{product.category}</span>
        <Link to={getProductPath(product.id)} className="hover:text-accent">
          <h3 className="line-clamp-2 text-sm font-medium sm:text-base text-slate-800 transition-colors">
            {product.title}
          </h3>
        </Link>
        <Rating value={product.rating} />
        <div className="mt-auto flex items-baseline gap-2 pt-2">
          <span className="text-lg font-bold text-slate-900">{formatPrice(product.price)}</span>
          {hasDiscount && (
            <span className="text-sm text-slate-400 line-through">
              {formatPrice(getOriginalPrice(product.price, product.discountPercentage))}
            </span>
          )}
        </div>
        <Button
          onClick={handleAddToCart}
          className="mt-3 w-full rounded-xl py-2.5 text-xs font-semibold hover:opacity-90 active:scale-[0.98] transition-transform"
        >
          <ShoppingBagIcon className="h-4 w-4" />
          Añadir al carrito
        </Button>
      </div>
    </div>
  );
};

