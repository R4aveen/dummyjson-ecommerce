import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ContentRouter } from "@/components/router/contentRouter";
import { ScrollToTop } from "@/components/router/ScrollToTop";
import { Loader } from "@/components/ui/Loader";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Suspense fallback={<Loader label="Cargando..." />}>
            <ContentRouter />
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
