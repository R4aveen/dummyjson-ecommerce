import { Link } from "react-router-dom";
import pagesConfig from "@/config/page.config";

const NotFoundPage = () => (
  <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center sm:px-6">
    <p className="text-6xl font-bold text-accent">404</p>
    <h1 className="mt-4 text-2xl font-bold">Página no encontrada</h1>
    <p className="mt-2 text-sm text-slate-500">La ruta que buscas no existe o fue movida.</p>
    <Link
      to={pagesConfig.homePage.to}
      className="mt-8 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
    >
      Volver al inicio
    </Link>
  </div>
);

export default NotFoundPage;
