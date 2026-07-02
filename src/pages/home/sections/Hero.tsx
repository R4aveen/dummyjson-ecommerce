import { Link } from "react-router-dom";
import { ArrowRightIcon, StarIcon } from "@/components/ui/Icons";
import pagesConfig, { getProductPath } from "@/config/page.config";
import { useProducts } from "@/hooks/useProducts";
import { formatPrice, getOriginalPrice } from "@/utils/format";

export const Hero = () => {
  const { products, loading } = useProducts({ sortBy: "rating", order: "desc", limit: 3 });
  const [featured, secondary] = products;
  const featuredHasDiscount = featured && featured.discountPercentage >= 5;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-accent to-[#2b4038] text-white">
      {/* Glows decorativos */}
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-black/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-12 lg:py-28">
        {/* Columna de texto */}
        <div className="flex flex-col items-start gap-6">
          <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider">
            Nueva temporada
          </span>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            Todo lo que buscas, en un solo lugar
          </h1>
          <p className="max-w-xl text-base text-white/80 sm:text-lg">
            Tecnología, hogar, belleza y mucho más. Explora cientos de productos con envío rápido y
            garantía en cada compra.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to={pagesConfig.shopPage.to}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-accent transition-transform hover:scale-105"
            >
              Ver catálogo
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <a
              href="#ofertas"
              className="inline-flex items-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Ofertas del día
            </a>
          </div>
          <dl className="mt-4 grid grid-cols-3 gap-6 text-left sm:mt-6 sm:gap-8">
            <div>
              <dt className="text-2xl font-bold">190+</dt>
              <dd className="text-xs text-white/70">Productos</dd>
            </div>
            <div>
              <dt className="text-2xl font-bold">20+</dt>
              <dd className="text-xs text-white/70">Categorías</dd>
            </div>
            <div>
              <dt className="text-2xl font-bold">24/7</dt>
              <dd className="text-xs text-white/70">Atención</dd>
            </div>
          </dl>
        </div>

        {/* Columna visual: producto destacado desde la API */}
        <div className="relative mx-auto w-full max-w-sm lg:mx-0 lg:ml-auto lg:max-w-md">
          {featured ? (
            <Link to={getProductPath(featured.id)} className="group relative block">
              <div className="relative -rotate-2 rounded-3xl bg-card p-4 text-card-foreground shadow-2xl transition-transform duration-300 group-hover:rotate-0 group-hover:scale-[1.02] sm:p-5">
                {featuredHasDiscount && (
                  <span className="absolute right-4 top-4 z-10 rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground shadow-lg">
                    -{Math.round(featured.discountPercentage)}%
                  </span>
                )}
                <div className="aspect-square overflow-hidden rounded-2xl bg-secondary">
                  <img
                    src={featured.thumbnail}
                    alt={featured.title}
                    className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 flex items-end justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Lo más valorado</p>
                    <h3 className="line-clamp-1 text-base font-semibold">{featured.title}</h3>
                    <div className="mt-1 flex items-center gap-1 text-sm">
                      <StarIcon className="h-4 w-4 text-amber-400" />
                      <span className="font-medium">{featured.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="block text-lg font-bold">{formatPrice(featured.price)}</span>
                    {featuredHasDiscount && (
                      <span className="text-xs text-muted-foreground line-through">
                        {formatPrice(getOriginalPrice(featured.price, featured.discountPercentage))}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Miniatura flotante secundaria (solo en pantallas amplias) */}
              {secondary && (
                <div className="absolute -left-7 -top-7 hidden -rotate-6 rounded-2xl bg-card p-2 shadow-xl transition-transform duration-300 group-hover:-translate-y-1 lg:block">
                  <img
                    src={secondary.thumbnail}
                    alt={secondary.title}
                    className="h-20 w-20 rounded-xl bg-secondary object-contain p-1.5"
                  />
                </div>
              )}
            </Link>
          ) : loading ? (
            <div className="aspect-square w-full animate-pulse rounded-3xl bg-white/10" />
          ) : null}
        </div>
      </div>
    </section>
  );
};
