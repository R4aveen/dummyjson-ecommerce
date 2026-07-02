import { Suspense } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ContentRouter } from "@/components/router/contentRouter";
import { ScrollToTop } from "@/components/router/ScrollToTop";
import { Loader } from "@/components/ui/Loader";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";

function App() {
  return (
    <CartProvider>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <Header />
        <CartDrawer />
        <main className="flex-1">
          <Suspense fallback={<Loader label="Cargando..." />}>
            <ContentRouter />
          </Suspense>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;

