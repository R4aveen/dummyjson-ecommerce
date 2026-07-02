import { Link } from "react-router-dom";
import pagesConfig from "@/config/page.config";

export const Footer = () => (
  <footer className="mt-16 border-t border-slate-200 bg-white">
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-3 sm:px-6">
      <div>
        <div className="flex items-center gap-2">
          <img src="/favicon.svg" alt="Logo de Voltio" className="h-6 w-6" />
          <span className="text-lg font-bold">Voltio</span>
        </div>
        <p className="mt-3 max-w-xs text-sm text-slate-500">
          Tienda online de demostración con productos de tecnología, hogar, belleza y más.
        </p>
      </div>
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Navegación</h3>
        <ul className="mt-3 space-y-2 text-sm">
          <li>
            <Link to={pagesConfig.homePage.to} className="text-slate-600 hover:text-accent">
              {pagesConfig.homePage.text}
            </Link>
          </li>
          <li>
            <Link to={pagesConfig.shopPage.to} className="text-slate-600 hover:text-accent">
              {pagesConfig.shopPage.text}
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Sobre el proyecto</h3>
        <p className="mt-3 text-sm text-slate-600">
          Construido con React, TypeScript y Tailwind CSS. Los datos provienen de la API pública de{" "}
          <a
            href="https://dummyjson.com"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-accent hover:underline"
          >
            DummyJSON
          </a>
          .
        </p>
      </div>
    </div>
    <div className="border-t border-slate-100 py-4 text-center text-xs text-slate-400">
      {new Date().getFullYear()} Voltio. Proyecto educativo sin fines comerciales.
    </div>
  </footer>
);
