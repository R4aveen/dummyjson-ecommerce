import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@/components/ui/Icons";
import pagesConfig from "@/config/page.config";

export const PromoBanner = () => (
  <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
    <div className="flex flex-col items-start gap-6 rounded-3xl bg-slate-900 px-8 py-12 text-white sm:flex-row sm:items-center sm:justify-between sm:px-12">
      <div>
        <h2 className="text-2xl font-bold sm:text-3xl">¿Listo para encontrar tu próxima compra?</h2>
        <p className="mt-2 max-w-lg text-sm text-slate-300 sm:text-base">
          Recorre el catálogo completo, filtra por categoría y busca por nombre en segundos.
        </p>
      </div>
      <Link
        to={pagesConfig.shopPage.to}
        className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
      >
        Ir a la tienda
        <ArrowRightIcon className="h-4 w-4" />
      </Link>
    </div>
  </section>
);
