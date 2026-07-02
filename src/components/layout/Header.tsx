import { Link, NavLink } from "react-router-dom";
import pagesConfig from "@/config/page.config";
import { useCart } from "@/context/CartContext";
import { ShoppingBagIcon } from "@/components/ui/Icons";
import { Badge } from "@/components/ui";

const navPages = [pagesConfig.homePage, pagesConfig.shopPage];

export const Header = () => {
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to={pagesConfig.homePage.to} className="flex items-center gap-2">
          <img src="/favicon.svg" alt="Logo de Voltio" className="h-7 w-7" />
          <span className="text-xl font-bold tracking-tight">Voltio</span>
        </Link>
        <div className="flex items-center gap-4">
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

          <div className="h-6 w-px bg-slate-200" />

          <button
            onClick={() => setIsCartOpen(true)}
            className="hover:cursor-pointer relative rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            aria-label="Abrir carrito"
          >
            <ShoppingBagIcon className="h-6 w-6" />
            {cartCount > 0 && (
              <Badge className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[20px] items-center justify-center rounded-full px-1 text-[10px] font-bold ring-2 ring-white animate-in zoom-in-50 duration-200">
                {cartCount}
              </Badge>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};


