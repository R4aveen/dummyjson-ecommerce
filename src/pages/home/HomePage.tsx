import { Benefits } from "@/pages/home/sections/Benefits";
import { CategoryShowcase } from "@/pages/home/sections/CategoryShowcase";
import { Hero } from "@/pages/home/sections/Hero";
import { ProductsSection } from "@/pages/home/sections/ProductsSection";
import { PromoBanner } from "@/pages/home/sections/PromoBanner";

const HomePage = () => (
  <>
    <Hero />
    <Benefits />
    <CategoryShowcase />
    <ProductsSection
      title="Los más valorados"
      description="Productos con las mejores calificaciones de la comunidad."
      query={{ sortBy: "rating", order: "desc", limit: 8 }}
    />
    <ProductsSection
      id="ofertas"
      title="Ofertas destacadas"
      description="Los descuentos más grandes disponibles ahora."
      query={{ sortBy: "discountPercentage", order: "desc", limit: 4 }}
    />
    <PromoBanner />
  </>
);

export default HomePage;
