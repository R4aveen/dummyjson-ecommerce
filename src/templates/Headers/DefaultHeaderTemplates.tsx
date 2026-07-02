import { Link } from "react-router-dom";
import pagesConfig from "@/config/page.config";
import Header, { HeaderContent, HeaderLeft, HeaderRight, HeaderLink } from "@/components/layouts/Header/Header";
import { ThemeToggle, Badge } from "@/components/ui";
import { useCart } from "@/context/CartContext";
import { ShoppingBagIcon } from "@/components/ui/Icons";

const DefaultHeaderTemplates = () => {
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <Header>
      <HeaderLeft>
        <Link to={pagesConfig.homePage.to} className="flex items-center gap-2">
          <img src="/favicon.svg" alt="Logo de Voltio" className="h-7 w-7" />
          <span className="text-lg font-bold tracking-tight text-foreground sm:text-xl">Voltio</span>
        </Link>
      </HeaderLeft>
      <HeaderContent className="gap-4 text-sm sm:gap-6 sm:text-base">
        <HeaderLink to={pagesConfig.homePage.to} id={pagesConfig.homePage.id}>
          {pagesConfig.homePage.text}
        </HeaderLink>

        <HeaderLink to={pagesConfig.shopPage.to} id={pagesConfig.shopPage.id}>
          {pagesConfig.shopPage.text}
        </HeaderLink>
      </HeaderContent>
      <HeaderRight>
        <ThemeToggle />
        <div className="h-6 w-px bg-border" />
        <button
          onClick={() => setIsCartOpen(true)}
          className="hover:cursor-pointer relative rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Abrir carrito"
        >
          <ShoppingBagIcon className="h-6 w-6" />
          {cartCount > 0 && (
            <Badge className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[20px] items-center justify-center rounded-full px-1 text-[10px] font-bold ring-2 ring-header animate-in zoom-in-50 duration-200">
              {cartCount}
            </Badge>
          )}
        </button>
      </HeaderRight>
    </Header>
  );
};

export default DefaultHeaderTemplates;
