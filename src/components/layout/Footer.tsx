import { Link } from "react-router-dom";
import pagesConfig from "@/config/page.config";

export const Footer = () => (
  <footer className="mt-16 border-t border-border bg-card text-card-foreground">
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-3 sm:px-6">
      <div>
        <div className="flex items-center gap-2">
          <img src="/favicon.svg" alt="Logo de Voltio" className="h-6 w-6" />
          <span className="text-lg font-bold">Voltio</span>
        </div>
        <p className="mt-3 max-w-xs text-sm text-muted-foreground">
          Tienda online de demostración con productos de tecnología, hogar, belleza y más.
        </p>
      </div>
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Navegación</h3>
        <ul className="mt-3 space-y-2 text-sm">
          <li>
            <Link to={pagesConfig.homePage.to} className="text-card-foreground/80 hover:text-primary transition-colors">
              {pagesConfig.homePage.text}
            </Link>
          </li>
          <li>
            <Link to={pagesConfig.shopPage.to} className="text-card-foreground/80 hover:text-primary transition-colors">
              {pagesConfig.shopPage.text}
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Sobre el proyecto</h3>
        <p className="mt-3 text-sm text-card-foreground/85">
          Construido con React, TypeScript y Tailwind CSS. Los datos provienen de la API pública de{" "}
          <a
            href="https://dummyjson.com"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-primary hover:underline"
          >
            DummyJSON
          </a>
          .
        </p>
      </div>
    </div>
    <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
      {new Date().getFullYear()} Voltio. Proyecto educativo sin fines comerciales.
    </div>
  </footer>
);
