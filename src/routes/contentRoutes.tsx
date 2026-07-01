import { lazy } from "react";
import type { PathRouteProps } from "react-router-dom";
import pagesConfig from "@/config/page.config";

const HomePage = lazy(() => import("@/pages/home/HomePage"));
const ShopPage = lazy(() => import("@/pages/shop/ShopPage"));
const ProductDetailPage = lazy(() => import("@/pages/product/ProductDetailPage"));
const NotFoundPage = lazy(() => import("@/pages/not-found/NotFoundPage"));

export const contentRoutes: PathRouteProps[] = [
  { path: pagesConfig.homePage.to, element: <HomePage /> },
  { path: pagesConfig.shopPage.to, element: <ShopPage /> },
  { path: pagesConfig.productPage.to, element: <ProductDetailPage /> },
  { path: "*", element: <NotFoundPage /> },
];
