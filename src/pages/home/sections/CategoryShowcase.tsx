import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { Loader } from "@/components/ui/Loader";
import pagesConfig from "@/config/page.config";
import { useCategories } from "@/hooks/useCategories";

export const CategoryShowcase = () => {
  const { categories, loading, error } = useCategories();

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">Explora por categoría</h2>
          <p className="mt-1 text-sm text-muted-foreground">Encuentra lo que necesitas más rápido.</p>
        </div>
        <Link
          to={pagesConfig.shopPage.to}
          className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:inline-flex"
        >
          Ver todas
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
      {loading && <Loader label="Cargando categorías..." />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {categories.slice(0, 8).map((category) => (
            <li key={category.slug}>
              <Link
                to={`${pagesConfig.shopPage.to}?category=${category.slug}`}
                className="group flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3.5 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
              >
                {category.name}
                <ArrowRightIcon className="h-4 w-4 text-muted-foreground/60 transition-colors group-hover:text-primary" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
