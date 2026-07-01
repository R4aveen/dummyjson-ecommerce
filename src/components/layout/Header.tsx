import { Link, NavLink } from "react-router-dom";
import pagesConfig from "@/config/page.config";

const navPages = [pagesConfig.homePage, pagesConfig.shopPage];

export const Header = () => (
  <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
    <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
      <Link to={pagesConfig.homePage.to} className="flex items-center gap-2">
        <img src="/favicon.svg" alt="Logo de Voltio" className="h-7 w-7" />
        <span className="text-xl font-bold tracking-tight">Voltio</span>
      </Link>
      <nav aria-label="Navegación principal" className="flex items-center gap-1">
        {navPages.map((page) => (
          <NavLink
            key={page.id}
            to={page.to}
            end={page.to === "/"}
            className={({ isActive }) =>
              `rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                isActive ? "bg-accent text-white" : "text-slate-600 hover:bg-slate-100"
              }`
            }
          >
            {page.text}
          </NavLink>
        ))}
      </nav>
    </div>
  </header>
);
