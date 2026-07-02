import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@/components/ui/Icons";
import pagesConfig from "@/config/page.config";

export const Hero = () => (
  <section className="bg-gradient-to-br from-primary via-accent to-[#2b4038] text-white">
    <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-20 sm:px-6 sm:py-28">
      <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider">
        Nueva temporada
      </span>
      <h1 className="max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">
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
      <dl className="mt-6 grid grid-cols-3 gap-8 text-left">
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
  </section>
);
