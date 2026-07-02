import { Suspense } from "react";
import { Footer } from "@/components/layout/Footer";
import { HeaderRouter } from "@/components/router/headerRouter";
import { ContentRouter } from "@/components/router/contentRouter";
import { ScrollToTop } from "@/components/router/ScrollToTop";
import { Loader } from "@/components/ui/Loader";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Wraper } from "@/components/layouts";

function App() {
  return (
    <CartProvider>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <HeaderRouter />
        <CartDrawer />
        <Wraper>
          <Suspense fallback={<Loader label="Cargando..." />}>
            <ContentRouter />
          </Suspense>
        </Wraper>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;

