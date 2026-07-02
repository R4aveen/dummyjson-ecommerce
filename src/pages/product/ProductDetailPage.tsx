import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeftIcon, ShoppingBagIcon } from "@/components/ui/Icons";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { Loader } from "@/components/ui/Loader";
import { Rating } from "@/components/ui/Rating";
import pagesConfig from "@/config/page.config";
import { useProduct } from "@/hooks/useProduct";
import { formatDate, formatPrice, getOriginalPrice } from "@/utils/format";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { product, loading, error } = useProduct(productId);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();

  if (loading) return <Loader label="Cargando producto..." />;
  if (error || !product) return <ErrorMessage message={error ?? "Producto no encontrado"} />;

  const hasDiscount = product.discountPercentage >= 5;
  const images = product.images.length > 0 ? product.images : [product.thumbnail];
  const inStock = product.stock > 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Link
        to={pagesConfig.shopPage.to}
        className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <ChevronLeftIcon className="h-4 w-4" />
        Volver al catálogo
      </Link>
      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div>
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <img
              src={images[selectedImage]}
              alt={product.title}
              className="aspect-square w-full object-contain"
            />
          </div>
          {images.length > 1 && (
            <div className="mt-3 flex gap-3">
              {images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setSelectedImage(index)}
                  aria-label={`Ver imagen ${index + 1}`}
                  className={`overflow-hidden rounded-xl border-2 bg-card transition-colors ${
                    index === selectedImage ? "border-primary" : "border-border hover:border-muted-foreground/30"
                  }`}
                >
                  <img src={image} alt="" className="h-16 w-16 object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <span className="text-xs uppercase tracking-wide text-muted-foreground">
              {product.brand ? `${product.brand} · ` : ""}
              {product.category}
            </span>
            <h1 className="mt-1 text-3xl font-bold text-foreground">{product.title}</h1>
          </div>
          <Rating value={product.rating} />
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-foreground">{formatPrice(product.price)}</span>
            {hasDiscount && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(getOriginalPrice(product.price, product.discountPercentage))}
                </span>
                <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
                  -{Math.round(product.discountPercentage)}%
                </span>
              </>
            )}
          </div>
          <p className="text-foreground/80">{product.description}</p>
          <p className={`text-sm font-medium ${inStock ? "text-emerald-600" : "text-red-600"}`}>
            {inStock ? `${product.availabilityStatus} · ${product.stock} unidades` : "Sin stock"}
          </p>
          <Button
            onClick={() => inStock && addToCart(product)}
            disabled={!inStock}
            className="mt-2 w-full rounded-xl py-3 text-sm font-semibold hover:opacity-90 active:scale-[0.99] transition-transform shadow-sm"
          >
            <ShoppingBagIcon className="h-5 w-5" />
            {inStock ? "Añadir al carrito" : "Agotado"}
          </Button>
          <ul className="mt-2 space-y-2 rounded-2xl border border-border bg-card p-5 text-sm text-card-foreground/80">
            <li>
              <span className="font-semibold">Envío:</span> {product.shippingInformation}
            </li>
            <li>
              <span className="font-semibold">Garantía:</span> {product.warrantyInformation}
            </li>
            <li>
              <span className="font-semibold">Devoluciones:</span> {product.returnPolicy}
            </li>
          </ul>
          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      {product.reviews.length > 0 && (
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-foreground">Opiniones de clientes</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {product.reviews.map((review) => (
              <li
                key={`${review.reviewerEmail}-${review.date}`}
                className="rounded-2xl border border-border bg-card text-card-foreground p-5"
              >
                <Rating value={review.rating} />
                <p className="mt-3 text-sm text-card-foreground/85">{review.comment}</p>
                <p className="mt-4 text-sm font-semibold text-card-foreground">{review.reviewerName}</p>
                <p className="text-xs text-muted-foreground">{formatDate(review.date)}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default ProductDetailPage;
